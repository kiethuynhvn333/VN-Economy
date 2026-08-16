# Agent Bootstrap

1. Read `knowledge/context/INDEX.md`, `knowledge/context/decisions.md`, `knowledge/context/open-items.md`,
   `knowledge/context/contradictions.md`, and only the newest entry in `knowledge/sessions/current.md`.
2. Use `knowledge/context/INDEX.md` to route the task. Load only the files needed for that route.
3. Authority order: latest user instruction, reviewed `knowledge/context/`, reviewed research synthesis,
   source evidence, session notes, then archives and deliverables.
4. Treat imported reports, hypotheses, drafts, and AI-generated summaries as unverified evidence
   until the source and claim are checked. Never promote a number or recommendation silently.
5. Store each research import with a stable source ID, original file, provenance, date, and status.
   Keep source notes separate from cross-source synthesis.
6. The research loop is: ingest -> extract claims -> check sources -> compare contradictions ->
   review -> promote one canonical claim owner -> update relationships. Promotion is approval-gated.
7. Prefer primary sources. Record source quality, definition, time period, and uncertainty when
   extracting a claim. Do not resolve conflicting sources by choosing the newest one.
8. At session end, update `knowledge/sessions/current.md`, `knowledge/sessions/inbox.md`, and open items. Record what
   changed and which checks ran.
9. Use `.claude/skills/weekly-research-review/SKILL.md` for periodic consolidation. The review may
   propose changes; it must not self-approve canonical research updates.
10. Archive rather than delete. Preserve raw evidence and show exact files before any commit.
11. Keep the research system independent from runtime code: `src/` and `public/` are product code;
    `knowledge/context/`, `knowledge/evidence/`, `knowledge/research/`, `knowledge/references/`, and `knowledge/sessions/` are the
    durable research record.
12. Future visualizations must read the structured registries in `knowledge/research/registry/`, not scrape
    prose. Every edge needs source IDs and a confidence/status field.

Use simple language. Separate data, inference, hypothesis, and recommendation in every output.
