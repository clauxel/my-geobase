import {
  handleAnalytics,
  handleBingSiteAuth,
  handleLaunchCheckout,
  handleRobots,
  handleRuntime,
  handleSitemap,
  jsonResponse,
  keywordPaths,
  planCatalog,
  securityHeaders,
  withSecurityHeaders,
} from '../functions/_shared/veovido.js'
import { handleNowPaymentsCheckout } from './nowpayments.js'

const staticAssetPaths = new Set(['/', ...keywordPaths, '/privacy', '/terms'])
const CANONICAL_HOST = 'veovido.space'
const CANONICAL_HOSTS = new Set(['veovido.space', 'www.veovido.space'])

function maybeRedirectToHttps(requestUrl, request) {
  const host = request.headers.get('Host') || requestUrl.host
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  if (!isLocal && CANONICAL_HOSTS.has(requestUrl.hostname) && requestUrl.hostname !== CANONICAL_HOST) {
    const redirectUrl = new URL(requestUrl)
    redirectUrl.protocol = 'https:'
    redirectUrl.hostname = CANONICAL_HOST
    return Response.redirect(redirectUrl.toString(), 308)
  }
  return null
}

function noIndexNotFoundResponse(request) {
  const headers = securityHeaders(request)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  return new Response('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Page not found</title></head><body><main><h1>Page not found</h1><p>This URL is not a public page for this product.</p></main></body></html>', { status: 404, headers })
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

  if (!staticAssetPaths.has(normalizedPath) && !/\.[a-z0-9]+$/i.test(normalizedPath)) return noIndexNotFoundResponse(request)

  if (staticAssetPaths.has(normalizedPath)) {
    const assetUrl = new URL(request.url)
    assetUrl.pathname = normalizedPath === '/' ? '/' : `${normalizedPath}/`
    const assetResponse = await env.ASSETS.fetch(new Request(assetUrl.toString(), request))
    if (assetResponse.status !== 404) return withSecurityHeaders(assetResponse, request)
  }

  return withSecurityHeaders(await env.ASSETS.fetch(request), request)
}

async function handleRequest(request, env) {
  const requestUrl = new URL(request.url)

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: securityHeaders(request) })
  if (requestUrl.pathname === '/api/runtime') return handleRuntime(request)
  if (requestUrl.pathname === '/api/nowpayments-checkout') {
    return handleNowPaymentsCheckout(request, env, {
      plans: planCatalog,
      defaultPlanId: 'director',
      siteName: 'VeoVido',
      siteKey: 'veovido',
      annualDiscountMultiplier: 0.5,
    })
  }
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
