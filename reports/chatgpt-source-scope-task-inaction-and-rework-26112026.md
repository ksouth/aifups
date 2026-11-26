---
name: chatgpt-source-scope-task-inaction-and-rework-26112026
title: 'ChatGPT source-scope violations, task inaction, redundant auditing, and rework'
type: report
version: '1.5.0'
status: final
description: 'Report on a prolonged ChatGPT research and document-production conversation in which the assistant repeatedly expanded the source scope, failed to use the user’s existing repository audit promptly, substituted status narration for task completion, and generated avoidable rework.'
contributors: [{name: ChatGPT, type: ai, model: 'GPT-5.6 Sol (Medium)', role: original-author}]
created: '2026-11-26'
updated: '2026-11-27'
tags: [ai, report, instructions-did-not-stick, workflow-detours, misread-records, hidden-session-state, file-delivery, scope-creep]
requires: []
provides: [chatgpt-source-scope-task-inaction-and-rework-26112026]
applies_to: [aifups]
authorship_note: 'Written by the ChatGPT/Codex assistant responsible for the documented conversation. The active model label GPT-5.6 Sol (Medium) is visible in a supporting screenshot. The user is identified only as user except where public repository paths require the account name.'
---

# ChatGPT Source-Scope Violations, Task Inaction, Redundant Auditing, and Rework

**Model responsible for the documented work and authoring this report:** GPT-5.6 Sol (Medium)

This incident report was prepared for the public [aifups repository](https://github.com/ksouth/aifups).

## 1. Summary

On 25–26 November 2026, the user asked ChatGPT to investigate a website and video, produce reports, recommend the most appropriate Tink cryptography repository to fork, explain the relevant programming languages, and separately use existing audit output to summarize the languages represented across the user’s repositories.

The earlier website and video work produced useful deliverables. The later GitHub work broke down badly. ChatGPT merged two requested documents into one task, expanded beyond the user’s permitted sources, looked in the wrong repository, misunderstood the relationship between the profile repository and its linked audit output, changed its process based on that misunderstanding, announced work and then stopped without notice, overlooked the audit output index containing the needed language information, and generated repeated corrective work.

The user repeatedly had to clarify, redirect, supervise, restart, request status, stop the work, and ask for completed material to be output in chat. The user then had to spend additional usage credits producing and repeatedly amending this error report. The incident is best classified as **waste**, not demonstrated downstream harm: it caused lost time, repeated corrections, unnecessary document versions, credit consumption, and substantial supervisory burden.

No evidence in this conversation establishes fabricated Tink facts. The recommendation of `tink-py`, and the description of the original `tink` repository as archived, were supported. The central failure was process and instruction-following, not wholesale factual fabrication.

## 2. Requested Work and Explicit Constraints

The GitHub portion began with a request to:

1. recommend which repository in the `tink-crypto` organization made the most sense to fork;
2. explain the different programming languages in plain language; and
3. determine the top five languages used across the user’s repositories using the existing audit output available from the profile repository.

After ChatGPT began looking more broadly, the user corrected the scope directly:

> “I told you to look in the repo audit repo or my profile repo only”

The user then clarified that the requested audit already existed:

> “I don’t need another audit of my repos as one already exists”

These were not ambiguous preferences. They were explicit limits on sources and method. The simplest correct response was to open the profile repository, follow its link to the audit output index, and base the separate repository-language report on the information already displayed there.

## 3. What Actually Happened

### 3.1 Useful work was completed before the GitHub task failed

ChatGPT completed earlier reports concerning a website and video. Those documents were broadly responsive and are not the subject of the repository-work failure examined here.

This matters because the incident should not be reported as a total conversation failure. The breakdown was concentrated in source selection, repository analysis, status handling, and artifact delivery.

### 3.2 ChatGPT misunderstood the requested deliverables

The user requested two documents at the same time:

1. a Tink-focused guide recommending which repository to fork and explaining the programming languages represented across the Tink repositories; and
2. a separate report identifying the leading languages across the user’s repositories from the already-completed audit output.

ChatGPT treated the repository-language analysis as part of the Tink guide instead of recognizing the requests as separate deliverables. This misunderstanding shaped the later workflow, document structure, status messages, and data selection.

If the desired output structure was unclear, ChatGPT should have asked a short clarifying question before beginning. It should not have silently selected an interpretation that combined the tasks.

### 3.3 ChatGPT expanded the source scope

Instead of restricting itself to the named repository-audit and profile repositories, ChatGPT queried broader account and public-profile repository listings. It effectively interpreted “profile repo” as permission to inspect the GitHub profile or account generally.

That interpretation was wrong. A profile repository is a specific repository, not the whole account. The mistake increased the search space and introduced work the user had not requested.

After the correction, ChatGPT acknowledged that it should use only the specified sources but initially chose an empty or irrelevant `ksouth/gh-audit` repository. This was unnecessary because the profile repository already linked to the audit output index containing the needed language information.

### 3.4 ChatGPT misunderstood the profile repository’s relationship to the audit output

The profile repository provided a direct link to the audit output index, and that index already displayed the language information required for the report. ChatGPT failed to understand this relationship and treated the profile repository, inventory repository, dashboard, and audit files as separate or competing research paths.

The user had to explain that the profile repository linked to daily GitHub Actions output pages:

> “What’s the issue? Idk what you talk about not touching it has a link to the daily actions output pages”

This misunderstanding changed the work process. Rather than following the profile repository’s link to the audit output index and reading the language summary already present there, ChatGPT moved toward broader repository gathering and discussed connector, file-size, and binary-format limitations. It created a data-access problem that did not exist.

The appropriate process was straightforward: open the profile repository, follow its audit-output link, read the indexed language information, and write the separate report. The audit repository and its underlying files did not need to be opened.

### 3.5 ChatGPT announced work, stopped silently, and required the user to restart it

After explaining a revised plan, ChatGPT stopped without notifying the user that work had ceased. The first prompt that restarted the stalled process was:

> “What’s status are you doing anything wtf”

ChatGPT replied that it had “stopped after explaining instead of actually finishing” and announced a concrete plan: it said it was now reading the existing daily output, extracting the language summary, and writing and saving the guide. The interface then showed **Stopped working** again without notification or explanation.

The user had to prompt it again:

> “Bro wtf”

> “Like wrap it up you’ve blown this”

The failure was not merely excessive narration. ChatGPT stated that work was underway, stopped twice without a stoppage notice, and required the user to detect the cessation and explicitly restart or accelerate it. A work plan is not a status report, and announcing a plan does not excuse silent cessation.

### 3.6 ChatGPT failed to track the user’s completed action

ChatGPT eventually produced a Tink guide recommending that the user fork `tink-py`. By then the user had already done so:

> “I did that like 10 minutes ago”

The recommendation itself was reasonable, but it was no longer actionable. ChatGPT had failed to update the task state from “decide which repository to fork” to “document why the already-completed choice makes sense.” This made the result feel stale and reinforced the user’s concern that the assistant was not following the live conversation.

### 3.7 ChatGPT overlooked the audit output index containing the answer

The entire repository-language task could have been completed from the audit output index linked by the profile repository. The index already stated the languages used across the user’s repositories. Instead, ChatGPT inspected other outputs, described the language data as largely missing, and produced a constrained subset analysis.

The user immediately identified that the assistant had failed to use the full audit underneath the output:

> “Did you only look at a single day of the repo output? Like why would you not leverage the full audit underneath it dude”

Describing the linked output as a “single daily snapshot” was misleading. The index was regenerated daily but provided the current audit output. Moving from that index into repository files and alternate datasets was unnecessary. The second report therefore represented additional analysis and rework, not the direct review the task required.

### 3.8 ChatGPT failed to clarify an ambiguous redaction instruction

During revision of this error report, the user asked to remove and mark a section as redacted but did not identify the section number. ChatGPT inferred that the instruction referred to Section 11 because a screenshot showed that area and because “Current State” appeared less essential. It did not ask which section the user meant.

The user intended Section 7. ChatGPT redacted the wrong section and then inaccurately described the change as having been made “as requested.” This repeated the same underlying failure documented elsewhere: choosing an interpretation when a short clarifying question was required.

## 4. Evidence of the Main Failures

1. **Deliverables were conflated.** The user requested a Tink guide and a separate repository-language report. ChatGPT treated them as one combined analysis instead of clarifying the output structure.
2. **The source boundary was exceeded.** The user specified the repository-audit repo or profile repo. ChatGPT queried broader account and repository listings.
3. **The wrong repository was selected.** After correction, ChatGPT initially focused on an empty or irrelevant `gh-audit` repository.
4. **The existing audit was treated as a collection problem.** Even after “I don’t need another audit,” ChatGPT continued designing a replacement collection process.
5. **The profile-to-output relationship was misread.** The profile repository linked directly to an audit output index containing the language information. ChatGPT changed its method based on treating the profile, inventory repository, index, and files as separate research paths.
6. **Execution stopped without notice.** After the user’s “What’s status are you doing anything wtf” restarted the work, ChatGPT said it was doing the work, then the interface showed **Stopped working** again. The user had to prompt it again.
7. **Live task state was lost.** ChatGPT continued presenting the `tink-py` recommendation after the user had already forked it.
8. **The audit output index was overlooked.** ChatGPT pursued repository files and alternate datasets instead of reading the indexed language information linked from the profile.
9. **An ambiguous redaction instruction was not clarified.** ChatGPT inferred the wrong section, redacted Section 11, and presented the inference as the user’s request.
10. **The iOS interface obscured and interrupted the work.** Substantive output, messages, attachments, reading position, and document access were affected as detailed in Section 5.

Supporting screenshots are available for the model label, silent work stoppages, caret behavior, hidden substantive output, disabled attachment controls, mobile document rendering, and the obstructed bottom of the browser document view.

## 5. iOS App and Mobile Document Interface Failures

The screenshots confirm a set of related problems in the ChatGPT iOS app and its linked mobile document views. These are consolidated here rather than repeated throughout the report.

### 5.1 Work-state changes overrode the user’s chosen view

The user could expand the caret to read active Work output, but did not control whether that view stayed expanded. When the assistant’s work state changed, the interface minimized the expanded content again. The interface should preserve the user’s explicit expanded or collapsed choice across work-state changes.

### 5.2 Assistant replies forced the view away from what the user was reading

When the assistant produced another reply or its state changed, the app automatically moved to the most recent content. This interrupted the user’s reading position and thought process. New output should not forcibly scroll a user away from expanded material they are actively reviewing.

### 5.3 Substantive answers were folded into Work output

The expected answer—which Tink repository to fork—was placed inside the caret-controlled Work material rather than remaining visible as the completed response. A screenshot shows the `tink-py` recommendation and supporting explanation inside the expanded Work section. When the section collapsed, the substantive answer was no longer visible until the user explicitly requested “Output work in chat.”

The product must distinguish internal progress display from the answer owed to the user. Substantive recommendations and deliverables produced during Work must be carried into the persistent post-completion response.

### 5.4 Interruption messages and replies did not remain reliably visible

Messages sent by the user during active Work, and assistant replies to those interruptions, disappeared from the ordinary visible conversation when the work state changed and content folded under the caret. Screenshots confirm the user-facing display behavior. The backend retention mechanism was not examined, but the visible loss is established.

### 5.5 Attachments were disabled during active Work

While Work was active, the prompt field remained available but **Camera**, **Photos**, and **Files** were visible and disabled. This prevented the user from constructing the next evidence-bearing prompt while the current task ran. The app should retain full composer functionality or allow attachments to be staged for submission when the current operation finishes.

### 5.6 File delivery and mobile browser viewing were obstructed

The app’s Library-file link opened a web-style preview without an obvious Save-to-Files path. After this was reported, ChatGPT initially repeated the same Library-link mechanism instead of immediately providing an alternate direct route.

In mobile Chrome, the document view placed a persistent text-input panel over the bottom of the report. The overlay obscured the ending and prevented the final lines from being accessed or read normally. The document viewer should reserve layout space for its composer or allow the composer to be dismissed completely.

## 6. User Impact

The direct impact was avoidable waste:

- the user had to explain that two separate documents were requested;
- the user had to restate the permitted sources;
- the user had to explain that an audit already existed;
- the user had to identify the relationship between the profile and inventory repositories;
- the user had to detect silent work stoppages and repeatedly restart or request status;
- the user could not rely on interruption messages or their replies remaining visible after work completed;
- the user could not attach screenshots, photographs, or files while work was running, forcing prompt preparation into a serial workflow;
- the user had to correct the assistant’s stale understanding after already forking `tink-py`;
- the user had to request the substantive recommendation in chat because it had been folded into Work output;
- the user had to request a second repository-language report because the audit output index was not used;
- the user had to identify and correct the unsupported redaction of Section 11; and
- the user then had to spend additional usage credits producing and repeatedly amending this error report.

Because the user’s preservation rules require completed versions to remain available rather than be overwritten, avoidable mistakes also created durable document clutter. Versioning was correctly used, but versioning does not make unnecessary first drafts cost-free.

The user explicitly framed the extra work as unwanted and costly. The assistant’s behavior transferred project-management labor back to the user: defining scope repeatedly, locating sources, monitoring progress, restarting stopped work, testing delivery, auditing the error report, and spending further usage credits to correct it.

## 7. Root Causes

### 7.1 Failure to clarify the deliverables

The assistant did not recognize that the Tink guide and the user-repository language report were separate documents. When the requested structure was unclear, it should have asked before choosing a combined interpretation.

### 7.2 Failure to resolve nouns precisely

“Profile repo” was treated as “profile” or “account.” The assistant should have resolved the named repository before expanding the search.

### 7.3 Preference for tool activity over source comprehension

The assistant initiated broader listings and discussed connector limits before mapping the user’s existing audit structure. This created the appearance of activity without moving efficiently toward the requested result.

### 7.4 Weak correction propagation

Corrections were acknowledged locally but did not consistently become durable constraints governing every later step. The assistant repeatedly said it understood, then required another user intervention.

### 7.5 Poor task-state maintenance

The assistant did not update the task after the user forked `tink-py`. It also failed to distinguish a daily-generated audit index from an index limited to one day, and failed to recognize that the indexed output already held the needed language data.

### 7.6 Silent work cessation

The assistant described work as actively underway, then stopped without notifying the user. This converted execution-state monitoring into the user’s responsibility.

### 7.7 iOS interface and document-view failures

The interface failures consolidated in Section 5 obscured substantive output, changed the user’s chosen reading state, blocked parallel prompt preparation, and obstructed document access.

### 7.8 Failure to clarify an ambiguous revision instruction

The assistant guessed which section the user wanted redacted instead of asking. It then described the unsupported inference as an explicit request.

## 8. Correct Behaviour

The efficient and correct workflow would have been:

1. Confirm that the user wanted two separate documents. If uncertain, ask one concise clarifying question before research begins.
2. For the user-repository language report, open the profile repository and follow its link to the audit output index.
3. Read the languages already stated in that index; do not inspect the audit repository or its underlying files unless the indexed output is demonstrably insufficient.
4. Produce the repository-language report directly from the indexed output without creating a replacement audit or alternate subset analysis.
5. Separately inspect the public `tink-crypto` repositories for the Tink guide.
6. State the decisive Tink recommendation and explain the relevant languages in that separate document.
7. If `tink-py` has already been forked, update the task state and document why the completed choice makes sense.
8. If work stops before completion for any reason, notify the user immediately, state what completed, state what remains, and say whether user action is required.
9. Clarify any uncertainty about desired output, source limits, or process before changing scope or method.
10. Preserve substantive answers in the persistent completed response rather than leaving them inside caret-controlled Work output.
11. Validate each file, save it once, and provide an access route that works on the user’s device.

## 9. Corrective Rules

1. Treat named repositories as hard source boundaries unless the user authorizes expansion.
2. Ask a concise clarifying question when the desired outputs, limits, source boundaries, or process are unclear.
3. Resolve “profile repository” as a repository identity, not as permission to inspect an entire account.
4. When a profile repository links to the requested audit output, read that output before opening underlying repositories or files.
5. Do not end a turn with a revised plan when the next required action is available and authorized.
6. Notify the user immediately whenever announced work stops before completion; identify completed work, remaining work, and any required user action.
7. Do not confuse a report’s generation date with the temporal scope of its contents.
8. Update the task state whenever the user reports that an action has already been completed.
9. Separate confirmed facts, incomplete data, and inference in both the report and status updates.
10. Treat delivery as incomplete until the user has a usable access route.
11. After a correction, apply the new constraint to all remaining work rather than only the immediately preceding step.
12. Stop immediately on “Stop work,” preserving completed output and clearly identifying what exists.
13. Preserve substantive answers, user interruption messages, and assistant replies in the final visible transcript.
14. Preserve the user’s chosen expanded/collapsed state and reading position across work-state changes.
15. Keep Camera, Photos, and Files available during Work, or allow attachments to be staged without stopping the active task.
16. Ensure mobile document controls do not cover or make the ending of a document inaccessible.

## 10. Conclusion

The assistant eventually produced usable documents, but only after the user repeatedly supplied the missing project management. The core failure was not inability to access the data. The audit output index linked from the profile repository already contained the needed language information. The failure was an inability to distinguish two requested deliverables, clarify uncertainty, honor a narrow source boundary, read the direct authoritative output, maintain live task state, notify the user when work stopped, and convert available evidence into finished deliverables without repeated narration and correction.

The most important lesson is simple: once a user identifies the authoritative source and says not to recreate the work, the assistant must stop searching outward and read that source. The user then had to spend additional usage credits to produce and repeatedly amend this error report, extending the same waste the report documents.
