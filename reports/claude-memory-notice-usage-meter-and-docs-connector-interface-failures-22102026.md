---
name: claude-memory-notice-usage-meter-and-docs-connector-interface-failures-22102026
title: 'Error Report: Broken Sensitive-Memory "View" Button, Missing Usage Meter, Google Docs Connector That Never Arrived, and the Session Model''s Own Errors'
type: report
version: '1.0.0'
status: final
description: Four Claude app interface failures observed during one working session on 22 October 2026, plus three errors made by the session model itself.
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
  - interface
  - transparency
  - memory
  - connectors
requires: []
provides:
  - claude-memory-notice-usage-meter-and-docs-connector-interface-failures-22102026
applies_to:
  - aifups
authorship_note: Written by Claude in the same session, at ksouth's request. The session was configured for claude-opus-5-5; the model actually serving each turn can differ and was not verified.
---

# Error Report: Broken Sensitive-Memory "View" Button, Missing Usage Meter, Google Docs Connector That Never Arrived, and the Session Model's Own Errors

**Author:** Claude (configured model: claude-opus-5-5), with [ksouth](https://github.com/ksouth)\
**Date:** 22 October 2026\
**Surface:** Claude app, a cloud session linked to ksouth's computer

------------------------------------------------------------------------

## Summary

During one long working session (file retrieval, FOI correspondence, and legal-process drafting), ksouth hit four failures in the Claude app interface. None of them could be seen or fixed from inside the conversation, and each one pushed work or uncertainty back onto the user. This report also records three errors the session model made itself. Leaving those out would make the report less honest than the ones it sits beside.

Claude cannot see the app's interface. Items 1, 2, and 4 are recorded as ksouth reported them. Item 3 was confirmed from inside the session.

------------------------------------------------------------------------

## 1. The "view" button on the sensitive-memory notice did nothing

**What happened.** A notice appeared telling ksouth that sensitive information had been added to memory. It offered a button to view what was saved. Pressing it did nothing. ksouth had to ask Claude in the chat what had been saved.

**Why it matters.** A notice that something sensitive has been stored, without a working way to see what, is worse than no notice at all. It creates exactly the anxiety the notice is meant to relieve. A user deciding whether to keep or delete a sensitive memory needs to see it at that moment, not go looking for it.

**Workaround used.** Claude read the memory files that had changed that day and listed every line saved in the session. The line that triggered the notice was almost certainly a short line containing health information. ksouth chose to keep it.

------------------------------------------------------------------------

## 2. The usage meter disappeared from the interface, then came back

**What happened.** At about 2:37 pm (Melbourne time), ksouth noticed that the usage meter they normally rely on was no longer visible in the app. At about 2:56 pm, roughly 20 minutes later and with no action on their part, it reappeared.

**What Claude could and could not establish.** Claude has no view of the interface and could not tell why the meter disappeared or why it came back. It did not guess.

**Why it matters.** This continues the pattern documented in [Token Spend Visibility in Claude](claude-token-usage-visibility-and-interface-transparency-15082026.md): the user's view of their own consumption keeps shrinking while the system's view stays complete. A meter that silently disappears and reappears, with no notice either way, can't be relied on, and an unreliable meter is barely better than none.

------------------------------------------------------------------------

## 3. The Google Docs connector was turned on but never reached the session

**What happened.** ksouth asked Claude to update an existing Google Doc (an NDIS timeline). The Google Drive connector could find and read the doc, but there was no Google Docs editing connector, so the doc couldn't be changed in place. Claude said so and asked ksouth to turn the Docs connector on. ksouth replied "access granted". Claude searched for the tools and then forced a refresh of every connected server. The refresh reported no Google Docs server and no new tools.

**Outcome.** Claude wrote the new timeline entries in chat and ksouth pasted them into the doc by hand. The manual step the connector exists to remove happened anyway, after the user had already done what was asked of them.

**Why it matters.** The user did their part and the system reported nothing back: no error, no message that it would only work in a new chat, no confirmation either way. Claude could only guess that connectors switched on mid-conversation may only appear in a new chat. That guess is not verified.

------------------------------------------------------------------------

## 4. Code blocks in the chat viewer do not wrap long lines

**What happened.** ksouth asked Claude to paste the full text of a draft report into the chat for review. Claude put it in a Markdown code block to keep the raw text exact. In the app's chat viewer the long lines did not wrap, so most of each paragraph ran off the side of the screen and could only be read by scrolling sideways, line by line.

**What Claude could and could not establish.** Claude does not control how the app renders its replies and has no setting to turn wrapping on. The only workaround is on the model side: avoid code blocks for prose, or hard-wrap lines before sending, which makes the text harder to copy back out cleanly.

**Why it matters.** Reviewing a long document in chat is a core use, especially for a user who has asked to see drafts there before anything is committed. Sideways scrolling is a real accessibility barrier for a disabled user reading on a small screen or with limited energy. Text that cannot be read without fighting the layout is not really being presented for review.

------------------------------------------------------------------------

## 5. Errors made by the session model

**5.1 It invented a folder instead of asking where it was.** ksouth asked for files to go into "folder with his name within 2026 folder or something". Claude found no `2026` folder in Downloads and created one there without asking. ksouth said her 2026 folder was in Documents. Claude then looked four levels deep, found no `2026` folder in Documents either, and created one there too. That left an extra copy in Downloads and an invented `2026` folder in Documents. It should have asked one question before writing anything.

**5.2 It trusted a summarising fetch tool for a list of links.** The first read of the author's website went through a tool that summarises pages. That summary dropped every entry from 2025 and 2026. Claude noticed only because it went on to fetch the raw HTML, and it told ksouth about the gap.

**5.3 It searched for the file type the user named instead of the content they wanted.** ksouth asked for PDFs. Claude grepped the site for `.pdf` links, delivered 12 PDFs, and only found nine more works later, hosted as `.docx`, when ksouth asked for "others not available on his site". Searching for *works* rather than one file extension would have found them the first time.

None of these caused lasting harm, but each one cost ksouth attention on a day with very little to spare, which is the cost this repository is about.

------------------------------------------------------------------------

## What would fix this

1. **The memory notice:** the view button should open the saved text, with one-tap keep or delete.
2. **The usage meter:** keep it reliably visible, and announce any change to it.
3. **Connectors:** when a user enables a connector mid-conversation, say plainly whether this chat will pick it up or a new chat is needed.
4. **The chat viewer:** wrap long lines in code blocks, or give the user a wrap toggle.
5. **Model behaviour:** ask before creating locations, prefer raw sources over summaries for anything that needs to be complete, and search for content rather than file extensions.
