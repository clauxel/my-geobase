import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description:
    "GeoBase pricing for AI citation tracking, answer engine optimization diagnostics, competitor visibility, and AI search attribution. Growth annual is selected by default with 50% savings.",
  alternates: { canonical: "https://geobase.online/pricing" },
};

export default function PricingPage() {
  return (
    <main className="bg-[#061116]">
      <section className="border-b border-white/10 bg-[#091a21] py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Plans</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">GeoBase pricing</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Start with AI citation tracking, competitor visibility, page diagnostics, and attribution in one workflow.
            Growth annual is selected first and saves 50%.
          </p>
        </div>
      </section>
      <PricingSection />
    </main>
  );
}
