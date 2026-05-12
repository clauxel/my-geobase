const CANONICAL_ORIGIN = 'https://veovido.space'
const CANONICAL_HOSTS = new Set(['veovido.space', 'www.veovido.space'])
const ANNUAL_DISCOUNT_MULTIPLIER = 0.5
const creemProductCache = new Map()

export const keywordPaths = [
  '/veo-ai-video-generator',
  '/veo-3-google-ai',
  '/veo-3-ai-video',
  '/veo-3-ai-free-unlimited',
  '/veo-3-flow',
  '/gemini-veo-3-ai',
  '/google-ai-video-generator',
  '/gemini-veo-3-free',
  '/veo-ai',
  '/veo-price',
  '/veo-sports',
  '/veo-camera',
  '/veo-watch',
  '/veo-3-ai',
  '/veo-app-download',
  '/veo-3-price',
  '/veo-3-ai-free',
  '/google-veo-3-video-generator',
]

const indexablePaths = ['/', ...keywordPaths, '/privacy', '/terms']

const planCatalog = {
  star: {
    id: 'star',
    name: 'Star',
    amountCents: 900,
    monthlyAmountCents: 900,
    currency: 'USD',
    oneTime: true,
    summary: 'one HD no-watermark generation for a single cinematic selfie video',
  },
  director: {
    id: 'director',
    name: 'Director',
    monthlyAmountCents: 2900,
    currency: 'USD',
    summary: '10 videos per month, voice clone, 4K export, and faster render priority',
  },
  studio: {
    id: 'studio',
    name: 'Studio',
    monthlyAmountCents: 7900,
    currency: 'USD',
    summary: 'unlimited videos, friend co-star mode, API access, and studio workflow controls',
  },
}

export function securityHeaders(request) {
  const headers = new Headers({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  })

  const origin = request?.headers?.get?.('Origin')
  if (isAllowedOrigin(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')
    headers.set('Vary', 'Origin')
  }

  return headers
}

function isAllowedOrigin(origin) {
  if (!origin) return false
  try {
    const url = new URL(origin)
    return CANONICAL_HOSTS.has(url.hostname) || url.hostname.endsWith('.pages.dev') || url.hostname.endsWith('.workers.dev') || url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  } catch {
    return false
  }
}

export function withSecurityHeaders(response, request) {
  const headers = new Headers(response.headers)
  for (const [key, value] of securityHeaders(request)) headers.set(key, value)
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export function jsonResponse(data, status = 200, request = null) {
  const headers = securityHeaders(request)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(data), { status, headers })
}

function xmlResponse(body, request, status = 200) {
  const headers = securityHeaders(request)
  headers.set('Content-Type', 'application/xml; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=3600')
  return new Response(body, { status, headers })
}

function textResponse(body, request) {
  const headers = securityHeaders(request)
  headers.set('Content-Type', 'text/plain; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=3600')
  return new Response(body, { status: 200, headers })
}

function resolvePublicOrigin(request) {
  const requestUrl = new URL(request.url)
  const host = request.headers.get('Host') || requestUrl.host
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) return `${requestUrl.protocol}//${host}`
  if (CANONICAL_HOSTS.has(requestUrl.hostname)) return `https://${requestUrl.hostname}`
  if (requestUrl.hostname.endsWith('.pages.dev') || requestUrl.hostname.endsWith('.workers.dev')) return requestUrl.origin
  const configured = String(request.env?.APP_ORIGIN || '').trim().replace(/\/+$/, '')
  return configured || CANONICAL_ORIGIN
}

function resolveCreemBase(env) {
  const raw = String(env?.CREEM_API_BASE || '').trim()
  if (raw) return raw.replace(/\/+$/, '')
  return String(env?.CREEM_ENV || '').toLowerCase() === 'test' ? 'https://test-api.creem.io' : 'https://api.creem.io'
}

async function getSecretValue(value) {
  if (typeof value === 'string') return value.trim()
  if (value && typeof value.get === 'function') {
    const resolved = await value.get()
    return typeof resolved === 'string' ? resolved.trim() : ''
  }
  return ''
}

async function firstSecretEnv(env, ...keys) {
  for (const key of keys) {
    const value = await getSecretValue(env?.[key])
    if (value) return value
  }
  return ''
}

function normalizeEnvKey(value) {
  return String(value)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function formatMoney(amountCents, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: amountCents % 100 === 0 ? 0 : 2,
  }).format(amountCents / 100)
}

function resolvePlanSelection(value) {
  const [rawPlanId, rawBilling] = String(value || 'director:annual').trim().split(':')
  const plan = planCatalog[rawPlanId] || planCatalog.director
  const billing = plan.oneTime ? 'single' : rawBilling === 'monthly' ? 'monthly' : 'annual'
  const amountCents = plan.oneTime
    ? plan.amountCents
    : billing === 'annual'
      ? Math.round(plan.monthlyAmountCents * 12 * ANNUAL_DISCOUNT_MULTIPLIER)
      : plan.monthlyAmountCents

  return {
    plan,
    planId: plan.id,
    billing,
    selectionId: plan.oneTime ? `${plan.id}:single` : `${plan.id}:${billing}`,
    amountCents,
    amountLabel: formatMoney(amountCents, plan.currency),
    currency: plan.currency,
  }
}

function configuredProductId(env, selection) {
  const keys = [
    `CREEM_PRODUCT_ID_VEOVIDO_${normalizeEnvKey(selection.planId)}_${normalizeEnvKey(selection.billing)}`,
    `CREEM_PRODUCT_ID_VEOVIDO_${normalizeEnvKey(selection.selectionId)}`,
    `CREEM_PRODUCT_ID_${normalizeEnvKey(selection.selectionId)}`,
    `CREEM_PRODUCT_ID_${normalizeEnvKey(selection.planId)}`,
    'CREEM_PRODUCT_ID',
  ]

  for (const key of keys) {
    const value = env?.[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

async function requestCreemJson(apiKey, url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
  })

  const rawText = await response.text()
  let payload = null
  if (rawText) {
    try {
      payload = JSON.parse(rawText)
    } catch {
      payload = null
    }
  }

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Creem request failed.')
  }

  return payload || {}
}

async function getOrCreateCreemProduct(env, apiKey, selection, successUrl) {
  const configured = configuredProductId(env, selection)
  if (configured) return configured

  const cacheKey = `${selection.selectionId}:${selection.amountCents}:${selection.currency}`
  if (creemProductCache.has(cacheKey)) return creemProductCache.get(cacheKey)

  const recurring = !selection.plan.oneTime
  const productBody = {
    name: `VeoVido ${selection.plan.name} ${selection.billing === 'annual' ? 'Annual' : selection.billing === 'monthly' ? 'Monthly' : 'Generation'}`,
    description: `${selection.amountLabel} - ${selection.plan.summary}`,
    price: selection.amountCents,
    currency: selection.currency,
    billing_type: recurring ? 'recurring' : 'onetime',
    tax_mode: 'inclusive',
    tax_category: 'saas',
    default_success_url: successUrl,
  }
  if (recurring) productBody.billing_period = selection.billing === 'annual' ? 'every-year' : 'every-month'

  const product = await requestCreemJson(apiKey, `${resolveCreemBase(env)}/v1/products`, productBody)
  const productId = product.id || product.product_id
  if (!productId) throw new Error('Creem did not return a product id.')

  creemProductCache.set(cacheKey, productId)
  return productId
}

function extractCheckoutUrl(payload) {
  const candidates = [payload?.checkout_url, payload?.checkoutUrl, payload?.url, payload?.checkout?.url]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
  }
  const links = Array.isArray(payload?.links) ? payload.links : []
  const link = links.find((item) => ['checkout', 'payment', 'payer-action', 'approve'].includes(String(item?.rel || '').toLowerCase()))
  return typeof link?.href === 'string' ? link.href.trim() : ''
}

export async function handleLaunchCheckout(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: securityHeaders(request) })
  if (request.method !== 'POST') return jsonResponse({ message: 'Method not allowed.' }, 405, request)

  const apiKey = await firstSecretEnv(env, 'API_PROD_KEY', 'CREAM_PAY_KEY', 'CREEM_API_KEY', 'CREEM_KEY')
  if (!apiKey) return jsonResponse({ message: 'Payment is not configured yet.' }, 503, request)

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ message: 'Request body must be valid JSON.' }, 400, request)
  }

  const selection = resolvePlanSelection(body?.planId)
  const orderId = crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : `${Date.now()}${Math.random().toString(16).slice(2)}`
  const successUrl = new URL(`${resolvePublicOrigin(request)}/`)
  successUrl.searchParams.set('checkout', 'success')
  successUrl.searchParams.set('order', orderId)
  successUrl.searchParams.set('plan', selection.selectionId)
  successUrl.searchParams.set('provider', 'creem')

  try {
    const productId = await getOrCreateCreemProduct(env, apiKey, selection, successUrl.toString())
    const checkout = await requestCreemJson(apiKey, `${resolveCreemBase(env)}/v1/checkouts`, {
      product_id: productId,
      units: 1,
      success_url: successUrl.toString(),
      request_id: `veovido_${selection.planId}_${selection.billing}_${orderId}`,
      metadata: {
        site: 'veovido.space',
        product: 'VeoVido',
        orderId,
        planId: selection.selectionId,
        source: String(body?.source || 'site').slice(0, 80),
        annualDiscount: selection.billing === 'annual' ? '50%' : '0%',
      },
    })

    const checkoutUrl = extractCheckoutUrl(checkout)
    if (!checkoutUrl) throw new Error('Creem did not return a checkout URL.')

    return jsonResponse({
      message: 'Checkout is ready.',
      orderId,
      orderNumber: `VV-${Date.now().toString(36).toUpperCase()}-${orderId.slice(0, 6).toUpperCase()}`,
      planId: selection.selectionId,
      amountCents: selection.amountCents,
      amountLabel: selection.amountLabel,
      currency: selection.currency,
      checkoutUrl,
      paymentProvider: 'creem',
      creemCheckoutId: checkout.id || checkout.checkout_id || checkout.checkoutId || null,
    }, 200, request)
  } catch (error) {
    console.log(JSON.stringify({ type: 'checkout_error', site: 'veovido.space', message: String(error?.message || error) }))
    return jsonResponse({ message: 'Secure checkout could not be created yet.' }, 502, request)
  }
}

function sanitizeIdentifier(value, maxLength = 96) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_:/?.#-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, maxLength)
  return normalized || null
}

function sanitizeString(value, maxLength = 240) {
  const normalized = String(value ?? '').trim()
  return normalized ? normalized.slice(0, maxLength) : null
}

function normalizeEvent(rawEvent) {
  return {
    id: sanitizeIdentifier(rawEvent?.id, 96) || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
    visitorId: sanitizeIdentifier(rawEvent?.visitorId, 96),
    sessionId: sanitizeIdentifier(rawEvent?.sessionId, 96),
    eventType: sanitizeIdentifier(rawEvent?.eventType, 32) || 'unknown',
    eventName: sanitizeIdentifier(rawEvent?.eventName, 64) || 'unknown_event',
    routePath: String(rawEvent?.routePath || '/').slice(0, 240),
    pageKey: sanitizeIdentifier(rawEvent?.pageKey, 96),
    sectionKey: sanitizeIdentifier(rawEvent?.sectionKey, 96),
    elementKey: sanitizeIdentifier(rawEvent?.elementKey, 96),
    referrerHost: sanitizeString(rawEvent?.referrerHost, 180),
    utmSource: sanitizeString(rawEvent?.utmSource, 120),
    utmMedium: sanitizeString(rawEvent?.utmMedium, 120),
    utmCampaign: sanitizeString(rawEvent?.utmCampaign, 160),
    deviceType: sanitizeIdentifier(rawEvent?.deviceType, 32) || 'desktop',
    metadata: rawEvent?.metadata && typeof rawEvent.metadata === 'object' ? rawEvent.metadata : {},
    occurredAt: new Date(rawEvent?.occurredAt || Date.now()).toISOString(),
  }
}

export async function handleAnalytics(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: securityHeaders(request) })
  if (request.method !== 'POST') return jsonResponse({ message: 'Method not allowed.' }, 405, request)

  let body = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const events = Array.isArray(body?.events) ? body.events.slice(0, 50).map(normalizeEvent).filter((event) => event.visitorId && event.sessionId) : []
  const receivedAt = new Date().toISOString()
  let persisted = false

  try {
    if (env?.ANALYTICS_KV?.put && events.length) {
      const batchId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
      const day = receivedAt.slice(0, 10)
      const hour = receivedAt.slice(11, 13)
      await env.ANALYTICS_KV.put(
        `events/${day}/${hour}/${batchId}.json`,
        JSON.stringify({
          site: 'veovido.space',
          receivedAt,
          country: request.headers.get('CF-IPCountry') || null,
          accepted: events.length,
          events,
        }),
        { expirationTtl: 60 * 60 * 24 * 180 },
      )
      persisted = true
    }
  } catch (error) {
    console.log(JSON.stringify({ type: 'analytics_store_error', site: 'veovido.space', message: String(error?.message || error) }))
  }

  console.log(JSON.stringify({ type: 'analytics', site: 'veovido.space', accepted: events.length, persisted }))
  return jsonResponse({ message: 'Analytics events accepted.', accepted: events.length, persisted }, 202, request)
}

export function handleRuntime(request) {
  return jsonResponse({
    ok: true,
    site: 'veovido.space',
    publicAppOrigin: resolvePublicOrigin(request),
    deployment: 'cloudflare-workers-and-pages',
    paymentProvider: 'creem',
    defaultPlan: 'director',
    defaultBilling: 'annual',
    annualDiscount: '50%',
    analytics: 'first-party-kv',
    ts: Date.now(),
  }, 200, request)
}

export function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = indexablePaths
    .map((path) => {
      const locPath = path === '/' ? '/' : `${path}/`
      const priority = path === '/' ? '1.0' : path === '/privacy' || path === '/terms' ? '0.35' : '0.82'
      const changefreq = path === '/' ? 'weekly' : 'monthly'
      return `  <url>
    <loc>${CANONICAL_ORIGIN}${locPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export function handleSitemap(request) {
  return xmlResponse(buildSitemapXml(), request)
}

export function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`
}

export function handleRobots(request) {
  return textResponse(buildRobotsTxt(), request)
}

export function handleBingSiteAuth(request, env) {
  const code = String(env?.BING_SITE_VERIFICATION || env?.BING_AUTH_CODE || '').trim()
  if (!code) return xmlResponse('<?xml version="1.0"?><users></users>', request, 404)
  return xmlResponse(`<?xml version="1.0"?><users><user>${escapeXml(code)}</user></users>`, request)
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
