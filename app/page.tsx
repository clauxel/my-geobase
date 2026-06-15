import Link from "next/link";
import PricingHero from "@/components/PricingHero";
import PricingSection from "@/components/PricingSection";

const capabilities = [
  [
    "AI citation tracking",
    "Monitor how often your brand, products, pages, and competitors are cited in ChatGPT Search, Perplexity, and Google AI Overviews.",
  ],
  [
    "Citable-page diagnostics",
    "Score page structure, entity clarity, author signals, references, schema, and answer-ready formatting before content ships.",
  ],
  [
    "Competitor visibility comparison",
    "Rank competing brands by answer presence, quoted sources, page types, and commercial prompt coverage.",
  ],
  [
    "Content optimization suggestions",
    "Generate specific fixes for answer blocks, FAQs, comparison tables, citations, glossary sections, and schema markup.",
  ],
  [
    "AI search attribution",
    "Estimate sessions and conversions from AI answer engines with first-party events, referrer patterns, and citation trend data.",
  ],
  [
    "Weekly and monthly reports",
    "Create board-ready trend reports showing citation quality, visibility lift, open gaps, and the next pages to improve.",
  ],
];

const workflow = [
  ["Track", "Watch brand mentions, source citations, and answer share for the prompts your buyers actually use."],
  ["Diagnose", "Find why an answer engine can trust one page and ignores another."],
  ["Improve", "Rewrite structure, FAQ blocks, source references, and schema around measurable gaps."],
  ["Attribute", "Connect citation movement to sessions, signups, pipeline, and conversion signals."],
];

const evidencePatterns = [
  [
    "Mention without source",
    "An answer names the brand but links to a competitor page. Treat the mention as awareness, then build the missing source page or evidence section.",
    "Track mention, linked citation, cited competitor, and follow-up session separately.",
  ],
  [
    "Clear page, weak evidence",
    "The page explains the product well but has no dated data, comparison table, author context, or methodology that an answer engine can safely quote.",
    "Add a citable evidence block, update date, limitation note, and schema that matches visible content.",
  ],
  [
    "Citation lift without pipeline",
    "A page earns more source citations but does not change qualified visits or checkout starts. The next fix is the journey, not another glossary page.",
    "Compare citation trend, landing page path, CTA clicks, assisted sessions, and conversion quality.",
  ],
];

const faq = [
  [
    "Is GeoBase only for SEO teams?",
    "No. SEO teams use it daily, but product marketing, demand generation, PR, and executive teams need the same AI visibility evidence.",
  ],
  [
    "Do you scrape private AI accounts?",
    "No. GeoBase focuses on permitted public and user-provided checks, first-party analytics, and citation monitoring workflows designed for business reporting.",
  ],
  [
    "Why is Growth selected by default?",
    "Most brands need competitor context to prioritize work. Growth includes the competitor visibility layer and enough tracked terms to catch real answer patterns.",
  ],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GeoBase",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://geobase.online",
  description:
    "Generative engine optimization and answer engine optimization software for AI citation tracking, citable-page diagnostics, competitor visibility, and AI search attribution.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "99", priceCurrency: "USD" },
    { "@type": "Offer", name: "Growth", price: "249", priceCurrency: "USD" },
    { "@type": "Offer", name: "Agency", price: "599", priceCurrency: "USD" },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PricingHero />

      <section id="diagnostics" className="border-t border-white/10 bg-[#091a21] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Answer-ready pages</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
                The answer engine gap is usually structural, not just editorial
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-400">
                GeoBase connects citation tracking with page-level recommendations so teams can see which evidence,
                entity signals, formats, and trust markers make a page easier for AI answers to reference.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map(([title, description]) => (
                <article key={title} className="rounded-lg border border-white/10 bg-[#061116] p-6">
                  <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300" />
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#061116] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Operating loop</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              A practical GEO workflow from visibility to conversion
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {workflow.map(([title, text], index) => (
              <article key={title} className="rounded-lg border border-white/10 bg-[#091a21] p-6">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-md bg-cyan-300 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#091a21] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(9,26,33,0.96)_52%,rgba(251,191,36,0.08))] p-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Citation quality</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                Know whether AI answers mention you, cite you, and send buyers back
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                A citation count alone is not enough. GeoBase separates brand mentions, source links, page authority,
                answer sentiment, competitor co-occurrence, and traffic estimates so teams can improve the right thing.
              </p>
              <Link
                href="/answer-engine-optimization-vs-generative-engine-optimization"
                className="mt-7 inline-flex rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white hover:border-cyan-200 hover:bg-white/5"
              >
                Compare GEO and AEO
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["$99/mo", "Starter tracking"],
                ["$249/mo", "Growth default"],
                ["$599/mo", "Agency scale"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-lg border border-white/10 bg-black/20 p-5">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="border-t border-white/10 bg-[#091a21] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Field patterns</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Three evidence patterns that make GEO content harder to copy
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {evidencePatterns.map(([title, situation, measurement], index) => (
              <article key={title} className="rounded-lg border border-white/10 bg-[#061116] p-7">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-md bg-amber-300 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="text-base font-black text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{situation}</p>
                <p className="mt-5 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100">
                  Measurement
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{measurement}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#061116] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-white">Questions before your first visibility report</h2>
          </div>
          <div className="space-y-4">
            {faq.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-white/10 bg-[#091a21] p-6">
                <h3 className="mb-2 text-sm font-bold text-white">{question}</h3>
                <p className="text-sm leading-6 text-slate-400">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
