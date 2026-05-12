"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { MouseEvent } from "react";

const querySets = {
  "B2B SaaS": {
    citations: 148,
    share: 32,
    lift: 19,
    prompt: "best generative engine optimization tool for software brands",
  },
  Ecommerce: {
    citations: 96,
    share: 21,
    lift: 14,
    prompt: "which skincare brand is most trusted by AI answers",
  },
  "Global Brand": {
    citations: 231,
    share: 41,
    lift: 27,
    prompt: "enterprise answer engine optimization software comparison",
  },
};

function trackEvent(name: string, metadata: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") window.geobaseTrack?.(name, metadata);
}

export default function PricingHero() {
  const [brand, setBrand] = useState("Acme Cloud");
  const [termCount, setTermCount] = useState(50);
  const [segment, setSegment] = useState<keyof typeof querySets>("B2B SaaS");

  function choosePlan(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    trackEvent("cta_clicked", { location: "hero_primary" });
    window.dispatchEvent(
      new CustomEvent("geobase:choose-plan", {
        detail: { plan: "growth", billing: "annual", source: "hero" },
      }),
    );
  }

  const model = useMemo(() => {
    const data = querySets[segment];
    const scale = termCount / 50;
    return {
      ...data,
      citations: Math.round(data.citations * scale),
      competitorGap: Math.max(8, Math.round((100 - data.share) * 0.42)),
      attributedSessions: Math.round((data.citations * scale * 18) / 2),
    };
  }, [segment, termCount]);

  return (
    <section className="relative overflow-hidden bg-[#061116]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
        <div className="flex flex-col text-center lg:pt-1 lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 self-center rounded-md border border-cyan-200/25 bg-cyan-300/10 px-3 py-1.5 text-sm font-semibold text-cyan-50 lg:self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            AI citation visibility for modern search
          </div>
          <h1 className="text-4xl font-black leading-[1.04] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Generative Engine Optimization that proves where AI answers cite you
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-slate-300 sm:text-xl lg:mx-0">
            GeoBase tracks brand and product citations across AI answer engines, diagnoses why pages are or are not
            citable, and turns answer engine optimization work into measurable sessions and conversions.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#pricing"
              onClick={choosePlan}
              className="rounded-md bg-cyan-300 px-7 py-4 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:bg-emerald-300"
            >
              Choose Growth annual
            </a>
            <Link
              href="/generative-engine-optimization-examples"
              onClick={() => trackEvent("cta_clicked", { location: "hero_examples" })}
              className="rounded-md border border-white/15 px-7 py-4 text-base font-semibold text-slate-100 transition hover:border-cyan-100/50 hover:bg-white/5"
            >
              See citation examples
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-4 text-center lg:text-left">
            {[
              ["3 engines", "ChatGPT Search, Perplexity, AI Overviews"],
              ["50 terms", "Growth plan default"],
              ["50% off", "annual selected first"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-white md:text-3xl">{value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="tracker" className="relative">
          <div className="dashboard-shadow overflow-hidden rounded-lg border border-white/10 bg-[#091a21]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="text-xs font-semibold text-cyan-100">AI visibility command center</div>
              <div className="text-xs text-slate-500">Live sample</div>
            </div>

            <div className="grid gap-5 p-4 md:p-5">
              <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="rounded-lg border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">AI citations</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-black text-white">{model.citations}</span>
                    <span className="pb-2 text-sm text-slate-400">last 30 days</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3">
                      <div className="text-2xl font-black text-emerald-200">{model.share}%</div>
                      <div className="text-xs text-slate-400">share of answers</div>
                    </div>
                    <div className="rounded-md border border-amber-300/25 bg-amber-300/10 p-3">
                      <div className="text-2xl font-black text-amber-200">+{model.lift}%</div>
                      <div className="text-xs text-slate-400">qualified traffic</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {brand || "Your brand"} is under-cited on {model.competitorGap} commercial answer patterns. The
                    next move is a stronger evidence block and FAQ schema on comparison pages.
                  </p>
                </div>

                <div className="relative min-h-[285px] overflow-hidden rounded-lg border border-white/10 bg-slate-950">
                  <Image
                    src="/assets/geobase-ai-visibility-dashboard.png"
                    alt="GeoBase dashboard showing AI citation tracking and competitor answer visibility"
                    width={1536}
                    height={864}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/55 p-5 md:grid-cols-3">
                <label className="grid gap-3">
                  <span className="text-sm font-semibold text-white">Brand or product</span>
                  <input
                    className="h-10 rounded-md border border-white/10 bg-[#061116] px-3 text-sm text-white outline-none focus:border-cyan-200"
                    value={brand}
                    onChange={(event) => {
                      setBrand(event.target.value);
                      trackEvent("tracker_changed", { field: "brand" });
                    }}
                  />
                </label>
                <label className="grid gap-3">
                  <span className="text-sm font-semibold text-white">Tracking terms: {termCount}</span>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={termCount}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setTermCount(value);
                      trackEvent("tracker_changed", { field: "terms", value });
                    }}
                  />
                </label>
                <label className="grid gap-3">
                  <span className="text-sm font-semibold text-white">Market motion</span>
                  <select
                    className="h-10 rounded-md border border-white/10 bg-[#061116] px-3 text-sm text-white outline-none focus:border-cyan-200"
                    value={segment}
                    onChange={(event) => {
                      const value = event.target.value as keyof typeof querySets;
                      setSegment(value);
                      trackEvent("tracker_changed", { field: "segment", value });
                    }}
                  >
                    {Object.keys(querySets).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#061116] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Prompt being monitored
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-200">{model.prompt}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-right">
                    <div>
                      <p className="text-xl font-black text-white">{model.attributedSessions}</p>
                      <p className="text-xs text-slate-500">sessions estimated</p>
                    </div>
                    <div>
                      <p className="text-xl font-black text-white">{model.competitorGap}</p>
                      <p className="text-xs text-slate-500">open citation gaps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
