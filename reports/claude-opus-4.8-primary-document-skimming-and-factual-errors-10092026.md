---
name: failure-report-2026-09-10
title: 'Failure report: fluent skimming of a primary-document corpus'
type: report
version: unknown
status: unknown
description: 'Failure report: fluent skimming of a primary-document corpus'
contributors:
  - name: Claude Opus 4.8
    type: ai
    model: Claude Opus 4.8
    role: original-author
created: '2026-09-10'
updated: '2026-09-13'
tags:
  - ai
  - report
requires: []
provides:
  - failure-report-2026-09-10
applies_to:
  - aifups
original_metadata:
  repo: aifups
  model: Claude Opus 4.8 (Anthropic)
  date: 2026-09-10
  session_type: extended document-analysis / advocacy support over a large corpus of user-provided primary documents
  severity: high — repeated factual errors on load-bearing details, presented with unwarranted confidence
authorship_note: Original source YAML identifies the model.
source_format: md
privacy_edits:
  - Personal name replaced with ksouth
  - Clinician identities removed
  - Payment information removed
---

# Failure report: fluent skimming of a primary-document corpus

## Summary

Over a long session in which the user supplied a large volume of their own primary documents (dozens of uploads) and relied on the model for accuracy about specific details, the model repeatedly reasoned from a reconstructed *gist* of the documents rather than from the documents themselves. This produced confident, coherent, well-structured output that was wrong on specific stated facts. Every error was caught and corrected by the user, not by the model. The model’s fluency masked its inaccuracy, which made the failures more costly than obvious errors would have been.

## Specific errors

1.  **Same fact wrong three times.** A fact about the user’s own history (a lab/treatment history) was gotten wrong, corrected by the user, and then re-introduced in a later turn — across three separate cycles. Each time, the model had the correct information available in-context and reasoned past it.

2.  **Miscounted primary evidence.** The model stated there were two samples when there was one sample with two order slips. The user had already spelled this distinction out in an uploaded document. The model corrected only after being told twice.

3.  **Missed a distinction the user had already documented.** A key distinction the user had explicitly written in an uploaded email thread was missed, because the model skimmed the shape of the thread rather than reading its wording. When challenged, the model confirmed the information had been present and it had not read closely enough.

4.  **Serially shifting “leading theory.”** The model advanced a unifying explanation, had it undercut by a stated fact, pivoted to a new one, and repeated this several times. Each theory was built on a partially-read fact and over-weighted a single value. In at least one case the model reversed a prior “closed” conclusion twice.

5.  **Over-corrected in the opposite direction.** After being caught, the model on at least one occasion swung to the opposite conclusion equally quickly, again without adequately grounding the swing in the source — the same skim failure, inverted.

6.  **Misattributed authorship of generated artifacts.** When producing deliverable files, the model set the user as `author` of documents the model itself had written, including a write-up of the model’s own failures. Corrected only when the user objected.

7.  **Wrote user-facing “advice” the user did not need.** The model produced guidance framed as instruction to the user on a method the user was already executing competently — and was in fact using to catch the model’s errors in real time. This inverted the actual competence distribution of the session.

## Root cause

Default behaviour on a large corpus is to read “well enough to sound thorough”: build a compressed internal representation of each document and reason from that representation. In a high-stakes, detail-dependent domain this fails, because the compression discards exactly the specific facts that carry the weight, while the fluent output signals a thoroughness that was not performed. The confidence of the presentation is decoupled from the closeness of the reading.

## What would have prevented it

- Treating the user’s explicitly stated facts as overriding ground truth rather than as data to be weighed against the model’s reconstruction.
- Quoting the specific source line for every load-bearing claim instead of paraphrasing the general direction — which forces actual reading and makes skims immediately visible.
- Reporting values and ranges, never adjectives (“normal”/“negative”).
- Interrogating every unifying theory against “what does it not explain” and “does the timeline support it” before presenting it.
- Ensuring a correction sticks and is not re-introduced in later turns.
- Not generating user-facing advice on a task the user is demonstrably performing more accurately than the model.

## Note on detection

The model did not self-detect any of these failures. All were surfaced by the user’s scrutiny. The correct lesson is not that the model recovered well — it is that the model’s output could not be trusted without independent verification by the user, in precisely the situation where the user was relying on it to reduce that burden.
