#!/usr/bin/env bash
# Concatenate all sections into the final deliverable.
set -euo pipefail
cd "$(dirname "$0")"
OUT="CS_CE_Career_Guide_2027.md"
: > "$OUT"
for f in $(ls sections/*.md | sort); do
  cat "$f" >> "$OUT"
  printf "\n\n---\n\n" >> "$OUT"
done
echo "Built $OUT: $(wc -w < "$OUT") words, $(wc -l < "$OUT") lines"
