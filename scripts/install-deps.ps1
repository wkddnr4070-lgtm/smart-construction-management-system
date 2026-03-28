$ErrorActionPreference = "Stop"

if ($env:NPM_REGISTRY_URL) {
  $registry = $env:NPM_REGISTRY_URL
} else {
  $registry = "https://registry.npmjs.org"
}

Write-Host "[setup] Using npm registry: $registry"

try {
  Invoke-WebRequest -Uri $registry -Method Head -TimeoutSec 10 | Out-Null
} catch {
  Write-Host "[setup] Registry is unreachable from current environment."
  Write-Host "[setup] If your company uses an internal registry, run:"
  Write-Host "         $env:NPM_REGISTRY_URL='https://<your-internal-registry>'; npm run setup"
  exit 2
}

npm install --registry $registry

Write-Host "[setup] Dependency installation complete."
