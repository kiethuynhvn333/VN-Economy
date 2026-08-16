#!/usr/bin/env sh
set -eu

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
cd "$ROOT"

required_files="
AGENTS.md
CLAUDE.md
knowledge/context/INDEX.md
knowledge/context/decisions.md
knowledge/context/open-items.md
knowledge/context/contradictions.md
knowledge/context/knowledge-maintenance.md
knowledge/sessions/current.md
knowledge/sessions/inbox.md
knowledge/sessions/review-log.md
knowledge/references/SOURCES.md
knowledge/research/registry/sources.tsv
knowledge/research/registry/claims.tsv
knowledge/research/registry/edges.tsv
.claude/skills/weekly-research-review/SKILL.md
"

for file in $required_files; do
  test -f "$file" || { echo "Missing required file: $file"; exit 1; }
done

awk -F '\t' 'NR == 1 && $1 != "source_id" { exit 1 } NR > 1 && $1 !~ /^SRC-[0-9][0-9][0-9]$/ { exit 1 }' knowledge/research/registry/sources.tsv
awk -F '\t' 'NR == 1 && $1 != "claim_id" { exit 1 } NR > 1 && $1 !~ /^CLM-[0-9][0-9][0-9]$/ { exit 1 }' knowledge/research/registry/claims.tsv
awk -F '\t' 'NR == 1 && $1 != "edge_id" { exit 1 } NR > 1 && $1 !~ /^EDGE-[0-9][0-9][0-9]$/ { exit 1 }' knowledge/research/registry/edges.tsv

grep -q 'SRC-001' knowledge/research/registry/sources.tsv
test -f knowledge/evidence/raw/2026-08-16/SRC-001-parallel-research-prompt-and-report.md
test "$(wc -l < AGENTS.md | tr -d ' ')" -le 60
test "$(wc -l < knowledge/context/INDEX.md | tr -d ' ')" -le 100

echo "Research validation passed."
