
(function () {
  var visitorStorageKey = 'veovido-analytics-visitor-id'
  var sessionStorageKey = 'veovido-analytics-session'
  var pendingEventsStorageKey = 'veovido-analytics-pending-events'
  var endpoint = '/api/analytics/events'
  var pendingEvents = []
  var initialized = false
  var viewedSections = new Set()
  var scrollDepths = new Set()

  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      var random = Math.random() * 16 | 0
      var value = char === 'x' ? random : (random & 0x3 | 0x8)
      return value.toString(16)
    })
  }

  function clean(value, max) {
    var normalized = String(value || '').trim().toLowerCase().replace(/[^a-z0-9_:/?.#-]+/g, '_').replace(/^_+|_+$/g, '')
    return normalized ? normalized.slice(0, max || 96) : null
  }

  function visitorId() {
    try {
      var existing = localStorage.getItem(visitorStorageKey)
      if (existing) return existing
      var id = uuid()
      localStorage.setItem(visitorStorageKey, id)
      return id
    } catch { return uuid() }
  }

  function sessionId() {
    var now = Date.now()
    try {
      var existing = JSON.parse(sessionStorage.getItem(sessionStorageKey) || 'null')
      if (existing && existing.id && now - Number(existing.startedAt || 0) < 30 * 60 * 1000) return existing.id
    } catch {}
    var next = { id: uuid(), startedAt: now }
    try { sessionStorage.setItem(sessionStorageKey, JSON.stringify(next)) } catch {}
    return next.id
  }

  function getUtm(name) {
    try { return new URLSearchParams(window.location.search).get(name) || '' } catch { return '' }
  }

  function base(input) {
    var path = (window.location.pathname || '/') + (window.location.search || '')
    var referrerHost = ''
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : '' } catch {}
    return {
      id: uuid(),
      visitorId: visitorId(),
      sessionId: sessionId(),
      eventType: clean(input.eventType, 32) || 'unknown',
      eventName: clean(input.eventName, 64) || 'unknown_event',
      routePath: path,
      pageKey: clean(window.location.pathname === '/' ? 'home' : window.location.pathname, 96),
      sectionKey: clean(input.sectionKey, 96),
      elementKey: clean(input.elementKey, 96),
      referrerHost: referrerHost,
      utmSource: getUtm('utm_source'),
      utmMedium: getUtm('utm_medium'),
      utmCampaign: getUtm('utm_campaign'),
      deviceType: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      metadata: input.metadata || {},
      occurredAt: new Date().toISOString(),
    }
  }

  function save() {
    try { localStorage.setItem(pendingEventsStorageKey, JSON.stringify(pendingEvents.slice(-250))) } catch {}
  }

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(pendingEventsStorageKey) || '[]')
      if (Array.isArray(saved)) pendingEvents = saved.slice(-250)
    } catch {}
  }

  function flush(useBeacon) {
    if (!pendingEvents.length) return
    var batch = pendingEvents.slice(0, 50)
    var body = JSON.stringify({ events: batch })
    if (useBeacon && navigator.sendBeacon) {
      if (navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))) {
        pendingEvents = pendingEvents.slice(batch.length)
        save()
        return
      }
    }
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: useBeacon })
      .then(function (response) {
        if (response.ok) {
          pendingEvents = pendingEvents.slice(batch.length)
          save()
        }
      })
      .catch(function () {})
  }

  function track(input) {
    pendingEvents.push(base(input))
    pendingEvents = pendingEvents.slice(-250)
    save()
    window.setTimeout(function () { flush(false) }, 90)
  }

  function describeClick(target) {
    var element = target && target.closest ? target.closest('[data-analytics-click], a[href], button, input, textarea, select') : null
    if (!element || element.dataset.analyticsIgnore === 'true') return null
    var section = element.closest('[data-analytics-section], section[id]')
    var href = element.getAttribute('href') || ''
    var text = (element.getAttribute('aria-label') || element.textContent || element.name || element.id || '').trim().slice(0, 140)
    var isCta = element.dataset.analyticsCta === 'true' || element.classList.contains('primary') || element.classList.contains('btn-pricing')
    return {
      eventType: 'click',
      eventName: isCta ? 'cta_click' : 'ui_click',
      sectionKey: section ? (section.dataset.analyticsSection || section.id || '') : '',
      elementKey: element.dataset.analyticsClick || text || href || element.tagName,
      metadata: { href: href, text: text, tag: element.tagName.toLowerCase() },
    }
  }

  function observeSections() {
    if (typeof IntersectionObserver !== 'function') return
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        var key = entry.target.dataset.analyticsSection || entry.target.id || ''
        if (!key || viewedSections.has(key)) return
        viewedSections.add(key)
        track({ eventType: 'section', eventName: 'content_view', sectionKey: key })
      })
    }, { threshold: 0.35 })
    document.querySelectorAll('section[id], [data-analytics-section]').forEach(function (section) { observer.observe(section) })
  }

  function scrollDepth() {
    var height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    var depth = Math.min(100, Math.round(((window.scrollY || 0) / height) * 100))
    ;[25, 50, 75, 90].forEach(function (threshold) {
      if (depth >= threshold && !scrollDepths.has(threshold)) {
        scrollDepths.add(threshold)
        track({ eventType: 'scroll', eventName: 'scroll_depth', metadata: { depth: threshold } })
      }
    })
  }

  function init() {
    if (initialized) return
    initialized = true
    load()
    window.VeoVidoAnalytics = { track: track, flush: flush }
    track({ eventType: 'session', eventName: 'session_started' })
    track({ eventType: 'page', eventName: 'page_view' })
    document.addEventListener('click', function (event) {
      var click = describeClick(event.target)
      if (click) track(click)
    }, true)
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush(true)
    })
    window.addEventListener('pagehide', function () { flush(true) })
    window.addEventListener('scroll', scrollDepth, { passive: true })
    window.setTimeout(observeSections, 120)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
})()
