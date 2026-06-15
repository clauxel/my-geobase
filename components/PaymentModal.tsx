"use client";

import { useEffect, useState } from "react";

type Billing = "monthly" | "annual";

type PaymentModalProps = {
  isOpen: boolean;
  planId: string;
  planName: string;
  billing: Billing;
  initialPopup: Window | null;
  launchKey: number;
  provider: "creem" | "nowpayments";
  closeModal: () => void;
};

function trackEvent(name: string, metadata: Record<string, string>) {
  if (typeof window !== "undefined") window.geobaseTrack?.(name, metadata);
}

function centeredPopupFeatures() {
  const width = Math.min(560, window.screen.availWidth - 32);
  const height = Math.min(760, window.screen.availHeight - 48);
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
  return `popup=yes,width=${Math.round(width)},height=${Math.round(height)},left=${Math.round(left)},top=${Math.round(
    top,
  )},resizable=yes,scrollbars=yes`;
}

function writeLoadingPage(popup: Window | null, planName: string, provider: "creem" | "nowpayments" = "creem") {
  if (!popup) return;
  try {
    popup.document.write(`<!doctype html><html><head><title>Secure checkout</title><style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;background:#071019;color:#e2e8f0;font-family:system-ui,-apple-system,Segoe UI,sans-serif}
      main{width:min(420px,calc(100vw - 32px));border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:28px;background:#091622;text-align:center}
      .dot{width:42px;height:42px;border-radius:999px;border:4px solid rgba(34,211,238,.2);border-top-color:#22d3ee;margin:0 auto 18px;animation:spin .8s linear infinite}
      h1{font-size:20px;margin:0 0 8px}p{margin:0;color:#94a3b8;line-height:1.5}@keyframes spin{to{transform:rotate(360deg)}}
    </style></head><body><main><div class="dot"></div><h1>Opening ${provider === "nowpayments" ? "USDC wallet" : "Creem"} checkout</h1><p>${planName} checkout is being prepared securely.</p></main></body></html>`);
    popup.document.close();
  } catch {}
}

export function openCheckoutShell(planName: string, provider: "creem" | "nowpayments" = "creem") {
  if (typeof window === "undefined") return null;
  const popup = window.open("", provider === "nowpayments" ? "geobase_nowpayments_checkout" : "geobase_creem_checkout", centeredPopupFeatures());
  writeLoadingPage(popup, planName, provider);
  return popup;
}

export default function PaymentModal({
  isOpen,
  planId,
  planName,
  billing,
  initialPopup,
  launchKey,
  provider,
  closeModal,
}: PaymentModalProps) {
  const [status, setStatus] = useState<"opening" | "opened" | "error">("opening");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "geobase-checkout-complete") {
        trackEvent("checkout_success_return", { plan: planId, billing });
        closeModal();
        window.location.href = "/";
      }
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = "";
    };
  }, [billing, closeModal, isOpen, planId]);

  useEffect(() => {
    if (!isOpen || !launchKey) return;
    let cancelled = false;
    const popup = initialPopup && !initialPopup.closed ? initialPopup : openCheckoutShell(planName, provider);

    async function createCheckout() {
      setStatus("opening");
      setCheckoutUrl("");
      setError("");
      trackEvent("checkout_requested", { plan: planId, billing, paymentProvider: provider });

      try {
        const response = await fetch(provider === "nowpayments" ? "/api/nowpayments-checkout" : "/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId, billing }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.checkoutUrl) throw new Error(payload.error || "Checkout could not be created.");
        if (cancelled) return;
        setCheckoutUrl(payload.checkoutUrl);
        if (popup && !popup.closed) popup.location.assign(payload.checkoutUrl);
        setStatus("opened");
        trackEvent("checkout_opened", { plan: planId, billing, paymentProvider: provider });
      } catch (checkoutError) {
        if (cancelled) return;
        const message =
          checkoutError instanceof Error ? checkoutError.message : "Secure checkout could not be created yet.";
        setError(message);
        setStatus("error");
        trackEvent("checkout_error", { plan: planId, billing, paymentProvider: provider });
        try {
          if (popup && !popup.closed) popup.close();
        } catch {}
      }
    }

    void createCheckout();
    return () => {
      cancelled = true;
    };
  }, [billing, initialPopup, isOpen, launchKey, planId, planName, provider]);

  if (!isOpen) return null;

  return (
    <div className="checkout-blur fixed inset-0 z-50 grid place-items-center bg-[#020617]/70 px-4 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="w-full max-w-md rounded-lg border border-white/12 bg-[#091622] p-6 text-center shadow-2xl shadow-black/40"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-cyan-300 text-lg font-black text-slate-950">
          $
        </div>
        <h2 id="checkout-title" className="mt-5 text-2xl font-black text-white">
          {provider === "nowpayments" ? "Secure USDC wallet checkout" : "Secure Creem checkout"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {status === "opening" && `Preparing ${planName} checkout in a centered payment window.`}
          {status === "opened" && "The payment window is open. This page will stay here while checkout runs."}
          {status === "error" && error}
        </p>

        <div className="mt-6 grid gap-3">
          {checkoutUrl ? (
            <a
              href={checkoutUrl}
              target="geobase_creem_checkout"
              rel="noreferrer"
              className="rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-lime-300"
            >
              Reopen checkout
            </a>
          ) : (
            <button
              type="button"
              className="rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 opacity-80"
              disabled
            >
              Creating checkout
            </button>
          )}
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Stay on pricing page
          </button>
        </div>
      </div>
    </div>
  );
}
