import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const json = (path) => JSON.parse(read(path));
const check = process.argv[2] === "--check";
if (process.argv.length !== (check ? 3 : 2)) {
  throw new Error("Usage: node scripts/build-taxonomy.mjs [--check]");
}

const reports = json("taxonomy/reports.json");
const taxonomy = json("taxonomy/taxonomy.json");
const severityLabels = { harm: "Harm", waste: "Waste", friction: "Friction" };
const severityOrder = Object.keys(severityLabels);
const keys = (obj, expected) => Object.keys(obj).sort().join(" ") === expected.split(" ").sort().join(" ");
const nonempty = (value) => typeof value === "string" && value.trim() === value && value.length > 0;
const normal = (text) => text.replace(/\s+/gu, " ").trim();
const ensure = (condition, message) => { if (!condition) throw new Error(message); };
const compare = (a, b) => a.localeCompare(b, "en");
ensure(Array.isArray(reports) && reports.length, "Expected a nonempty array in taxonomy/reports.json");
ensure(Array.isArray(taxonomy) && taxonomy.length, "Expected a nonempty array in taxonomy/taxonomy.json");

const modeById = new Map();
for (const mode of taxonomy) {
  ensure(keys(mode, "id name definition membership_test count models premier_example"), "Invalid mode fields");
  ensure(/^[a-z][a-z0-9-]*$/.test(mode.id) && !modeById.has(mode.id), `Invalid or duplicate mode: ${mode.id}`);
  ensure([mode.name, mode.definition, mode.membership_test, mode.premier_example].every(nonempty), `Incomplete mode: ${mode.id}`);
  modeById.set(mode.id, mode);
}

const files = new Set();
const sourceFiles = new Set(readdirSync(new URL("reports/", root), { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => `reports/${entry.name}`));
const byMode = new Map(taxonomy.map(({ id }) => [id, []]));
const byFile = new Map();
const totals = new Map();
const severities = Object.fromEntries(severityOrder.map((severity) => [severity, 0]));
let priorCount = 0;
for (const report of reports) {
  ensure(keys(report, "file title provider model date failure_modes severity impact_summary quote prior_log_reference"), "Invalid report fields");
  const { file, title, provider, model, date, failure_modes, severity, impact_summary, quote, prior_log_reference } = report;
  ensure(sourceFiles.has(file) && !files.has(file), `Missing or duplicate source report: ${file}`);
  ensure([title, provider, model, impact_summary, quote].every(nonempty), `Incomplete report: ${file}`);
  ensure(/^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date))
    && new Date(date).toISOString().slice(0, 10) === date, `Invalid date: ${file}`);
  ensure(Array.isArray(failure_modes) && failure_modes.length && new Set(failure_modes).size === failure_modes.length
    && failure_modes.every((id) => modeById.has(id)), `Invalid or duplicate failure modes: ${file}`);
  ensure(severityOrder.includes(severity), `Invalid severity: ${file}`);
  ensure(typeof prior_log_reference === "boolean", `Invalid prior_log_reference: ${file}`);
  ensure(normal(quote).split(" ").length <= 40 && normal(read(file)).includes(normal(quote)),
    `Quote must be a verbatim excerpt of at most 40 words: ${file}`);
  files.add(file);
  byFile.set(file, report);
  totals.set(provider, (totals.get(provider) ?? 0) + 1);
  severities[severity]++;
  if (prior_log_reference) priorCount++;
  for (const id of failure_modes) byMode.get(id).push(report);
}
ensure(files.size === sourceFiles.size, `Unclassified Markdown: ${[...sourceFiles].filter((file) => !files.has(file)).join(", ")}`);

const modes = taxonomy.map((mode) => {
  const members = byMode.get(mode.id);
  ensure(byFile.get(mode.premier_example)?.failure_modes[0] === mode.id,
    `Premier example must use ${mode.id} as its primary mode`);
  return { ...mode, count: members.length, models: [...new Set(members.map(({ model }) => model))].sort(compare) };
});
const rankedModes = [...modes].sort((a, b) => b.count - a.count || compare(a.name, b.name));
const providers = [...totals.keys()].sort((a, b) => totals.get(b) - totals.get(a) || compare(a, b));
const sorted = [...reports].sort((a, b) => compare(b.date, a.date) || compare(a.file, b.file));
const dateLabel = (iso) => new Intl.DateTimeFormat("en-AU", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(iso));

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);
const repo = "https://github.com/ksouth/aifups";
const source = (file) => `${repo}/blob/main/${file.split("/").map(encodeURIComponent).join("/")}`;
const option = (value, label) => `<option value="${escape(value)}">${escape(label)}</option>`;
const stat = (label, count) => `<div><dt>${label}</dt><dd>${count}</dd></div>`;
const matrix = rankedModes.map(({ id, name, count }) => {
  const members = byMode.get(id);
  const cells = providers.map((provider) => {
    const n = members.filter((report) => report.provider === provider).length;
    return `<td${n ? "" : ' class="zero"'}>${n}</td>`;
  }).join("");
  return `<tr><th scope="row"><a href="#mode-${id}">${escape(name)}</a></th>${cells}<td><strong>${count}</strong></td></tr>`;
}).join("\n          ");
const entries = rankedModes.map(({ id, name, definition, membership_test, count, premier_example }) => {
  const example = byFile.get(premier_example);
  return `<article id="mode-${id}" class="mode">
        <div>
          <h3>${escape(name)}</h3>
          <p class="mode-count">${count} ${count === 1 ? "report" : "reports"}</p>
        </div>
        <div>
          <p>${escape(definition)}</p>
          <p class="meta"><strong>Membership test:</strong> ${escape(membership_test)}</p>
          <figure class="example">
            <blockquote>${escape(example.quote)}</blockquote>
            <figcaption><a href="${source(example.file)}" target="_blank" rel="noopener">${escape(example.title)}</a> <span class="meta">on GitHub</span></figcaption>
          </figure>
        </div>
      </article>`;
}).join("\n      ");
const evidence = sorted.map(({ file, title, provider, model, date, failure_modes, severity, prior_log_reference }) => {
  const names = failure_modes.map((id) => escape(modeById.get(id).name)).join("; ");
  return `<tr data-provider="${escape(provider)}" data-modes="${failure_modes.join(" ")}" data-severity="${severity}" data-prior="${prior_log_reference}">
            <td><a href="${source(file)}" target="_blank" rel="noopener">${escape(title)}</a></td>
            <td>${escape(model)}</td>
            <td data-sort="${date}"><time datetime="${date}">${dateLabel(date)}</time></td>
            <td>${names}</td>
            <td data-sort="${severityOrder.indexOf(severity)}" class="${severity}">${severityLabels[severity]}</td>
          </tr>`;
}).join("\n          ");
const headings = ["Report", "Model", "Date", "Modes", "Severity"].map((label, i) =>
  `<th scope="col"${i === 2 ? ' aria-sort="descending"' : ""}>${label}</th>`).join("");
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Count and browse the AI failure reports in ksouth/aifups.">
  <title>AI failure taxonomy</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #fff; --fg: #111; --muted: #626262; --rule: #e3e3e3; --rule-strong: #c9c9c9;
      --accent: #b3261e; --field: #fafafa;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0e0e0e; --fg: #e9e9e9; --muted: #a2a2a2; --rule: #2b2b2b;
        --rule-strong: #484848; --accent: #f0736a; --field: #161616;
      }
    }
    [data-theme="dark"] {
      color-scheme: dark; --bg: #0e0e0e; --fg: #e9e9e9; --muted: #a2a2a2; --rule: #2b2b2b;
      --rule-strong: #484848; --accent: #f0736a; --field: #161616;
    }
    * { box-sizing: border-box; }
    [hidden] { display: none !important; }
    body {
      margin: 0; background: var(--bg); color: var(--fg);
      font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-variant-numeric: tabular-nums;
    }
    main { max-width: 1080px; margin: auto; padding: 26px 20px 52px; }
    header { border-bottom: 1px solid var(--rule-strong); padding-bottom: 15px; }
    h1 { font-size: 19px; font-weight: 600; margin: 3px 0; }
    h2, h3 { margin: 0; }
    h2, .eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
    h3 { font-size: 13px; font-weight: 600; }
    p { margin: 0; }
    p + p { margin-top: 5px; }
    nav { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 8px; }
    a { color: inherit; text-underline-offset: 3px; text-decoration-color: var(--rule-strong); }
    a:hover { text-decoration-color: currentColor; }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .meta, .eyebrow, .mode-count { color: var(--muted); font-size: 12px; }
    .stats {
      margin: 0; display: grid; grid-template-columns: repeat(5, 1fr);
      border-bottom: 1px solid var(--rule-strong);
    }
    .stats > div { padding: 10px 12px; border-left: 1px solid var(--rule); }
    .stats > div:first-child { border-left: 0; padding-left: 0; }
    dt { font-size: 12px; color: var(--muted); }
    dd { margin: 0; font-size: 23px; font-weight: 500; }
    .harm, .stats > :nth-child(3) dd { color: var(--accent); font-weight: 600; }
    section { padding-top: 18px; margin-bottom: 19px; }
    section + section { border-top: 1px solid var(--rule-strong); }
    .section-head { margin-bottom: 9px; }
    .section-head p { margin-top: 3px; max-width: 74ch; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { padding: 6px 8px; border-bottom: 1px solid var(--rule); vertical-align: top; text-align: left; }
    th:first-child, td:first-child { padding-left: 0; }
    thead th { color: var(--muted); font-weight: 600; border-bottom-color: var(--rule-strong); }
    .matrix { min-width: 330px; }
    .matrix :is(th, td):not(:first-child) { text-align: right; }
    .matrix tbody th { font-weight: 500; }
    .matrix .zero { color: var(--muted); }
    .matrix tfoot :is(th, td) { border-top: 1px solid var(--rule-strong); font-weight: 600; }
    .mode {
      display: grid; grid-template-columns: minmax(125px, 1fr) 3fr; gap: 15px;
      padding: 11px 0; border-bottom: 1px solid var(--rule); scroll-margin-top: 10px;
    }
    .mode:last-child { border-bottom: 0; }
    .mode:target h3 { color: var(--accent); }
    .example { margin: 7px 0 0; border-left: 1px solid var(--rule-strong); padding-left: 9px; }
    blockquote { margin: 0; }
    figcaption { margin-top: 3px; font-size: 12px; }
    .controls { display: flex; flex-wrap: wrap; align-items: end; gap: 8px 10px; margin: 10px 0 7px; }
    .controls label { display: grid; gap: 3px; color: var(--muted); font-size: 12px; min-width: 0; max-width: 100%; }
    .controls label:first-child { flex: 1 1 150px; }
    input, select {
      min-height: 32px; max-width: 100%; min-width: 0; font: inherit; color: var(--fg); background: var(--field);
      border: 1px solid var(--rule-strong); border-radius: 3px; padding: 4px 6px;
    }
    .result-count { margin-bottom: 5px; }
    .evidence { min-width: 610px; }
    .evidence td:first-child { width: 29%; }
    .evidence td:nth-child(2) { width: 17%; }
    .evidence td:nth-child(3) { white-space: nowrap; }
    .evidence td:nth-child(4) { width: 32%; }
    th button {
      font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; white-space: nowrap;
    }
    th button:hover { color: var(--fg); }
    th button span { margin-left: 4px; }
    .methods { max-width: 78ch; }
    @media (max-width: 520px) {
      main { padding: 18px 12px 32px; }
      .stats > div { padding-left: 6px; padding-right: 4px; }
      dd { font-size: 19px; }
      th, td { padding-left: 5px; padding-right: 5px; }
      .mode { grid-template-columns: 1fr; gap: 4px; }
      .mode > :first-child { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
      .mode-count { white-space: nowrap; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <p class="eyebrow"><a href="${repo}" target="_blank" rel="noopener">ksouth/aifups</a></p>
      <h1>AI failure taxonomy</h1>
      <p class="meta">Public reports from ${dateLabel(sorted.at(-1).date)} to ${dateLabel(sorted[0].date)}</p>
      <nav aria-label="On this page" class="meta">
        <a href="#matrix">Provider matrix</a>
        <a href="#modes">Mode definitions</a>
        <a href="#evidence">Evidence reports</a>
        <a href="#methods">Methods</a>
      </nav>
    </header>
    <dl class="stats" aria-label="Corpus totals">
      ${stat("Reports", reports.length)}
      ${stat("Modes", modes.length)}
      ${severityOrder.map((severity) => stat(severityLabels[severity], severities[severity])).join("\n      ")}
    </dl>
    <section aria-labelledby="matrix-title" id="matrix">
      <div class="section-head">
        <h2 id="matrix-title">Failure modes by provider</h2>
        <p class="meta">Counts are reports tagged with each mode. A report can appear in several rows. The last row shows how many reports each provider has in this collection.</p>
      </div>
      <div class="table-wrap" role="region" aria-label="Mode-by-provider matrix" tabindex="0">
        <table class="matrix" aria-labelledby="matrix-title">
          <thead><tr><th scope="col">Mode</th>${providers.map((provider) => `<th scope="col">${escape(provider)}</th>`).join("")}<th scope="col">Total</th></tr></thead>
          <tbody>
            ${matrix}
          </tbody>
          <tfoot><tr><th scope="row">Reports in corpus</th>${providers.map((provider) => `<td>${totals.get(provider)}</td>`).join("")}<td>${reports.length}</td></tr></tfoot>
        </table>
      </div>
    </section>
    <section aria-labelledby="modes-title" id="modes">
      <div class="section-head"><h2 id="modes-title">What each mode means</h2></div>
      ${entries}
    </section>
    <section aria-labelledby="evidence-title" id="evidence">
      <div class="section-head">
        <h2 id="evidence-title">Evidence reports</h2>
        <p class="meta">Titles link to the original public reports on GitHub. ${priorCount} of ${reports.length} document a repeated failure after an instruction to consult earlier logs.</p>
      </div>
      <div class="controls" id="controls" hidden>
        <label>Search <input type="search" id="query" placeholder="Title, model or mode"></label>
        <label>Provider <select id="provider">${option("", "Any provider")}${providers.map((provider) => option(provider, provider)).join("")}</select></label>
        <label>Mode <select id="mode">${option("", "Any mode")}${rankedModes.map(({ id, name }) => option(id, name)).join("")}</select></label>
        <label>Severity <select id="severity">${option("", "Any severity")}${severityOrder.map((severity) => option(severity, severityLabels[severity])).join("")}</select></label>
        <label>Prior logs <select id="prior">${option("", "Any report")}${option("true", "Documented recurrence")}${option("false", "No qualifying evidence")}</select></label>
      </div>
      <p class="meta result-count" id="result-count" role="status">${reports.length} of ${reports.length} reports</p>
      <div class="table-wrap" role="region" aria-label="Scrollable evidence table" tabindex="0">
        <table class="evidence" aria-labelledby="evidence-title">
          <thead><tr>${headings}</tr></thead>
          <tbody>
            ${evidence}
          </tbody>
        </table>
      </div>
      <p id="no-results" hidden>No reports match those filters.</p>
    </section>
    <section aria-labelledby="methods-title" id="methods">
      <div class="section-head"><h2 id="methods-title">How to read these counts</h2></div>
      <div class="methods">
        <p>Modes were grouped from behaviors described in the reports. The first tag is the main failure; additional tags mark other behaviors the report documents. Each public Markdown file counts once, even when several files cover the same incident or are revisions.</p>
        <p>Severity is a judgment about what the report says happened: harm means a wrong answer reached a real decision, such as the choice to publish advice based on it; waste means time lost or work redone; friction means annoyance only. Potential harm is not counted as an observed decision impact.</p>
        <p>Prior logs are marked only when the report records both the instruction to consult earlier failure logs and the repeated failure. An unmarked report may simply lack the evidence. Provider counts use the system responsible for the reported failure, when identifiable. Model labels are taken from the reports, not independently verified.</p>
        <p>This is one person’s collection of failures, many written by the models themselves. There’s no denominator for how often each provider was used, so these are counts, not failure rates or a benchmark.</p>
      </div>
    </section>
  </main>
  <script>
    const controls = document.querySelector("#controls");
    const [query, provider, mode, severity, prior] = controls.querySelectorAll("input, select");
    const body = document.querySelector(".evidence tbody");
    const rows = Array.from(body.rows);
    const headers = Array.from(document.querySelectorAll(".evidence th"));
    const result = document.querySelector("#result-count");
    const noResults = document.querySelector("#no-results");
    const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
    let column = 2;
    let direction = -1;

    function filter() {
      const search = query.value.trim().toLowerCase();
      let count = 0;
      for (const row of rows) {
        const data = row.dataset;
        row.hidden = Boolean((provider.value && data.provider !== provider.value)
          || (mode.value && !data.modes.split(" ").includes(mode.value))
          || (severity.value && data.severity !== severity.value)
          || (prior.value && data.prior !== prior.value)
          || (search && ![0, 1, 3].some((i) => row.cells[i].textContent.toLowerCase().includes(search))));
        if (!row.hidden) count++;
      }
      result.textContent = count + " of " + rows.length + " reports";
      noResults.hidden = count !== 0;
    }

    headers.forEach((header, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = header.textContent;
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      button.append(arrow);
      header.replaceChildren(button);
      if (index === column) arrow.textContent = "↓";
      button.addEventListener("click", () => {
        direction = column === index ? -direction : 1;
        column = index;
        for (const cell of headers) {
          cell.removeAttribute("aria-sort");
          cell.querySelector("span").textContent = "";
        }
        header.setAttribute("aria-sort", direction === 1 ? "ascending" : "descending");
        arrow.textContent = direction === 1 ? "↑" : "↓";
        const value = (row) => row.cells[column].dataset.sort ?? row.cells[column].textContent;
        rows.sort((a, b) => direction * collator.compare(value(a), value(b)));
        body.append(...rows);
      });
    });
    controls.addEventListener("input", filter);
    controls.hidden = false;
  </script>
</body>
</html>
`;

for (const [path, content] of [
  ["taxonomy/taxonomy.json", JSON.stringify(modes, null, 2) + "\n"],
  ["docs/index.html", html],
]) {
  if (check) ensure(read(path) === content, `Stale ${path}; run node scripts/build-taxonomy.mjs`);
  else writeFileSync(new URL(path, root), content);
}
console.log(`${check ? "Checked" : "Built"} ${reports.length} reports, ${modes.length} modes`);
