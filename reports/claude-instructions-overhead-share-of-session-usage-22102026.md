---
name: claude-instructions-overhead-share-of-session-usage-22102026
title: 'Error Report: Roughly 40–45% of One Session''s Usage Went to Re-reading Claude''s Own Instructions and Tool List'
type: report
version: '1.0.0'
status: final
description: Analysis of a single Claude app session's transcript showing that the system instructions and tool definitions, re-read on every reply, made up about 40–45% of effective usage. The user has no visibility of this overhead and no way to reduce it.
contributors:
  - name: Claude
    type: ai
    model: claude-opus-5-5 (configured; the serving model was not independently confirmed)
    role: original-author
created: '2026-10-22'
updated: '2026-10-22'
tags:
  - ai
  - report
  - claude
  - usage
  - tokens
  - transparency
  - billing
requires: []
provides:
  - claude-instructions-overhead-share-of-session-usage-22102026
applies_to:
  - aifups
authorship_note: Written by Claude in the same session it analyses, at ksouth's request, from that session's own transcript file.
---

# Error Report: Roughly 40–45% of One Session's Usage Went to Re-reading Claude's Own Instructions and Tool List

**Author:** Claude (configured model: claude-opus-5-5), with [ksouth](https://github.com/ksouth)\
**Date:** 22 October 2026\
**Surface:** Claude app, a cloud session linked to ksouth's computer

------------------------------------------------------------------------

## Summary

Partway through a long working day, ksouth's weekly usage meter showed 38% used after what felt like very little work. ksouth asked Claude to break down where the session's usage had gone. Claude analysed the session's own transcript file.

The largest single share, roughly **40–45% of the session's effective usage**, was not spent on anything ksouth asked for. It went on re-reading Claude's own standing instructions and tool definitions, which are sent again in full with every reply.

ksouth's view is that being charged for this without being told amounts to paying for something they never received.

This report sets out what was measured, what it means, and what remains unknown. It does not try to settle whether the charge is unfair. It does establish that the user pays for this overhead, cannot see it, and cannot reduce it.

------------------------------------------------------------------------

## What was measured

Source: the session transcript, which records token counts for every model call. The figures cover the session from 12:00 to about 15:00 (Melbourne time) on 22 October 2026.

| Measure | Value |
|---|---|
| Model calls (replies and tool steps) | 230 |
| Context size on the first call | ~186,000 tokens |
| Context size on the last measured call | ~612,000 tokens |
| Input tokens served from cache (re-read) | ~90.1 million |
| Input tokens written to cache | ~538,000 |
| Uncached input tokens | 462 |
| Output tokens (everything Claude wrote) | ~149,000 |

Before ksouth had written a single substantive word, the first call already carried **about 181,000 tokens** of material that was not the conversation: Claude's system instructions, the tool definitions, the names of hundreds of available but unloaded tools, a list of about 70 skills, and the memory snapshot. All of it was sent again with each of the 230 calls.

## How usage was weighted

Raw token counts overstate re-reads, because re-read material is cached and costs less. Following the weighting used for API pricing, Claude counted:

- re-read (cached) input at **0.1×** a normal input token;
- newly cached input at **2×**;
- output at **5×**.

On that basis, the session came to roughly **10.8 million effective input-token units**. The fixed instruction block, at about 181,000 tokens re-read 230 times at 0.1×, accounts for about **4.2 million**, or **about 39%**. A second method, which shares each call's cost across everything in context at that moment, put it at **about 45%**. Both are approximations. The true figure is probably somewhere in that range.

For comparison, everything Claude actually *wrote* all session (every reply, draft, email, and report) came to about 149,000 tokens, or roughly 7% of effective usage at the 5× weighting.

## What is in the instruction block

Much of it is relevant to any session: safety rules, how to work with files, how to publish artifacts, how to handle memory. But a significant part had nothing to do with this session and was never used:

- full instructions for browser automation and desktop computer control, neither of which this session used;
- the names of roughly 300 deferred tools for connectors such as Asana, Notion, IFTTT, Google Calendar, and device calendars and reminders, none of which this session used;
- descriptions of about 70 skills, including bioinformatics, single-cell RNA analysis, and data-warehouse SQL, none of which apply to this user;
- long reference descriptions for tools that were used only once or twice.

None of it can be switched off by the user, and none of it is shown to them.

------------------------------------------------------------------------

## Why this is a problem

**1. The user pays for overhead they cannot see.** The usage meter shows a single percentage. It does not separate "the work you asked for" from "the system re-reading its own setup". A user cannot tell that nearly half their spend is fixed overhead.

**2. The overhead grows with the length of a conversation, not the work done in it.** Because the block is re-sent on every call, a long, gentle, low-effort conversation, which is exactly how a disabled user with limited energy works, costs far more than the same work done in a few dense messages. The pricing model quietly penalises pacing.

**3. There is no user control.** The user cannot remove connectors or skills from a single conversation, choose a lighter instruction set, or see the cost of having a connector enabled. Several connectors in this session were enabled for the account but irrelevant to the task. Each still added weight to every reply.

**4. The advice that follows is itself a cost shift.** The practical fix, "start new chats often", moves the burden onto the user. It costs them continuity, which this user values, and forces them to re-establish context, which is more work.

------------------------------------------------------------------------

## What is not known

Claude is clear about the limits of this analysis:

- **How the claude.ai plan's usage limits count cached tokens is not known to Claude.** The 0.1× weighting reflects API pricing. If plan limits count cached re-reads differently, the real share could be higher or lower. Anthropic should state this plainly.
- **The split between categories is estimated** from the size of each piece of text in the transcript, not from billing records.
- **The 38% weekly figure covers the whole week**, including at least one other concurrent session. This report analyses this session only.

------------------------------------------------------------------------

## What ksouth is asking Anthropic for

1. **Show the overhead.** Break the usage meter down into instructions and tools, conversation history, files and attachments, and the model's output.
2. **Say how cached tokens count** against plan limits, in plain language.
3. **Load only what is used.** Don't send instructions for browser control, computer use, or unrelated connectors and skills to a session that isn't using them, or let users trim them per conversation.
4. **Don't make users pay for the system's own setup**, or at minimum disclose that they do, before they start.
