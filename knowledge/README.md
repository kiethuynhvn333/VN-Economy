# Knowledge layer

This directory is the single entry point for the durable research system. It is intentionally
separate from the runtime application folders at the repository root.

```text
knowledge/
├── context/       reviewed project knowledge and routing
├── research/      themes, claims, questions, relationships, and registries
├── evidence/      original source files
├── references/    human-readable source register
├── sessions/      working notes and review candidates
├── deliverables/  reports and visualizations
├── tools/         intake and validation scripts
└── archive/       retired or superseded material
```

The root keeps `src/`, `public/`, and framework configuration visible because
Vinext and Cloudflare discover those paths directly. Moving them would reduce Finder clutter but
would add framework coupling and make the build less reliable.
