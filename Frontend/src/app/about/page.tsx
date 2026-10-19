import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

type Section = {
  icon: string;
  h: string;
  p: string[];
  cta?: { href: string; label: string };
  ctaImage?: string;
};

const SECTIONS: Section[] = [
  {
    icon: "01",
    h: "Mission",
    p: [
      "PongAI Coach is designed to make AI-powered table tennis coaching more accessible, supporting personalized skill development for neuro-wellness. Using body-pose analysis and temporal machine learning, it transforms ordinary match videos into structured insights about shots, rallies, stroke techniques, and player movement.",
    ],
  },
  {
    icon: "02",
    h: "From Research to SportsForEquity",
    p: [
      "PongAI Coach is built on the award-recognized KINESIS research, recognized by IEEE. Using AI-powered body-pose analysis, PongAI Coach transforms table tennis videos into movement and technique insights, supporting SportsForEquity’s mission to make personalized coaching more accessible and explore future applications in Parkinson’s neuro-wellness.",
      "",
    ],
    cta: { href: "https://sportsforequity.live", label: "Explore SportsForEquity" },
    ctaImage: "/SportsForEquity-Logo.png",
  },
  {
    icon: "03",
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
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-sm font-bold text-white shadow-sm">
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
                    <div className="mt-3 flex flex-col items-center text-center">
                      {s.ctaImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.ctaImage}
                          alt="SportsForEquity logo"
                          className="mb-2 h-[105px] w-auto"
                        />
                      ) : null}
                      <p className="text-sm">
                        <a
                          href={s.cta.href}
                          className="font-medium text-indigo-600 hover:text-indigo-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.cta.label} →
                        </a>
                      </p>
                    </div>
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