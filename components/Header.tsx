"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

const navItems = [
  { href: "/#tracker", label: "Tracker" },
  { href: "/#diagnostics", label: "Diagnostics" },
  { href: "/pricing", label: "Pricing" },
  { href: "/generative-engine-optimization-strategies", label: "Strategies" },
];

export default function Header() {
  function choosePlan(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("geobase:choose-plan", {
        detail: { plan: "growth", billing: "annual", source: "header" },
      }),
    );
    if (!document.getElementById("pricing")) {
      window.location.href = "/pricing#choose-growth";
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061116]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="GeoBase home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-300 text-sm font-black text-slate-950">
            GB
          </span>
          <span className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">GeoBase</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/pricing"
          onClick={choosePlan}
          className="rounded-md bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-emerald-300"
        >
          Choose Growth annual
        </Link>
      </div>
    </header>
  );
}
