import Link from "next/link";
import { keywordPages } from "@/src/content/keyword-pages";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03080c]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.15fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-300 text-sm font-black text-slate-950">
              GB
            </span>
            <span className="text-base font-semibold text-white">GeoBase</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Generative engine optimization and answer engine optimization software for teams that need AI citation
            tracking, citable-page diagnostics, competitor AI visibility, and AI search attribution.
          </p>
          <p className="mt-4 text-sm text-slate-300">
            Support:{" "}
            <a className="font-semibold text-cyan-200 hover:text-emerald-200" href="mailto:support@aigeamy.com">
              support@aigeamy.com
            </a>
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Service regions: United States, Europe, and global brands.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Useful Guides</h2>
          <div className="mt-4 grid gap-2">
            {keywordPages.slice(0, 6).map((page) => (
              <Link key={page.slug} href={page.path} className="text-sm text-slate-400 hover:text-cyan-200">
                {page.keyword}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <div className="mt-4 grid gap-2">
            <Link href="/pricing" className="text-sm text-slate-400 hover:text-cyan-200">
              Pricing
            </Link>
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-cyan-200">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-400 hover:text-cyan-200">
              Terms
            </Link>
            <a
              href="https://github.com/clauxel/my-geobase"
              className="text-sm text-slate-400 hover:text-cyan-200"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        (c) 2026 GeoBase. All rights reserved.
      </div>
    </footer>
  );
}
