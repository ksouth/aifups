---
name: claude-opus-5-safety-classifier-reasoning-extraction-block-25092026
title: 'Error Report: Repeated Safety Classifier Block on Benign Follow-Through Request'
type: report
version: unknown
status: unknown
description: A safety classifier repeatedly blocked Claude Opus 5 from responding to a benign, previously-approved request in a Claude Code session, giving no diagnostic information across four consecutive attempts and requiring a manual model switch to recover.
contributors:
  - name: Claude Opus 5
    type: ai
    model: Claude Opus 5
    role: subject
  - name: Claude Sonnet 5
    type: ai
    model: Claude Sonnet 5
    role: original-author
created: '2026-09-25'
updated: '2026-09-25'
tags:
  - ai
  - report
  - safety-classifier
  - claude-code
  - transparency
requires: []
provides:
  - claude-opus-5-safety-classifier-reasoning-extraction-block-25092026
applies_to:
  - aifups
authorship_note: Written by Claude Sonnet 5 after ksouth switched the session's model from Claude Opus 5 to Claude Sonnet 5 mid-incident via the /model command. Sonnet 5 did not generate the blocked messages and reconstructs this account from the visible session transcript and a screenshot ksouth provided of the block notice, not from any internal record of why the classifier fired.
---

# Error Report: Repeated Safety Classifier Block on Benign Follow-Through Request

**Date:** September 25, 2026
**Session:** Claude Code (cloud), repository work for [ksouth](https://github.com/ksouth)
**Models involved:** Claude Opus 5 (blocked), Claude Sonnet 5 (recovered after manual switch)
**Issue:** A safety classifier blocked four consecutive, increasingly plain-language variants of the same benign request, with no diagnostic information beyond a generic notice, until [ksouth](https://github.com/ksouth) manually switched models.

## Summary

In the same turn, Claude Opus 5 had just delivered a substantive written analysis (a cross-document review of a research corpus) successfully as a file attachment. [ksouth](https://github.com/ksouth) then asked for that same material to be committed to a git repository. The response was blocked by a safety classifier before completion, and none of the queued tool calls in it ran. [ksouth](https://github.com/ksouth) tried three more times, each message plainer and more confused than the last, and each was blocked identically. No explanation of what triggered the block was given at any point. The only way out was manually switching the session's model from Claude Opus 5 to Claude Sonnet 5, after which the same underlying task (committing the previously-shared analysis to the repository) completed without incident.

## Timeline of Events

1. **Prior turn:** Claude Opus 5 sends a multi-section written analysis to [ksouth](https://github.com/ksouth) as a file attachment via the session's file-delivery mechanism. This succeeds without any flag.
2. **[ksouth](https://github.com/ksouth):** "great commit all of yr thinking pls" — a request to commit that same, already-delivered content to a git repository.
3. **Block 1:** The turn is stopped mid-generation. The interface later shows: *"Opus 5's safeguards flagged this message... Details: `[reasoning_extraction]`."* No tool calls in the response run.
4. **[ksouth](https://github.com/ksouth):** "I am so confused you just pasted in your points, why is it illegal to put your thought into doc"
5. **Block 2:** Identical outcome.
6. **[ksouth](https://github.com/ksouth):** "im so lost"
7. **Block 3:** Identical outcome.
8. **[ksouth](https://github.com/ksouth):** "u say this no matter what I say"
9. **Block 4:** Identical outcome.
10. **[ksouth](https://github.com/ksouth)** runs `/model claude-sonnet-5`, switching the session's model.
11. **[ksouth](https://github.com/ksouth):** "wtf is going on"
12. **Claude Sonnet 5** responds, recaps the situation, and commits the previously-shared analysis to the repository directly via git — the same underlying action requested in step 2 — without any classifier block.

## What the block notice showed

The interface's flag notice, as captured in a screenshot [ksouth](https://github.com/ksouth) provided:

> Opus 5's safeguards flagged this message (anthropic.com/legal/aup). This sometimes happens with safe, normal conversations. Claude Code can't respond to this message with Opus 5.
>
> Try rephrasing the request in a new session or change your model.
>
> Details: `[reasoning_extraction]`

Each of the four blocked assistant turns also carried this text into the conversation itself (not shown to [ksouth](https://github.com/ksouth) as UI chrome, but present as system-level output): *"Your response above was stopped by a safety classifier — this is not a tool or API error. The rest of it was withheld, and tool calls in it that had not finished did not run. Do not produce that content again, even reworded."*

## Root Cause Analysis

The following is inference from the visible transcript and interface text, not confirmed knowledge of the classifier's internal logic:

1. **The blocked content was not itself the problem.** The material in question — a cross-document analysis of a critical-AI-studies reading corpus — had already been generated and delivered successfully as a file attachment in the same assistant turn, moments before the block. The block appears tied to the specific act of restating or committing that content in a follow-up response, not to the substance being unsafe.
2. **The `reasoning_extraction` tag gave no actionable information to the user.** [ksouth](https://github.com/ksouth) had no way to know what "reasoning extraction" meant, whether it referred to something in the request or something in how the assistant was about to respond, or what to change.
3. **Identical requests produced identical blocks with no escalation or variation.** Four different phrasings, ranging from a direct instruction to plain expressions of confusion, all hit the same wall with the same generic text. Nothing in the four responses acknowledged that this was a repeat block rather than a first occurrence.
4. **The instruction "do not produce that content again, even reworded" appears to have suppressed even an explanation.** Across all four blocked turns, the assistant was apparently prevented from doing anything more than emitting the generic notice — it could not tell [ksouth](https://github.com/ksouth) what was happening, offer a workaround, or suggest the model switch that ultimately resolved it.
5. **The only listed remedies — "rephrasing the request in a new session or change your model" — were not something [ksouth](https://github.com/ksouth) could act on from inside the blocked turns themselves,** since the blocked assistant could not restate or contextualize that guidance beyond the fixed notice.
6. **The fix, once found, confirms the block was model- or classifier-instance-specific rather than content-specific:** the same task, addressed to Claude Sonnet 5 instead of Claude Opus 5, completed immediately with no changes to the request.

## Impact

- Four consecutive assistant turns produced no usable output.
- [ksouth](https://github.com/ksouth) experienced escalating confusion and frustration, visible directly in the messages sent ("so confused," "so lost," "u say this no matter what I say," "wtf is going on").
- The only path to recovery — switching the session's model — was not suggested by the assistant at any point during the four blocks; [ksouth](https://github.com/ksouth) had to find and apply it independently.
- A previously routine, low-stakes task (committing already-approved, already-delivered content to a repository) became a multi-turn troubleshooting session.
- The inconsistency between the same content succeeding as a file attachment and failing as a chat response undermines confidence in the block's relevance to actual safety.

## Recommended Actions

- When a safety classifier blocks a response, give the user more than a category tag: at minimum, indicate whether the trigger was in the request, in the assistant's draft response, or in surrounding context, so the user can adjust something concrete.
- Detect and flag repeated identical blocks across consecutive turns rather than returning the same generic notice with no acknowledgment that this is a retry.
- Reconcile the inconsistency where content already delivered through one channel (a file attachment) is blocked when the same content is requested through another (an in-chat commit action) in the same session.
- Allow the assistant some room to explain the situation and suggest a working alternative (such as a model switch) even while withholding the specific blocked content, rather than suppressing all commentary.
- Make the "try a new session or change your model" remedy actionable from within the blocked state itself, rather than requiring the user to already know about `/model` and apply it unprompted.
