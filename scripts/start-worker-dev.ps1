param(
  [int]$Port = 3047
)

$ErrorActionPreference = "Stop"
$env:API_PROD_KEY = $env:CREAM_PAY_KEY
$env:WRANGLER_SEND_METRICS = "false"

npx wrangler dev --config wrangler.worker.toml --local --port $Port
