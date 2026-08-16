#!/usr/bin/env sh
set -eu

test -f src/app/page.tsx
test -f src/db/schema.ts
test -d src/db/migrations
test -f src/worker/index.ts
test -d knowledge/context
test -d knowledge/evidence/raw
test -d knowledge/research/registry
test -d knowledge/references
test -d knowledge/sessions
test -d knowledge/tools
test -f knowledge/archive/scaffold-examples/d1/db/schema.ts
test ! -e examples/d1
grep -q 'SRC-001' knowledge/references/SOURCES.md
grep -q 'raw / unverified' knowledge/references/SOURCES.md

echo "Research structure tests passed."
