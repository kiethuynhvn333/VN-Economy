# Knowledge maintenance

## Memory states

1. Working: newest `knowledge/sessions/current.md` entry.
2. Candidate: structured item in `knowledge/sessions/inbox.md`; not a fact.
3. Reviewed: claim with source evidence, status, and a canonical owner.
4. Historical: immutable raw source or archived session.

## Promotion gate

Promote a claim only when the source is reachable, the definition and time period are clear, the
claim is separated from inference, contradictions are recorded, and the reviewer accepts the
destination. Strategic recommendations require explicit user approval.

## Review actions

- Promote: add one reviewed claim owner and its evidence links.
- Supersede: replace a reviewed claim while preserving the old record and reason.
- Deduplicate: keep one owner and link all duplicates to it.
- Defer: keep the candidate when evidence or approval is missing.
- Drop: record why the candidate is not reusable.

The weekly review proposes exact file changes first. It does not modify canonical knowledge by
itself.
