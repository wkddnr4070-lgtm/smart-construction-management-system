#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Some environments inject deprecated npm config keys that break installs with warnings/errors.
unset npm_config_http_proxy || true
unset npm_config_https_proxy || true

REGISTRY="${NPM_REGISTRY_URL:-https://registry.npmjs.org}"

echo "[setup] Using npm registry: $REGISTRY"

if command -v curl >/dev/null 2>&1; then
  if ! curl -I --max-time 10 "$REGISTRY" >/dev/null 2>&1; then
    echo "[setup] Registry is unreachable from current environment."
    echo "[setup] If your company uses an internal registry, run:"
    echo "         NPM_REGISTRY_URL=https://<your-internal-registry> npm run setup"
    exit 2
  fi
fi

npm install --registry "$REGISTRY"

echo "[setup] Dependency installation complete."
