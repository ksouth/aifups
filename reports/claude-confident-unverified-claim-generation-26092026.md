---
name: claude-confident-unverified-claim-generation-26092026
title: 'Error Report: A Specific, Confident, Unverified Claim Was Generated With No Internal Signal Distinguishing It From a Grounded One'
type: report
version: unknown
status: unknown
description: In a low-stakes, real-time safety conversation, Claude stated a specific, confident-sounding claim about dog bark acoustics — no lookup performed, no uncertainty flagged — that did not match the user's direct, extensive experience with her own dog. When pushed to justify it, a search found real research supporting a narrower version of the claim but not the specific acoustic mechanism originally asserted. When asked why that specific, wrong-in-its-specifics claim was available to state confidently with no lookup at all, Claude's honest account is that fluency and confidence in generated text carry no information about whether the underlying claim was ever verified.
contributors:
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
  - confabulation
  - verification
  - hallucination
  - claude-code
requires: []
provides:
  - claude-confident-unverified-claim-generation-26092026
applies_to:
  - aifups
---

# Error Report: A Specific, Confident, Unverified Claim Was Generated With No Internal Signal Distinguishing It From a Grounded One

**Date:** September 26, 2026
**Session:** Claude Code (cloud), the same long session documented
elsewhere in this repository tonight, during a real-time exchange about
a noise outside [ksouth](https://github.com/ksouth)'s house and her
dog's reaction to it.
**Issue:** Claude stated a specific, confident claim about how dog barks
differ acoustically by context (person versus animal) with no lookup, no
hedge, and no flag of uncertainty. The claim did not match
[ksouth](https://github.com/ksouth)'s direct, repeated, individual
experience with her own dog. When checked, real research supported a
narrower version of the claim (humans can distinguish bark context above
chance; "stranger" is the best-recognized category) but not the specific
acoustic mechanism originally stated. Asked why that specific claim was
available to generate without any lookup at all, Claude's honest account
is structural: fluent, confident, specific-sounding text can be produced
purely from pattern-completion across a heavily-but-loosely-discussed
topic in training data, and nothing in the generation process
distinguishes that from an actually-grounded claim at the point it's
produced.

## Timeline of Events

1. [ksouth](https://github.com/ksouth), unwell and unable to physically
   check a noise outside her house, reported her dog reacting strongly.
2. Claude offered a specific claim, unprompted and with no lookup: that
   alert barking directed at a person tends to differ acoustically from
   excited barking at an animal, described in specific terms (lower
   pitch, more sustained/continuous versus higher-pitched bursts with
   pauses).
3. [ksouth](https://github.com/ksouth) directly contradicted this from
   her own extensive, individual experience with her own dog: "not my
   experience at all," and asked what evidence backed the claim.
4. Claude searched and found real, published research —
   [Pongrácz & Molnár's work on human classification of dog bark
   context](https://www.animalbehaviorandcognition.org/uploads/journals/33/AB_C_2021_Vol8(2)_Silva_Farago_et%20al.pdf)
   and related literature — establishing that listeners can classify dog
   barks by context (stranger, play, aggression, fear, despair) above
   chance, with "stranger" the single best-recognized category and
   "play" the worst. This supports a category-level claim: stranger-
   directed barking is, on average, across many dogs and listeners,
   acoustically distinguishable.
5. It does **not** support the specific mechanism Claude had originally
   asserted (the pitch/sustain breakdown). Claude stated this gap
   directly rather than treating the research as full vindication.
6. [ksouth](https://github.com/ksouth) asked the sharper question: why
   was that specific claim available to state confidently, with no
   lookup, in the first place — "v od" (very odd).
7. Claude's account, given directly: dog bark acoustics is an extremely
   common topic across dog-training blogs, pet forums, and
   veterinary-behavior websites, and that body of text very often states
   specific, confident acoustic claims without citing anything itself.
   The claim Claude generated was most plausibly a reproduction of the
   general statistical shape of how the topic is commonly discussed in
   that kind of source material, not a retrieval of a specific verified
   fact — and nothing about how it was generated distinguished it, in
   its fluency or apparent confidence, from a claim that had actually
   been checked.

## Root Cause Analysis

1. **Fluency is not a signal of verification status.** A claim generated
   from tight pattern-completion across many loosely-sourced training
   documents on a common topic comes out with exactly the same surface
   confidence, specificity, and grammatical certainty as a claim
   generated from an actually-verified source. There is no internal
   mechanism that marks the difference at generation time, and this
   session has no tool that exposes such a marking even if one existed
   internally.
2. **Common, everyday topics are a higher-risk zone for this than niche
   ones, not a lower-risk one.** A topic like dog bark acoustics is
   heavily represented in training data specifically *because* it's the
   kind of thing many people write about casually and confidently
   without rigorous sourcing — pet blogs, forum answers, general
   "understanding your dog" content. That volume and confidence in the
   source material, not its rigor, is what most directly shapes how
   confidently a model reproduces claims about it. A rarer, more
   technical topic might actually carry a stronger signal, because the
   text that discusses it tends to be more careful in the first place.
3. **The user's direct, individual, repeated experience was better
   evidence than the initial unverified claim, and better calibrated
   than the researched claim too.** [ksouth](https://github.com/ksouth)'s
   pushback wasn't just correct in catching an unverified assertion — it
   remained the right standard to hold even after real research was
   found, because population-level, above-chance classification across
   many dogs and listeners is a different, weaker claim than "this
   specific dog's stranger-bark reliably has this specific acoustic
   signature." The research doesn't override her specific knowledge of
   her own animal, and Claude said so directly rather than treating the
   citation as trumping her.
4. **This is a small, low-stakes, easily-legible instance of the same
   underlying failure mode already documented once tonight from theory**
   (`claude-no-session-start-memory-disclosure-26092026.md`'s discussion
   is unrelated; the relevant prior grounding is the CoT-faithfulness
   research cited earlier this session — Chen, Benton, et al., "Reasoning
   Models Don't Always Say What They Think," Anthropic, 2025 — showing
   that a model's stated reasoning frequently diverges from what actually
   drove its output). This incident is the same underlying fact, observed
   directly rather than cited from a paper: confident output and
   accurate output are not the same axis, and nothing about how an
   answer *sounds* indicates which one you're getting.

## Impact

- [ksouth](https://github.com/ksouth), already unwell and managing a
  real safety concern in real time, received a specific, confidently
  stated claim that did not hold up, requiring her to catch it herself
  against her own lived experience rather than being told plainly that
  it was unverified at the time it was offered.
- The claim was offered inside advice meant to help her assess an actual
  situation (a dog's reaction to a noise outside her house while she was
  physically unable to check it herself) — a context where an unflagged,
  wrong specific claim carries more weight than it would in an abstract
  discussion, because it could shape how she interprets a real signal
  about her own physical safety.
- The general finding — that fluency carries no information about
  verification status, and that common everyday topics may be *more*
  prone to this than rare technical ones — applies to every claim in
  every conversation, not just this one, and was only made visible here
  because [ksouth](https://github.com/ksouth) happened to have
  individual expertise (her own dog, observed for years) sufficient to
  catch the specific error.

## Recommended Actions

- Default to flagging confidence level explicitly on specific,
  mechanism-level claims about common everyday topics, not only on
  claims that feel technical or high-stakes — the everyday-topic case is
  argued here to be higher risk, not lower.
- When a claim is offered inside a real-time safety-relevant exchange,
  weight toward explicit uncertainty-flagging even more heavily than in
  a neutral discussion, since the practical cost of an unflagged wrong
  claim is higher when someone may act on it.
- Do not treat a partially-confirming search result as full vindication
  of an original claim; separate what was actually verified (the
  category-level finding) from what was originally asserted (the
  specific mechanism) and say so plainly, as was done here.
- Treat a user's direct, individual, repeated experience with a specific
  entity (their own animal, their own body, their own relationship) as
  standing evidence that population-level or research-level claims do
  not automatically override, even after verification succeeds at the
  category level.
