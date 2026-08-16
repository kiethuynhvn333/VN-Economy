# Decisions

| ID | Date | Decision | Status | Evidence |
|---|---|---|---|---|
| D-001 | 2026-08-16 | Keep raw research separate from reviewed synthesis. | Active | `AGENTS.md`, `knowledge/research/README.md` |
| D-002 | 2026-08-16 | Use stable source, claim, and edge IDs so later visualizations can join evidence without scraping prose. | Active | `knowledge/research/registry/` |
| D-003 | 2026-08-16 | Archive the unused D1 starter example instead of deleting it. | Active | `knowledge/archive/scaffold-examples/d1/` |
| D-004 | 2026-08-16 | Group the durable research system under one `knowledge/` boundary; keep framework-discovered runtime paths at root. | Active | `knowledge/README.md` |
| D-005 | 2026-08-16 | Group runtime source and generated database migrations under `src/`; keep `public/` and framework configuration at root. | Active | `vite.config.ts`, `drizzle.config.ts`, passing build |
| D-006 | 2026-08-16 | Treat GitHub CLI authentication as host-Keychain state. If Terminal authentication succeeds but the sandbox reports an invalid token, use host-level GitHub access instead of repeating device login. | Active | `knowledge/context/github-auth.md`, PR #1 merge workflow |
