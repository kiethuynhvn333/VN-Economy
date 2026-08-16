---
name: weekly-research-review
description: Review new research imports, extract evidence-backed claims, reconcile contradictions, and propose approval-gated updates to the VN-Economy knowledge base.
---

# Weekly research review

1. Read `AGENTS.md`, `knowledge/context/INDEX.md`, `knowledge/context/knowledge-maintenance.md`, and the latest
   completed row in `knowledge/sessions/review-log.md`.
2. Inventory new files under `knowledge/evidence/raw/` and candidates under `knowledge/sessions/inbox.md`.
3. For each important claim, record the exact source, date, definition, unit, time period, and
   whether it is data, inference, hypothesis, or recommendation.
4. Check the underlying source rather than trusting a generated summary or citation label.
5. Compare the claim with `knowledge/context/contradictions.md` and existing reviewed claims.
6. Classify each candidate as Promote, Supersede, Deduplicate, Defer, or Drop.
7. Produce a concise proposal with exact file changes. Stop for user approval.
8. After approval, update one canonical claim owner, the registries, contradictions, inbox status,
   and review log. Add relationships only with source/claim IDs.
9. Run `sh knowledge/tools/validate-research.sh` and `sh tests/research/test-structure.sh`.

The review is the self-evolving loop: new evidence creates candidates; review turns only supported
candidates into durable knowledge; contradictions and validation rules improve the next review.
