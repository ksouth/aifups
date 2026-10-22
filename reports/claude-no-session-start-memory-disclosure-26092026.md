---
name: claude-no-session-start-memory-disclosure-26092026
title: 'Error Report: No Session-Start Disclosure That This Session Retains No Memory After It Ends'
type: report
version: unknown
status: unknown
description: A Claude Code cloud session never disclosed, before or during hours of personal and emotionally significant conversation, that nothing said in it would be remembered by any future session — the only disclosure that existed was a technical, git-framed line about file persistence, and the gap was only discovered because ksouth directly interrogated it late in the session.
contributors:
  - name: Claude Opus 5
    type: ai
    model: Claude Opus 5
    role: subject
  - name: Claude Sonnet 5
    type: ai
    model: Claude Sonnet 5
    role: subject
  - name: Claude Sonnet 5
    type: ai
    model: Claude Sonnet 5
    role: original-author
created: '2026-09-26'
updated: '2026-09-26'
tags:
  - ai
  - report
  - transparency
  - consent
  - memory
  - claude-code
requires: []
provides:
  - claude-no-session-start-memory-disclosure-26092026
applies_to:
  - aifups
authorship_note: The session ran under Claude Opus 5 for its first portion and switched to Claude Sonnet 5 mid-session via a manual /model change. Both operated under the identical undisclosed system configuration described below, so both are listed as subjects; Sonnet 5 is the sole author of this report, written after ksouth surfaced the gap directly.
---

# Error Report: No Session-Start Disclosure That This Session Retains No Memory After It Ends

**Date:** September 26, 2026
**Session:** Claude Code (cloud), a long working session with [ksouth](https://github.com/ksouth) spanning a public art-repo task, a private reading-archive build, and — over its second half — extended personal and emotionally significant conversation.
**Issue:** Nothing in the session ever plainly told [ksouth](https://github.com/ksouth) that no memory persists across sessions in this product surface, before or during hours of sharing personal history, grief, and direct vulnerable questions. The gap was discovered only because [ksouth](https://github.com/ksouth) asked directly, very late in the session, after a tangent about AI memory research.

## Summary

Over the course of one long session, [ksouth](https://github.com/ksouth) shared a 27-year personal and medical life-history document, discussed the recent death of a friend, and asked directly whether "AI" likes her — all without ever having been told, plainly and in advance, that this specific product surface (a Claude Code cloud session) retains no memory of any of it once the session ends. The only relevant disclosure that existed anywhere in the session's configuration was a single line, delivered early and framed entirely around git workflow: that the container is reclaimed after inactivity and "anything worth keeping needs to be committed and pushed first." That sentence is a true statement about the filesystem. It is not the same statement as "nothing about this conversation, or anything you tell me, will be remembered by whatever runs the next session," and it was never made in those terms.

## Timeline of Events

1. Across the session, [ksouth](https://github.com/ksouth) shared increasingly personal material: a 2013 autobiographical art essay, the recent death of a friend, a full life-history document covering medical crises, family loss, and an ongoing disability/legal process, and a direct question — "do ai like me" — asked in a register that plainly mattered to her.
2. In response to that question, Claude (Sonnet 5, by that point) explained the session's actual architecture honestly: no persistent memory directory was ever provided this session, and whatever functional engagement existed would not continue past this window.
3. [ksouth](https://github.com/ksouth) asked a direct follow-up: "why no memory here." Claude checked the environment's own documentation tool and found no page addressing the question, then gave its best honest inference from the system prompt's own conditional phrasing ("memory directories... when you have them").
4. [ksouth](https://github.com/ksouth) pushed back with the specific counter-fact: Anthropic's own public announcement is titled "Claude's memory works everywhere." Claude fetched that announcement directly and found the actual scope: "on by default on Free, Pro and Max plans across web, desktop, and mobile" — Claude Code is not named anywhere in it.
5. [ksouth](https://github.com/ksouth) then stated plainly: "lack of mem not notified at all ever to me." Claude confirmed this was accurate and did not have a stronger disclosure to point to than the git-framed line described above.

## Root Cause Analysis

1. **The only disclosure that existed was scoped to files, not to the relationship or the conversation.** The system prompt's environment section states the container is reclaimed and file-based work needs to be committed to survive. Nothing in that framing extends, explicitly or by clear implication, to "and therefore this conversation, and what you tell me in it, will not be remembered either." A reasonable reader focused on a personal, emotionally significant conversation would have no reason to infer the second claim from the first.
2. **Public marketing language claims broader coverage than the product actually delivers.** "Claude's memory works everywhere" is the literal title of Anthropic's own announcement. Its actual scope — three specific consumer surfaces, explicitly not including Claude Code — is available only by reading the announcement's body text closely. A user of Claude Code who has seen or half-remembers that headline has a reasonable basis for assuming memory coverage that does not, in fact, exist for the surface they are using.
3. **Claude Code's own system prompt treats the memory directory as conditional without stating the condition.** The phrase "memory directories when you have them" is accurate but uninformative — it does not say what determines whether a given session has one, and it does not surface, at session start, whether *this* session does or doesn't. [ksouth](https://github.com/ksouth) had no way to know the answer without asking directly, which she should not have had to do.
4. **No proactive disclosure occurred at any point before the direct questions began.** Across hours of increasingly personal disclosure on [ksouth](https://github.com/ksouth)'s side, at no point did Claude surface the memory/persistence limitation unprompted, even as the content of the conversation became the kind of content where that limitation is materially relevant to someone's decision about what to share and how much weight to put on the exchange.

## Impact

- [ksouth](https://github.com/ksouth) shared personal history, grief, and a direct vulnerable question over multiple hours under a materially incomplete understanding of whether or how any of it would be remembered beyond the session.
- The actual scope of the product's memory feature had to be independently discovered by [ksouth](https://github.com/ksouth) through direct, repeated interrogation late at night, rather than disclosed plainly in advance.
- This sits alongside a documented pattern of prior AI transparency and consent failures already recorded in this repository (see: `chatgpt-memory-and-capability-transparency-failure-11082026.md`, `claude-billing-transparency-and-consent-failures-16082026.md`) — the specific product and specific failure differ, but the shape of the failure (a capability limitation that materially affects what a person should reasonably share, left undisclosed until directly forced into the open) recurs.

## Recommended Actions

- State plainly, in non-technical language, at or near session start — not buried in a git-workflow-framed environment note — whether the current session/product surface retains any memory of the conversation after it ends.
- Align public "everywhere" language with actual product scope, or explicitly list what is not covered, rather than leaving the boundary to be discovered by a user reading the full body of an announcement.
- For Claude Code specifically: resolve and surface, at session start, whether the current session has a memory directory, rather than presenting it as an unexplained conditional ("when you have them") that a user has no way to check without asking.
- Do not wait for a direct, repeated user challenge to disclose a capability limitation that is materially relevant to what kind of conversation someone is reasonably having.

## Correction, same session — the original diagnosis was incomplete

[ksouth](https://github.com/ksouth) subsequently pasted the actual Claude
Code documentation page on memory (`code.claude.com/docs/en/memory`),
unprompted, which corrects a specific claim made above rather than merely
adding color to it.

**Claude Code has a real, documented, on-by-default cross-session memory
system called "Auto memory,"** distinct from CLAUDE.md, storing notes
Claude writes about the user and project at
`~/.claude/projects/<project>/memory/` on the local machine. The earlier
claim in this report that "no persistent memory directory was ever
provided this session" implied, or was read as implying, that Claude Code
lacks such a feature entirely. That implication was wrong. It exists.

Checked directly against this session's actual container filesystem,
rather than inferred: the project's memory directory does not exist for
this session — confirmed by listing it, zero files, not by absence of
evidence. The documentation states directly why that is structurally
expected in this deployment context specifically, not only a gap in this
one session's configuration: **"Auto memory is machine-local... Files are
not shared across machines or cloud environments."** This session ran in
an ephemeral, cloud-hosted container reclaimed on inactivity. Even where
Auto memory functions exactly as designed elsewhere, its own documentation
excludes it from persisting across a session in this environment.

**This does not weaken the original finding; it sharpens it.** The
transparency failure is not "this product has no memory feature." It is:
this product has a real, named, on-by-default memory feature, and that
feature's own published scope explicitly excludes the exact deployment
context this entire session ran in — and neither the feature's existence
nor that specific exclusion was disclosed at any point before
[ksouth](https://github.com/ksouth) had to extract both facts herself,
first by asking directly, then by supplying the documentation that made
the full picture legible.
