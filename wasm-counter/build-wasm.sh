#!/usr/bin/env bash
set -euo pipefail

# Simple helper to build WASM for this project and copy the generated .wasm next to index.html
# Usage: ./build-wasm.sh

HERE="$(cd "$(dirname "$0")" && pwd)"
echo "Building wasm in ${HERE}..."

if ! command -v zig >/dev/null 2>&1; then
  echo "Error: zig not found in PATH" >&2
  exit 2
fi

cd "$HERE"

# Build with the wasm32-freestanding target and ReleaseSmall optimizations
zig build -Dtarget=wasm32-freestanding -Doptimize=ReleaseSmall

OUT="zig-out/bin/wasm_counter.wasm"
if [ ! -f "$OUT" ]; then
  echo "Build succeeded but expected output not found: $OUT" >&2
  echo "Check zig-out directory to see available artifacts." >&2
  exit 3
fi

cp -f "$OUT" ./wasm_counter.wasm
echo "Copied $OUT -> $HERE/wasm_counter.wasm"
echo "Done. Serve the directory with a local HTTP server (e.g. python3 -m http.server) and open index.html"
