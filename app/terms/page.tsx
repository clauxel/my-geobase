import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for GeoBase.",
  alternates: { canonical: "https://geobase.online/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-[#061116] py-16 md:py-20">
      <article className="mx-auto max-w-3xl px-4 text-slate-300 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Terms</p>
        <h1 className="mt-4 text-4xl font-black text-white">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Effective date: May 12, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7">
          <section>
            <h2 className="text-xl font-black text-white">1. Acceptance</h2>
            <p className="mt-3">
              By accessing or using GeoBase, you agree to these Terms. If you use the service for an organization, you
              represent that you have authority to bind that organization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">2. Service</h2>
            <p className="mt-3">
              GeoBase provides software-generated AI visibility monitoring, citation tracking, citable-page diagnostics,
              competitor comparisons, content recommendations, attribution estimates, and automated reports. Outputs are
              informational business decision support and are not legal, financial, accounting, tax, investment, or
              professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">3. Customer Responsibility</h2>
            <p className="mt-3">
              You are responsible for validating outputs, complying with applicable laws and platform rules, deciding
              whether to implement any recommendation, maintaining your websites and analytics configuration, and
              ensuring you have rights to submit or process any data, URLs, prompts, brand names, competitor names, or
              business information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">4. Subscriptions and Payment</h2>
            <p className="mt-3">
              Paid plans are billed through Polar or another payment processor. Annual billing may be discounted compared
              with monthly billing. Fees are non-refundable except where required by law or expressly agreed in writing.
              You authorize recurring charges for the selected plan until cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">5. Acceptable Use</h2>
            <p className="mt-3">
              You may not misuse the service, interfere with security, reverse engineer non-public systems, attempt
              unauthorized access, submit unlawful or infringing data, scrape or overload the service, use the service to
              violate third-party rights or platform rules, or misrepresent AI visibility data to customers, investors,
              regulators, or the public.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">6. Third-Party Services and AI Outputs</h2>
            <p className="mt-3">
              AI answer engines, search engines, payment processors, hosting providers, analytics tools, and other
              third-party services are outside our control. Their availability, data, ranking behavior, citations,
              answers, policies, and interfaces may change. GeoBase does not guarantee any ranking, citation, traffic,
              revenue, conversion, or legal outcome.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">7. Disclaimers</h2>
            <p className="mt-3">
              The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by law, we
              disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose,
              non-infringement, title, accuracy, uninterrupted operation, error-free performance, and availability of any
              third-party data source.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">8. Limitation of Liability</h2>
            <p className="mt-3">
              To the maximum extent permitted by law, GeoBase and its operators will not be liable for indirect,
              incidental, special, consequential, exemplary, punitive, lost-profit, lost-revenue, lost-data, business
              interruption, reputational, or procurement damages. Our total liability for any claim is limited to the
              amount you paid for the service in the three months before the event giving rise to the claim, or USD $100
              if no amount was paid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">9. Indemnity</h2>
            <p className="mt-3">
              You agree to defend, indemnify, and hold harmless GeoBase and its operators from claims, losses,
              liabilities, damages, costs, and expenses arising from your data, websites, prompts, content decisions,
              public statements, use of the service, violation of these Terms, or violation of law or third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">10. Disputes</h2>
            <p className="mt-3">
              To the maximum extent permitted by law, disputes will be resolved by binding individual arbitration under
              the Federal Arbitration Act. Class actions, class arbitration, representative actions, and jury trials are
              waived to the fullest extent permitted by law. If any part of this section is unenforceable, the remainder
              remains effective.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">11. Changes and Termination</h2>
            <p className="mt-3">
              We may update the service or these Terms, suspend or terminate access for misuse, security risk,
              non-payment, legal risk, or operational necessity, and discontinue features where needed. Continued use
              after updated Terms become effective means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">12. Contact</h2>
            <p className="mt-3">Questions about these Terms can be sent to support@aigeamy.com.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
