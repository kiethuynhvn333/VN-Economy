# Research system

## Lifecycle

1. **Ingest** the original file into `knowledge/evidence/raw/` and assign a stable `SRC-###` ID.
2. **Register** provenance, date, type, quality, and status in `knowledge/references/SOURCES.md` and
   `knowledge/research/registry/sources.tsv`.
3. **Extract** atomic claims into `knowledge/research/registry/claims.tsv`. Keep the source wording and a
   short normalized claim separate.
4. **Check** each important claim against the underlying URL or primary dataset. Mark whether it is
   data, inference, hypothesis, or recommendation.
5. **Group** reviewed claims under one or more themes in `knowledge/research/themes/`.
6. **Connect** claims with explicit, sourced edges in `knowledge/research/registry/edges.tsv`.
7. **Review** promotion, contradiction, and deduplication in the weekly research review.
8. **Publish** only reviewed claims into reports or the interactive map.

## Status vocabulary

`raw`, `needs-source-check`, `source-checked`, `reviewed`, `promoted`, `superseded`, `archived`.

## What the future pattern layer will do

The relationship registry will let us query which capabilities recur across sources, which claims
are supported by independent evidence, where sources disagree, and which proposed clusters depend
on the same bottleneck. A visualization should show those relationships and their confidence—not
pretend that repeated wording is statistical correlation.
