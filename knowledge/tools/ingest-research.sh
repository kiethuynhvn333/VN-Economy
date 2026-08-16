#!/usr/bin/env sh
set -eu

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Run this command inside the VN-Economy repository." >&2
  exit 1
}
cd "$ROOT"

SOURCE="${1:-}"
SOURCE_ID="${2:-}"
DATE="${3:-$(date +%Y-%m-%d)}"

test -f "$SOURCE" || { echo "Usage: $0 <source-file> <SRC-###> [YYYY-MM-DD]" >&2; exit 1; }
case "$SOURCE_ID" in SRC-[0-9][0-9][0-9]) ;; *) echo "Source ID must look like SRC-001." >&2; exit 1 ;; esac

TARGET_DIR="$ROOT/knowledge/evidence/raw/$DATE"
mkdir -p "$TARGET_DIR"
NAME="$(basename "$SOURCE")"
TARGET="$TARGET_DIR/$SOURCE_ID-$NAME"
test ! -e "$TARGET" || { echo "Target already exists: $TARGET" >&2; exit 1; }
cp "$SOURCE" "$TARGET"

echo "Imported: $TARGET"
echo "SHA256: $(shasum -a 256 "$TARGET" | awk '{print $1}')"
echo "Next: register $SOURCE_ID in knowledge/references/SOURCES.md and knowledge/research/registry/sources.tsv."
