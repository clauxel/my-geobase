import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for GeoBase.",
  alternates: { canonical: "https://geobase.online/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#061116] py-16 md:py-20">
      <article className="mx-auto max-w-3xl px-4 text-slate-300 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Privacy</p>
        <h1 className="mt-4 text-4xl font-black text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Effective date: May 12, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7">
          <section>
            <h2 className="text-xl font-black text-white">1. Scope</h2>
            <p className="mt-3">
              This policy explains how GeoBase collects, uses, and protects information when visitors use
              geobase.online, request checkout, or submit business data for AI visibility monitoring and reporting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">2. Information We Process</h2>
            <p className="mt-3">
              We may process contact details, account information, brand names, domains, competitor names, tracked
              terms, submitted URLs, page audit inputs, first-party analytics events, payment status, support messages,
              and service usage data. Payment details are processed by Polar or another payment processor; GeoBase does
              not store full card numbers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">3. How Information Is Used</h2>
            <p className="mt-3">
              Information is used to provide the service, operate checkout, monitor AI answer visibility, generate page
              diagnostics and reports, estimate attribution, prevent abuse, improve product quality, respond to support
              requests, comply with law, and enforce agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">4. Sharing</h2>
            <p className="mt-3">
              We share information only with vendors needed to operate hosting, payments, analytics, security, support,
              and communications, or when required by law, legal process, safety, security, merger, acquisition, or
              enforcement of rights. We do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">5. Customer Data and Public Sources</h2>
            <p className="mt-3">
              Customers are responsible for ensuring they have the right to submit URLs, brand data, competitor names,
              analytics events, and any business information they provide. Public web and AI visibility observations may
              be processed to generate aggregate reports and service diagnostics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">6. Security and Retention</h2>
            <p className="mt-3">
              We use reasonable technical and organizational safeguards. No internet service can be guaranteed perfectly
              secure. We retain information only as long as needed for service, legal, security, billing, dispute,
              backup, and business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">7. Your Choices</h2>
            <p className="mt-3">
              You may request access, correction, deletion, or export where applicable by contacting
              support@aigeamy.com. Some information may be retained when required for security, billing, dispute
              resolution, fraud prevention, backups, or legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">8. Contact</h2>
            <p className="mt-3">Questions about privacy can be sent to support@aigeamy.com.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
