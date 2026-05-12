import {
  handleAnalytics,
  handleBingSiteAuth,
  handleLaunchCheckout,
  handleRobots,
  handleRuntime,
  handleSitemap,
  jsonResponse,
  keywordPaths,
  securityHeaders,
  withSecurityHeaders,
} from '../functions/_shared/veovido.js'

const staticAssetPaths = new Set(['/', ...keywordPaths, '/privacy', '/terms'])
const CANONICAL_HOSTS = new Set(['veovido.space', 'www.veovido.space'])

function maybeRedirectToHttps(requestUrl, request) {
  const host = request.headers.get('Host') || requestUrl.host
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  if (!isLocal && requestUrl.protocol !== 'https:' && CANONICAL_HOSTS.has(requestUrl.hostname)) {
    const redirectUrl = new URL(requestUrl)
    redirectUrl.protocol = 'https:'
    return Response.redirect(redirectUrl.toString(), 308)
  }
  return null
}

async function fetchAsset(request, env) {
  if (!env?.ASSETS?.fetch) {
    return new Response('Cloudflare asset binding is unavailable.', {
      status: 500,
      headers: securityHeaders(request),
    })
  }

  const requestUrl = new URL(request.url)
  const normalizedPath = requestUrl.pathname.replace(/\/+$/, '') || '/'

  if (staticAssetPaths.has(normalizedPath)) {
    const assetUrl = new URL(request.url)
    assetUrl.pathname = normalizedPath === '/' ? '/index.html' : `${normalizedPath}/index.html`
    const assetResponse = await env.ASSETS.fetch(new Request(assetUrl.toString(), request))
    if (assetResponse.status !== 404) return withSecurityHeaders(assetResponse, request)
  }

  return withSecurityHeaders(await env.ASSETS.fetch(request), request)
}

async function handleRequest(request, env) {
  const requestUrl = new URL(request.url)

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: securityHeaders(request) })
  if (requestUrl.pathname === '/api/runtime') return handleRuntime(request)
  if (requestUrl.pathname === '/api/launch-checkout' || requestUrl.pathname === '/api/checkout') {
    return handleLaunchCheckout(request, env)
  }
  if (requestUrl.pathname === '/api/analytics/events') return handleAnalytics(request, env)

  const httpsRedirect = maybeRedirectToHttps(requestUrl, request)
  if (httpsRedirect) return httpsRedirect

  if (requestUrl.pathname === '/sitemap.xml') return handleSitemap(request)
  if (requestUrl.pathname === '/robots.txt') return handleRobots(request)
  if (requestUrl.pathname === '/BingSiteAuth.xml') return handleBingSiteAuth(request, env)

  return fetchAsset(request, env)
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env)
    } catch (error) {
      console.log(JSON.stringify({ type: 'worker_error', site: 'veovido.space', message: String(error?.message || error) }))
      return jsonResponse({ ok: false, error: 'Internal server error.' }, 500, request)
    }
  },
}
