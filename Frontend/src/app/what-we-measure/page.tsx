import { WhatThisMeasures } from "@/components/what-this-measures";
import Link from "next/link";

export const metadata = {
  title: "What PongAI measures — PongAI",
  description: "A clear breakdown of what PongAI can and cannot detect from body pose alone.",
};

export default function WhatWeMeasurePage() {
  return (
    <main id="main" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10"
        >
          ← Back to home
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">What PongAI measures</h1>
          <p className="mt-3 text-slate-500 leading-relaxed max-w-xl">
            A measurement you cannot trust is worse than one you do not have.
            Here is exactly what PongAI can detect, what it cannot, and the
            conditions it works best in.
          </p>
        </div>

        <WhatThisMeasures defaultOpen />
      </div>
    </main>
  );
}