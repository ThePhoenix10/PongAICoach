
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

export default function Page() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">About Us</h1>
          <p className="mt-3 text-slate-500">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}