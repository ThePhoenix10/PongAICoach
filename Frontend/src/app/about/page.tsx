import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

type Section = {
  icon: string;
  h: string;
  p: string[];
  cta?: { href: string; label: string };
};

const SECTIONS: Section[] = [
  {
    icon: "🎯",
    h: "Our Mission",
    p: [
      "PongAI Coach is designed to make table-tennis movement analysis more accessible, consistent, and useful. Using body-pose analysis and temporal machine learning, it turns ordinary match video into structured insights about shots, rallies, stroke families, and player movement.",
      "Our goal is to support human coaches with repeatable movement data while keeping coaching judgment and player relationships at the center.",
    ],
  },
  {
    icon: "🔬",
    h: "From Research to SportsForEquity",
    p: [
      "PongAI Coach grew out of KINESIS, an ongoing research framework for continuous table-tennis biomechanics analysis using temporal body pose.",
      "The platform is now being integrated into SportsForEquity, where it supports a community-based table-tennis program serving people with Parkinson’s disease and older adults through neuro-wellness activities. Within SportsForEquity, PongAI Coach helps bring more consistent, individualized movement feedback to real coaching settings while also creating an opportunity to evaluate the technology across different players, venues, and recording conditions.",
    ],
    cta: { href: "https://sportsforequity.live", label: "Explore SportsForEquity" },
  },
  {
    icon: "⚠️",
    h: "Important Note",
    p: [
      "PongAI is a coaching and movement-analysis system. It is not intended to diagnose, monitor, treat, or prevent any medical condition.",
    ],
  },
];

export default function Page() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {SECTIONS.map((s) => (
            <div key={s.h} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-lg shadow-sm">
                  {s.icon}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{s.h}</h2>
                  {s.p.map((para) => (
                    <p key={para} className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {s.cta ? (
                    <p className="mt-3 text-sm">
                      <a
                        href={s.cta.href}
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.cta.label} →
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}