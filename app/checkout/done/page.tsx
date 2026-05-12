import type { Metadata } from "next";
import CheckoutDoneBridge from "@/components/CheckoutDoneBridge";

export const metadata: Metadata = {
  title: "Checkout Complete",
  robots: { index: false, follow: false },
};

export default function CheckoutDonePage() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#071019] px-4 text-center">
      <CheckoutDoneBridge />
      <div className="max-w-md rounded-lg border border-white/10 bg-[#091622] p-8">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-lime-300 text-lg font-black text-slate-950">
          OK
        </div>
        <h1 className="mt-5 text-2xl font-black text-white">Payment complete</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Returning you to GeoBase. The original page will refresh automatically.
        </p>
      </div>
    </main>
  );
}
