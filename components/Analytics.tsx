"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    geobaseTrack?: (name: string, metadata?: Record<string, unknown>) => void;
  }
}

type AnalyticsEvent = {
  id: string;
  name: string;
  path: string;
  occurredAt: string;
  visitorId: string;
  sessionId: string;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  metadata: Record<string, unknown>;
};

const visitorKey = "geobase-analytics-visitor";
const sessionKey = "geobase-analytics-session";
const queueKey = "geobase-analytics-queue";

let queue: AnalyticsEvent[] = [];
let flushTimer: number | null = null;

function makeId(prefix: string) {
  try {
    return `${prefix}_${crypto.randomUUID()}`;
  } catch {
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

function getStoredId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
  if (existing) return existing;
  const next = makeId(prefix);
  if (key === visitorKey) window.localStorage.setItem(key, next);
  else window.sessionStorage.setItem(key, next);
  return next;
}

function currentAttribution() {
  const params = new URLSearchParams(window.location.search);
  let referrerHost: string | null = null;
  if (document.referrer) {
    try {
      referrerHost = new URL(document.referrer).hostname;
    } catch {
      referrerHost = null;
    }
  }
  return {
    referrerHost,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
}

function loadQueue() {
  try {
    const saved = window.localStorage.getItem(queueKey);
    queue = saved ? JSON.parse(saved) : [];
  } catch {
    queue = [];
  }
}

function saveQueue() {
  try {
    window.localStorage.setItem(queueKey, JSON.stringify(queue.slice(-80)));
  } catch {}
}

async function flushAnalytics(useBeacon = false) {
  if (!queue.length) return;
  const events = queue.splice(0, 40);
  saveQueue();
  const payload = JSON.stringify({ events });

  if (useBeacon && navigator.sendBeacon) {
    const sent = navigator.sendBeacon("/api/analytics/events", new Blob([payload], { type: "application/json" }));
    if (sent) return;
  }

  try {
    const response = await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
    if (!response.ok) queue.unshift(...events);
  } catch {
    queue.unshift(...events);
  } finally {
    saveQueue();
  }
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    void flushAnalytics(false);
  }, 1200);
}

function trackEvent(name: string, metadata: Record<string, unknown> = {}) {
  const visitorId = getStoredId(visitorKey, "visitor");
  const sessionId = getStoredId(sessionKey, "session");
  queue.push({
    id: makeId("event"),
    name,
    path: `${window.location.pathname}${window.location.search}`,
    occurredAt: new Date().toISOString(),
    visitorId,
    sessionId,
    ...currentAttribution(),
    metadata,
  });
  saveQueue();
  scheduleFlush();
}

export default function Analytics() {
  useEffect(() => {
    loadQueue();
    window.geobaseTrack = trackEvent;
    trackEvent("page_view", { title: document.title });

    const flushOnHide = () => {
      if (document.visibilityState === "hidden") void flushAnalytics(true);
    };
    const flushOnPageHide = () => {
      void flushAnalytics(true);
    };

    document.addEventListener("visibilitychange", flushOnHide);
    window.addEventListener("pagehide", flushOnPageHide);

    return () => {
      document.removeEventListener("visibilitychange", flushOnHide);
      window.removeEventListener("pagehide", flushOnPageHide);
      if (window.geobaseTrack === trackEvent) delete window.geobaseTrack;
    };
  }, []);

  return null;
}
