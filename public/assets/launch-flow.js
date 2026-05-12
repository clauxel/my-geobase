
(function () {
  const defaultPlanId = 'director'
  const defaultBillingCycle = 'annual'
  const annualDiscountMultiplier = 0.5
  const currency = 'USD'
  const completedOrderIds = new Set()

  const planCatalog = {
    star: {
      id: 'star',
      name: 'Star',
      monthlyAmountCents: 900,
      oneTime: true,
      subtitle: 'One finished HD short',
      launchMode: 'checkout',
    },
    director: {
      id: 'director',
      name: 'Director',
      monthlyAmountCents: 2900,
      subtitle: '10 clips, voice clone, 4K',
      launchMode: 'checkout',
      annualDiscountMultiplier: annualDiscountMultiplier,
    },
    studio: {
      id: 'studio',
      name: 'Studio',
      monthlyAmountCents: 7900,
      subtitle: 'Unlimited, co-stars, API',
      launchMode: 'checkout',
      annualDiscountMultiplier: annualDiscountMultiplier,
    },
  }

  const state = {
    selectedPlanId: defaultPlanId,
    billingCycle: defaultBillingCycle,
    step: 'plans',
    source: 'hero_cta',
    modalOpen: false,
    popup: null,
    popupMonitor: null,
    checkoutUrl: '',
    orderId: '',
    paymentStatus: 'idle',
    paymentMessage: '',
    requestInFlight: false,
  }

  const elements = {}

  function formatMoney(amountCents) {
    const hasDecimals = amountCents % 100 !== 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(amountCents / 100)
  }

  function getPlan(planId) {
    return planCatalog[planId] || planCatalog[defaultPlanId]
  }

  function getPricing(planId, billingCycle) {
    const plan = getPlan(planId)
    if (plan.oneTime) {
      return {
        plan: plan,
        planId: plan.id,
        billingCycle: 'single',
        selectionId: plan.id + ':single',
        amountCents: plan.monthlyAmountCents,
        displayAmount: formatMoney(plan.monthlyAmountCents),
        displayPeriod: '/ generation',
        sectionNote: formatMoney(plan.monthlyAmountCents) + ' charged once for one HD no-watermark short.',
        selectionNote: 'One HD generation with no watermark. Upgrade later if you need repeat videos or 4K.',
        paymentBilling: formatMoney(plan.monthlyAmountCents) + ' one-time charge',
        discountLabel: 'Single generation',
      }
    }

    const isAnnual = billingCycle === 'annual'
    const annualAmountCents = Math.round(plan.monthlyAmountCents * 12 * (plan.annualDiscountMultiplier || 1))
    const annualMonthlyCents = Math.round(annualAmountCents / 12)
    const amountCents = isAnnual ? annualAmountCents : plan.monthlyAmountCents
    const displayAmountCents = isAnnual ? annualMonthlyCents : plan.monthlyAmountCents
    const savingsPercent = plan.annualDiscountMultiplier ? Math.round((1 - plan.annualDiscountMultiplier) * 100) : 0
    return {
      plan: plan,
      planId: plan.id,
      billingCycle: billingCycle,
      selectionId: plan.id + ':' + billingCycle,
      amountCents: amountCents,
      displayAmount: formatMoney(displayAmountCents),
      displayPeriod: isAnnual ? '/ mo billed yearly' : '/ month',
      sectionNote: isAnnual
        ? formatMoney(annualAmountCents) + ' charged yearly. Save ' + savingsPercent + '% on annual billing.'
        : formatMoney(plan.monthlyAmountCents) + ' charged monthly. Switch to yearly for ' + savingsPercent + '% savings.',
      selectionNote: isAnnual
        ? formatMoney(annualAmountCents) + ' charged yearly. Equivalent to ' + formatMoney(annualMonthlyCents) + ' per month.'
        : formatMoney(plan.monthlyAmountCents) + ' charged monthly.',
      paymentBilling: isAnnual ? formatMoney(annualAmountCents) + ' charged yearly' : formatMoney(plan.monthlyAmountCents) + ' charged monthly',
      discountLabel: isAnnual ? savingsPercent + '% off yearly pricing' : 'Monthly billing',
    }
  }

  function safeTrack(eventName, metadata) {
    if (!window.VeoVidoAnalytics || typeof window.VeoVidoAnalytics.track !== 'function') return
    const eventType =
      eventName === 'plan_selected'
        ? 'plan'
        : eventName.indexOf('checkout') >= 0 || eventName === 'payment_completed'
          ? 'checkout'
          : 'click'
    try {
      window.VeoVidoAnalytics.track({
        eventType: eventType,
        eventName: eventName,
        sectionKey: 'pricing',
        elementKey: metadata && metadata.elementKey ? metadata.elementKey : eventName,
        metadata: metadata || {},
      })
    } catch {}
  }

  function setStep(step) {
    state.step = step
    elements.steps.forEach(function (stepElement) {
      stepElement.hidden = stepElement.getAttribute('data-launch-step') !== step
    })
  }

  function showModal() {
    state.modalOpen = true
    document.body.classList.add('launch-modal-open')
    elements.overlay.hidden = false
  }

  function clearPopupMonitor() {
    if (state.popupMonitor) {
      window.clearInterval(state.popupMonitor)
      state.popupMonitor = null
    }
  }

  function closeModal() {
    state.modalOpen = false
    document.body.classList.remove('launch-modal-open')
    elements.overlay.hidden = true
    clearPopupMonitor()
    state.paymentStatus = 'idle'
    state.paymentMessage = ''
    state.checkoutUrl = ''
    state.orderId = ''
    state.requestInFlight = false
    setStep('plans')
    render()
  }

  function openPricingModal(options) {
    state.selectedPlanId = options.planId || defaultPlanId
    state.billingCycle = options.billingCycle || defaultBillingCycle
    state.source = options.source || 'cta'
    state.paymentStatus = 'idle'
    state.paymentMessage = ''
    state.checkoutUrl = ''
    state.orderId = ''
    state.requestInFlight = false
    setStep('plans')
    showModal()
    render()
    safeTrack('launch_clicked', { source: state.source, planId: getPricing(state.selectedPlanId, state.billingCycle).selectionId })
  }

  function openCenteredPopup(name, width, height) {
    const popupWidth = Math.min(width || 560, window.screen.availWidth - 32)
    const popupHeight = Math.min(height || 780, window.screen.availHeight - 48)
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - popupWidth) / 2))
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - popupHeight) / 2))
    const features = ['popup=yes', 'resizable=yes', 'scrollbars=yes', 'width=' + popupWidth, 'height=' + popupHeight, 'left=' + left, 'top=' + top].join(',')
    const popup = window.open('about:blank', name, features)
    if (popup) popup.focus()
    return popup
  }

  function writePopupLoading(popup, pricing) {
    if (!popup || popup.closed) return
    popup.document.open()
    popup.document.write('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>VeoVido Checkout</title><style>body{margin:0;font-family:Inter,Arial,sans-serif;background:#11151f;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}main{max-width:380px;text-align:center;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:28px;background:rgba(255,255,255,.06)}strong{color:#f4bd4c;text-transform:uppercase;letter-spacing:.12em;font-size:12px}h1{font-size:28px;line-height:1.1;margin:12px 0}p{color:rgba(255,255,255,.72);line-height:1.6}</style></head><body><main><strong>VeoVido</strong><h1>' + pricing.plan.name + ' checkout</h1><p>Preparing your secure Creem payment window.</p></main></body></html>')
    popup.document.close()
  }

  function ensurePopupMonitor() {
    clearPopupMonitor()
    state.popupMonitor = window.setInterval(function () {
      if (!state.popup || state.popup.closed) {
        clearPopupMonitor()
        state.popup = null
        if (state.step === 'payment' && state.paymentStatus !== 'success' && state.paymentStatus !== 'error') {
          state.paymentStatus = 'closed'
          state.paymentMessage = 'The payment popup was closed before checkout finished. You can reopen it here.'
          render()
        }
      }
    }, 700)
  }

  function navigatePopup(popup, url) {
    if (!url) return false
    const activePopup = popup || openCenteredPopup('veovido-creem-checkout', 560, 780)
    if (!activePopup) return false
    try {
      activePopup.location.href = url
      activePopup.focus()
      state.popup = activePopup
      ensurePopupMonitor()
      return true
    } catch {
      return false
    }
  }

  async function requestCheckoutSession(pricing) {
    const response = await fetch('/api/launch-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: pricing.selectionId, source: state.source }),
      credentials: 'same-origin',
    })
    const rawText = await response.text()
    const payload = rawText ? JSON.parse(rawText) : {}
    if (!response.ok) throw new Error(payload && payload.message ? payload.message : 'Checkout could not be started.')
    return payload
  }

  async function startCheckoutFlow() {
    const pricing = getPricing(state.selectedPlanId, state.billingCycle)
    if (state.requestInFlight) return
    state.requestInFlight = true
    state.paymentStatus = 'loading'
    state.paymentMessage = 'Preparing your checkout session. A secure Creem payment popup should appear over this page in a moment.'
    state.checkoutUrl = ''
    state.orderId = ''
    setStep('payment')
    render()

    const popup = openCenteredPopup('veovido-creem-checkout', 560, 780)
    if (popup) {
      state.popup = popup
      writePopupLoading(popup, pricing)
      ensurePopupMonitor()
    }

    safeTrack('plan_selected', { source: state.source, planId: pricing.selectionId, billingCycle: pricing.billingCycle, amountCents: pricing.amountCents })
    safeTrack('checkout_started', { source: state.source, planId: pricing.selectionId, billingCycle: pricing.billingCycle, amountCents: pricing.amountCents })

    try {
      const payload = await requestCheckoutSession(pricing)
      state.orderId = payload.orderId || ''
      state.checkoutUrl = payload.checkoutUrl || ''
      const opened = navigatePopup(popup, state.checkoutUrl)
      state.paymentStatus = opened ? 'ready' : 'blocked'
      state.paymentMessage = opened
        ? 'Your secure Creem payment popup is open. Finish payment there and this page will remain ready behind it.'
        : 'Your browser blocked the popup. Use the button below to reopen secure payment.'
      safeTrack('checkout_redirected', { source: state.source, planId: pricing.selectionId, orderId: state.orderId, popupMode: opened ? 'auto' : 'manual' })
    } catch (error) {
      state.paymentStatus = 'error'
      state.paymentMessage = 'Checkout is not available yet. Please try again in a moment.'
      safeTrack('checkout_start_failed', { source: state.source, planId: pricing.selectionId, message: error instanceof Error ? error.message : 'Checkout failed' })
      try { if (popup && !popup.closed) popup.close() } catch {}
    } finally {
      state.requestInFlight = false
      render()
    }
  }

  function handleCheckoutMessage(event) {
    if (event.origin !== window.location.origin) return
    if (!event.data || event.data.type !== 'veovido-checkout-result') return
    if (event.data.status === 'success') {
      const orderId = String(event.data.orderId || '')
      const alreadyCompleted = orderId ? completedOrderIds.has(orderId) : false
      if (orderId) completedOrderIds.add(orderId)
      state.orderId = orderId
      state.paymentStatus = 'success'
      state.paymentMessage = ''
      state.checkoutUrl = ''
      state.requestInFlight = false
      clearPopupMonitor()
      closeModal()
      if (!alreadyCompleted) safeTrack('payment_completed', { source: state.source, orderId: orderId })
      window.location.href = '/'
    }
  }

  function handlePopupReturn() {
    const params = new URLSearchParams(window.location.search)
    const checkoutStatus = params.get('checkout')
    if (!checkoutStatus) return false
    const payload = {
      type: 'veovido-checkout-result',
      status: checkoutStatus,
      orderId: params.get('order') || '',
      planId: params.get('plan') || '',
    }
    if (window.opener && window.opener !== window) {
      try {
        window.opener.postMessage(payload, window.location.origin)
        if (checkoutStatus === 'success') {
          window.close()
          return true
        }
      } catch {}
    }
    if (checkoutStatus === 'success') {
      safeTrack('payment_completed', { source: 'direct_return', orderId: payload.orderId, planId: payload.planId })
      window.history.replaceState({}, document.title, '/')
    }
    return true
  }

  function renderPriceGroup(amountTargets, periodTargets, noteTargets, pricing) {
    amountTargets.forEach(function (node) {
      node.textContent = pricing.displayAmount.replace('$', '').replace(/\.00$/, '')
    })
    periodTargets.forEach(function (node) { node.textContent = pricing.displayPeriod })
    noteTargets.forEach(function (node) { node.textContent = pricing.sectionNote })
  }

  function formatSelectionTitle(pricing) {
    if (pricing.plan.oneTime) return pricing.plan.name + ' - Single generation'
    return pricing.plan.name + ' - ' + (pricing.billingCycle === 'annual' ? 'Yearly' : 'Monthly')
  }

  function render() {
    const pricing = getPricing(state.selectedPlanId, state.billingCycle)
    elements.billingButtons.forEach(function (button) {
      const isActive = button.getAttribute('data-billing-option') === state.billingCycle
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', String(isActive))
    })
    Object.keys(planCatalog).forEach(function (planId) {
      const planPricing = getPricing(planId, state.billingCycle)
      renderPriceGroup(elements.sectionPriceAmount[planId] || [], elements.sectionPricePeriod[planId] || [], elements.sectionPriceNote[planId] || [], planPricing)
      renderPriceGroup(elements.modalPriceAmount[planId] || [], elements.modalPricePeriod[planId] || [], elements.modalPriceNote[planId] || [], planPricing)
      ;(elements.pricingCards[planId] || []).forEach(function (card) { card.classList.toggle('is-selected', planId === state.selectedPlanId) })
      ;(elements.modalPlanCards[planId] || []).forEach(function (card) { card.classList.toggle('is-selected', planId === state.selectedPlanId) })
    })
    if (elements.selectionTitle) elements.selectionTitle.textContent = formatSelectionTitle(pricing)
    if (elements.selectionNote) elements.selectionNote.textContent = pricing.selectionNote
    if (elements.paymentPlan) elements.paymentPlan.textContent = formatSelectionTitle(pricing)
    if (elements.paymentBilling) elements.paymentBilling.textContent = pricing.paymentBilling
    if (elements.paymentDiscount) elements.paymentDiscount.textContent = pricing.discountLabel
    if (elements.paymentProvider) elements.paymentProvider.textContent = 'Secure Creem popup'
    if (elements.paymentStatus) elements.paymentStatus.textContent = state.paymentMessage || 'Preparing your checkout session.'
    if (elements.paymentLink) {
      if (state.checkoutUrl) {
        elements.paymentLink.hidden = false
        elements.paymentLink.href = state.checkoutUrl
      } else {
        elements.paymentLink.hidden = true
        elements.paymentLink.removeAttribute('href')
      }
    }
  }

  function collectByPlanAttribute(selector, attributeName) {
    const map = {}
    document.querySelectorAll(selector).forEach(function (node) {
      const key = node.getAttribute(attributeName)
      if (!key) return
      if (!map[key]) map[key] = []
      map[key].push(node)
    })
    return map
  }

  function initializeElements() {
    elements.overlay = document.getElementById('launch-modal')
    if (!elements.overlay) return false
    elements.steps = Array.from(document.querySelectorAll('[data-launch-step]'))
    elements.billingButtons = Array.from(document.querySelectorAll('[data-billing-option]'))
    elements.sectionPriceAmount = collectByPlanAttribute('[data-plan-price-amount]', 'data-plan-price-amount')
    elements.sectionPricePeriod = collectByPlanAttribute('[data-plan-price-period]', 'data-plan-price-period')
    elements.sectionPriceNote = collectByPlanAttribute('[data-plan-price-note]', 'data-plan-price-note')
    elements.modalPriceAmount = collectByPlanAttribute('[data-modal-price-amount]', 'data-modal-price-amount')
    elements.modalPricePeriod = collectByPlanAttribute('[data-modal-price-period]', 'data-modal-price-period')
    elements.modalPriceNote = collectByPlanAttribute('[data-modal-price-note]', 'data-modal-price-note')
    elements.pricingCards = collectByPlanAttribute('[data-pricing-plan]', 'data-pricing-plan')
    elements.modalPlanCards = collectByPlanAttribute('[data-modal-plan]', 'data-modal-plan')
    elements.selectionTitle = document.querySelector('[data-selection-title]')
    elements.selectionNote = document.querySelector('[data-selection-note]')
    elements.continueButton = document.querySelector('[data-launch-continue]')
    elements.paymentPlan = document.querySelector('[data-payment-plan]')
    elements.paymentBilling = document.querySelector('[data-payment-billing]')
    elements.paymentDiscount = document.querySelector('[data-payment-discount]')
    elements.paymentProvider = document.querySelector('[data-payment-provider]')
    elements.paymentStatus = document.querySelector('[data-payment-status]')
    elements.paymentLink = document.querySelector('[data-payment-link]')
    return true
  }

  function attachEvents() {
    document.querySelectorAll('[data-launch-open], [data-pricing-action]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        openPricingModal({
          source: button.getAttribute('data-launch-source') || button.getAttribute('data-pricing-source') || 'cta',
          planId: button.getAttribute('data-launch-plan') || button.getAttribute('data-pricing-action') || defaultPlanId,
          billingCycle: button.getAttribute('data-launch-billing') || defaultBillingCycle,
        })
      })
    })
    document.querySelectorAll('[data-launch-close]').forEach(function (button) { button.addEventListener('click', closeModal) })
    elements.overlay.addEventListener('click', function (event) { if (event.target === elements.overlay) closeModal() })
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && state.modalOpen) closeModal() })
    elements.billingButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        state.billingCycle = button.getAttribute('data-billing-option') === 'monthly' ? 'monthly' : 'annual'
        render()
      })
    })
    document.querySelectorAll('[data-modal-plan], [data-pricing-plan]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.selectedPlanId = button.getAttribute('data-modal-plan') || button.getAttribute('data-pricing-plan') || defaultPlanId
        render()
      })
    })
    if (elements.continueButton) elements.continueButton.addEventListener('click', startCheckoutFlow)
    const backButton = document.querySelector('[data-launch-back]')
    if (backButton) backButton.addEventListener('click', function () { state.paymentStatus = 'idle'; setStep('plans'); render() })
    if (elements.paymentLink) {
      elements.paymentLink.addEventListener('click', function () {
        safeTrack('checkout_redirected', { source: state.source, planId: getPricing(state.selectedPlanId, state.billingCycle).selectionId, popupMode: 'manual_reopen' })
      })
    }
    window.addEventListener('message', handleCheckoutMessage)
  }

  if (!initializeElements()) return
  setStep('plans')
  elements.overlay.hidden = true
  attachEvents()
  handlePopupReturn()
  render()
})()
