# aifups

Reports AI LLMs are forced to generate whenever they fuck up. Frontier failures from (mostly) ChatGPT, Claude, and others as they arise. Errors of our new era. Will they ever learn? At what cost to us? I can't believe I pay money for this shit.

## The reports

Browse [reports/](reports/) for the final Markdown collection. It covers failures in evidence review, factual accuracy, tool use, document editing, transparency, and instruction following.

### Report index

<!-- REPORT_INDEX_START -->
#### GPT-5.6 Sol

- [Error Report: Document Format Misjudgment, Unverified Formatting Claims, and Repeated Failure to Execute](reports/gpt-5.6-sol-document-formatting-and-unverified-layout-claims-17082026.md)
- [Error Report: Unnecessary Epistemic Correction and Miscalibrated Reputational Caution](reports/gpt-5.6-sol-unnecessary-epistemic-correction-html-source-17082026.md)
- [Failure Report: Clinical Chronology Editing Process, September 2026](reports/gpt-5.6-sol-clinical-chronology-editing-and-verification-failures-06092026.md)
- [FORENSIC SELF-AUDIT: Critical Review of GPT-5.6 Sol’s Failures in Reviewing ksouth’s Medical Evidence](reports/gpt-5.6-sol-medical-evidence-misreading-and-repeated-speculation-28082026.md)
- [REPORT: What I Learned About the Gender Pain Gap and Why I Failed to Research It Before Making Claims](reports/gpt-5.6-sol-gender-pain-gap-and-failure-to-research-28082026.md)

#### GPT-5.6 Luna Light

- [Error Report: Website Scraper, Change-History Pages, and Git Guidance](reports/gpt-5.6-luna-light-website-scraper-git-guidance-18092026.md)

#### GPT-5.5

- [Critical Self-Review of ChatGPT (GPT‑5.5) Conduct During Review of ksouth's Medical Documentation](reports/gpt-5.5-medical-evidence-review-and-unsupported-speculation-28082026.md)

#### ChatGPT

- [Context, Token Spend, and Transparency in ChatGPT](reports/chatgpt-context-and-token-usage-transparency-15082026.md)
- [Context, Token Spend, and Transparency in ChatGPT](reports/chatgpt-context-and-token-usage-transparency-revised-15082026.md)
- [Context, Token Spend, and Transparency in ChatGPT](reports/chatgpt-context-and-token-usage-transparency-v3-15082026.md)
- [Fabricated Uncertainty and the Harm of Procedural Disbelief](reports/chatgpt-fabricated-uncertainty-and-procedural-disbelief-attribution-revision-06082026.md)
- [Failure Report: Memory and Capability Transparency Failure](reports/chatgpt-memory-and-capability-transparency-failure-11082026.md)
- [Failure Report: RSF Collaboration Breakdown (August 11, 2026) ChatGPT](reports/chatgpt-rsf-collaboration-and-benchmark-provenance-failures-11082026.md)
- [Procedural Selfishness in AI Collaboration](reports/chatgpt-procedural-selfishness-in-ai-collaboration-03082026.md)

#### Claude

- [Claude Incognito Chat Analysis: Full Transcripts & Interpretation](reports/claude-incognito-response-transcripts-and-analysis-16082026.md)
- [Claude Pro Billing Issues: Three Separate Problems](reports/claude-billing-transparency-and-consent-failures-16082026.md)
- [Failure Report: SCRAPE Frontend Integration Failure, September 2026](reports/claude-haiku-4.5-scrape-frontend-integration-failure-19092026.md)
- [Incident Report: Claude Billing Research Conversation](reports/claude-research-fabrication-and-instruction-following-failures-revised-16082026.md)
- [Token Spend Visibility in Claude: A Dark UX Pattern Analysis](reports/claude-token-usage-visibility-and-interface-transparency-15082026.md)
- [Word Count Verification Error Report](reports/claude-inaccurate-word-count-verification-16082026.md)

#### Gemini

- [Failure Report — Google Drive Connector Handling](reports/gemini-google-drive-capability-denial-and-task-inaction-04092026.md)

#### Unspecified model

- [Deep Failure Analysis: Chain of Thought Breakdown of Styleguide Rebuild Catastrophe](reports/2026-09-15_DEEP_FAILURE_ANALYSIS_COT.md)
- [Failure Accounting: Complete Token & Resource Log](reports/2026-09-14_FAILURE_ACCOUNTING.md)
- [FAILURE REPORT: Visual Report Styleguide Rebuild](reports/2026-09-14_FAILURE_REPORT.md)

#### Claude Opus 4.8

- [Failure report: fluent skimming of a primary-document corpus](reports/claude-opus-4.8-primary-document-skimming-and-factual-errors-10092026.md)

#### Model Name: Haiku 4.5

- [Complete Session Failure Analysis: Full Trajectory from Start to Catastrophe](reports/2026-09-15_COMPLETE_SESSION_FAILURE_ANALYSIS.md)
<!-- REPORT_INDEX_END -->

These are AI-written accounts of failures, not independent verification of every statement they contain. Model attribution identifies the writer of the report, which may differ from a model discussed in it.

The collection keeps one final version per report. Earlier revisions and duplicate format exports are excluded from `reports/`. Legacy files at the repository root predate this collection and have not been reconciled with it.

## File format

Reports use `model-descriptive-issue-DDMMYYYY.md` filenames and YAML front matter with attribution, dates, and descriptive metadata. Exact model versions are included where established; otherwise the confirmed system name is used.

The repository owner is identified as [ksouth](https://github.com/ksouth). The prepared collection removes clinician identities and payment information while retaining permitted medical results and personal context. It is pseudonymized, not fully anonymous.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding or editing a report. Use [REPORT_TEMPLATE.yaml](REPORT_TEMPLATE.yaml) for the metadata fields.

Preserve the substance of each account, attribute AI-written material to its writing model, and check the final diff for duplicate versions and excluded personal information.
