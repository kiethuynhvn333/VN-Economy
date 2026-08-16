# Relationship model

The future map should join four objects:

```text
source -> claim -> theme/capability -> relationship -> outcome or constraint
```

Use `knowledge/research/registry/edges.tsv` for relationships. A relationship must include its type
(`enables`, `constrains`, `depends_on`, `supports`, `contradicts`, or `measures`), source/claim IDs,
confidence, and review status. Store a relationship only when the evidence or reasoning is explicit.

Repeated co-occurrence is not proof of causation. When an edge is inferred, label it as inference and
keep the supporting claims visible.
