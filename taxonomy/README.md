# Classifying a report

The [dashboard](https://ksouth.github.io/aifups/) counts public Markdown files in `reports/`, not unique incidents. Related write-ups and revisions count separately and may carry different tags. Classify what each report shows, not everything that went wrong in the underlying session.

1. Read the whole report. Identify the system whose behavior it documents (which can differ from the report's author), and use the report's creation date. If the creation date is unknown, use a dated report heading or the date in the repository filename. A related report can corroborate a model when it identifies the same incident; don't infer a version from a generic product name. Mark a configuration label if the serving model couldn't be confirmed.
2. Use the membership tests in [taxonomy.json](taxonomy.json). Put the best-evidenced main mode first, followed by any other modes with distinct evidence in the report. Don't tag a hypothetical risk or infer causes or intent the report cannot show.
3. Pick the strongest observed consequence: `harm` means a wrong answer reached a real decision (such as publishing advice based on it); `waste` means lost time or rework without that downstream reliance; `friction` means annoyance or uncertainty only. High stakes, an inaccurate draft, or a possible bad outcome aren't enough for `harm`.
4. Set `prior_log_reference` to `true` only if the report documents both an instruction to consult earlier failure logs or reports and recurrence of the same failure afterward. Corrections during a session, generic project notes and a retrospective citation don't establish both. `false` means the file doesn't establish it, not that it didn't happen.
5. Review the source for redaction before publishing. Write a public-safe title and one-sentence impact summary. Quote one contiguous excerpt of at most 40 words that shows the main mode, using only the report's text. Omit personal names, clinicians, institutions, addresses, emails, identifiers and clinical details that aren't necessary to show the failure. If an excerpt can't be shared intact, choose a different one. Review the filename too: it appears in the public link.

## Files

For a report that fits existing modes, add the approved public Markdown under `reports/` and add **one** object to the array in [reports.json](reports.json):

| Field | Value |
| --- | --- |
| `file` | Repository-relative Markdown path, e.g. `reports/example.md` |
| `title` | Public-safe title |
| `provider`, `model` | System responsible for the failure and its supported label; use `Unknown` if not established |
| `date` | Report date as `YYYY-MM-DD` |
| `failure_modes` | Array of mode IDs, with the primary mode first |
| `severity` | `harm`, `waste` or `friction` |
| `impact_summary` | Short, de-identified statement of what actually happened |
| `quote` | Verbatim, public-safe excerpt of at most 40 words |
| `prior_log_reference` | JSON boolean |

[taxonomy.json](taxonomy.json) is an array of objects with `id` (stable slug), `name`, `definition`, `membership_test` (a one-sentence test), `count` (number of tagged reports), `models` (distinct labels in those reports), and `premier_example` (the `file` of a report with that mode first). Only add a mode when its membership test captures a recurring behavior that existing modes miss. The builder refreshes `count` and `models`; leave those alone when adding a report.

From the repo root, run:

```sh
node scripts/build-taxonomy.mjs
node scripts/build-taxonomy.mjs --check
```

The build has no network or dependency install. It validates report coverage, allowed values, example links and verbatim quotes (ignoring whitespace differences), then refreshes the mode totals and `docs/index.html`. It can't detect identifying details; the redaction review is manual. Commit the new source, the data change and the generated outputs together. GitHub Pages serves the checked-in HTML from `main` / `docs`.
