# Context Index

**Owner:** Kiet Huynh
**Last reviewed:** 2026-08-16
**Authority:** routing control plane; it points to reviewed knowledge but does not duplicate it.

## Default read set

`AGENTS.md` -> this file -> `decisions.md` -> `open-items.md` -> newest `knowledge/sessions/current.md` entry.

## Current snapshot

- The product is an interactive map of Vietnamese national capabilities, constraints, and possible
  long-run industry clusters.
- Research is incomplete. The current repository has one imported generated report (`SRC-001`).
- The key analytical distinction is GDP growth vs export growth vs accumulated national capability.
- No imported claim is canonical until its sources, definitions, dates, and contradictions are checked.

## Task router

| Task | Read after defaults |
|---|---|
| Add a source | `knowledge/research/README.md`, `knowledge/references/SOURCES.md`, `knowledge/research/registry/sources.tsv` |
| Extract findings | `knowledge/research/claims/README.md`, relevant `knowledge/research/themes/` file, source evidence |
| Compare themes | `knowledge/research/relationships/README.md`, `knowledge/research/registry/claims.tsv`, `edges.tsv` |
| Resolve disagreement | `knowledge/context/contradictions.md`, source files, `knowledge/sessions/inbox.md` |
| Prepare a map/report | reviewed `knowledge/context/`, relevant themes, `knowledge/deliverables/README.md` |
| Maintain knowledge | `knowledge/context/knowledge-maintenance.md`, inbox, contradictions, review log |

## Canonical ownership

| Knowledge | Owner |
|---|---|
| Product purpose and scope | `project-brief.md` |
| Approved decisions | `decisions.md` |
| Unresolved work | `open-items.md` |
| Conflicts and uncertainty | `contradictions.md` |
| Research taxonomy | `knowledge/research/themes/README.md` |
| Source provenance | `knowledge/references/SOURCES.md` and `knowledge/research/registry/sources.tsv` |
| Reviewed claims | `knowledge/research/registry/claims.tsv` plus the owning theme file |

Do not load all evidence by default. Start with the routed source and theme, then expand only when
the claim or contradiction requires it.
