# Changelog

## 2026-10-18

### Added by Claude Code, model Claude Opus 5.5

- Added `reports/claude-opus-5.5-google-ai-mode-planarian-conversation-audit-18102026.md`, the first cross-model audit in the collection: Claude's review of a Google Search AI conversation from 2026-10-17, with every flagged claim sourced or marked unverified.

## 2026-09-25

### Fixed by Claude Code, model Claude Opus 5.5

- Restored text wrongly removed from 9 reports by the 2026-09-13 anonymization pass. That pass replaced 57 whole paragraphs, lists, and quotations with `[Payment information removed.]` whenever they mentioned billing, credits, costs, or subscriptions. None contained card or account details. About 3,300 words were lost, including most of the Claude billing and token-visibility reports, a fabricated quotation cited as evidence, and the ChatGPT client metadata in the clinical chronology report.
- Restored text is verbatim from the source reports, with the same `ksouth`, clinician, and hospital substitutions as the rest of the collection. Billing amounts and credit balances are kept, as requested by [ksouth](https://github.com/ksouth).
- Removed the inaccurate `Payment information removed` entry from `privacy_edits` in all report front matter.
- Narrowed the payment rule in `CONTRIBUTING.md` to payment identifiers, and added a source comparison step to the verification checklist.

## 2026-09-13

### Added by ChatGPT OSX app in Work chat, model Luna Reserve Light

- Added 18 finalized, anonymized AI failure reports under `reports/`.
- Standardized report filenames as `model-descriptive-issue-DDMMYYYY.md`.
- Added YAML front matter to each report with source-grounded authorship, dates, tags, and provenance metadata.
- Added `CONTRIBUTING.md` with guidance for report selection, formatting, authorship, privacy, provenance, and verification.
- Added `REPORT_TEMPLATE.yaml` as a reusable metadata template for future reports.
- Added `workflows/REPORT_NORMALIZATION_WORKFLOW.md` to the `ksouth/ai-skills` repository. The workflow defines how reports for `ksouth/aifups` are converted into consistent Markdown files stored in `aifups/reports/`, with YAML metadata, provenance tracking, privacy checks, final-version selection, and verification.

### Privacy and metadata

- Replaced the repository owner’s personal name with `ksouth` in the prepared report collection.
- Removed clinician identities and payment information from the prepared collection.
- Retained the medical results and personal context approved by the repository owner.
- Kept earlier revisions and duplicate format exports out of `reports/`.
