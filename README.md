# Việt Nam 2026–2076 — national capacity research system

This repository has two separate lanes:

- `src/` contains the interactive map source (`app/`, `db/`, and `worker/`); `public/` contains static assets.
- `knowledge/` contains the grouped research record that supports the map.

The project is still in the research phase. The goal is not to force a final strategy early. The
goal is to collect sources, expose weak evidence, compare mechanisms across sectors, and only then
promote durable findings into the map.

## Research operating model

```text
raw source -> extracted claim -> source check -> theme synthesis -> reviewed relationship -> map
```

`knowledge/evidence/raw/` preserves imported files. `knowledge/research/registry/` is the machine-readable index for
future pattern analysis. `knowledge/research/themes/` holds the thematic taxonomy. `knowledge/context/` holds reviewed
project knowledge and routing rules. `knowledge/sessions/` holds working notes and review candidates.

The first imported source is `SRC-001`, a prompt plus generated parallel-research report. It is
stored for discovery and comparison only; its claims have not been independently verified.

## Structure

| Area | Role |
|---|---|
| `knowledge/context/` | Reviewed project brief, decisions, open items, contradictions, and maintenance rules |
| `knowledge/research/themes/` | Stable research themes used to group sources and claims |
| `knowledge/research/claims/` | Claim extraction and review guidance; one canonical owner per promoted claim |
| `knowledge/research/questions/` | Open questions and evidence gaps |
| `knowledge/research/relationships/` | Future source-to-claim-to-theme relationship model for visualization |
| `knowledge/research/registry/` | Structured TSV registries for sources, claims, and relationships |
| `knowledge/evidence/raw/` | Original imports, preserved unchanged |
| `knowledge/references/` | Human-readable source map and citation notes |
| `knowledge/sessions/` | Current work, candidate learnings, and review log |
| `knowledge/deliverables/` | Future reports and visualizations; never canonical truth |
| `knowledge/tools/` | Intake and validation scripts |
| `knowledge/archive/` | Retired scaffold material and future superseded artifacts |

## Runtime checks

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
sh knowledge/tools/validate-research.sh
sh tests/research/test-structure.sh
```

The unused starter D1 example is preserved at `knowledge/archive/scaffold-examples/d1/` so it does not
compete with the active application surface.
