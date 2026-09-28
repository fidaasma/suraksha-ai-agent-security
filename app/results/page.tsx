"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { REPORT_KEY, type SavedReport } from "@/lib/api";
import { mockReport } from "@/lib/mock";

function verdict(score: number) {
  if (score >= 80) return { label: "Strong", color: "bg-pass" };
  if (score >= 50) return { label: "Needs work", color: "bg-saffron" };
  return { label: "At risk", color: "bg-fail" };
}

export default function ResultsPage() {
  const [saved, setSaved] = useState<SavedReport | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1") {
      setSaved(mockReport);
    } else {
      try {
        const raw = sessionStorage.getItem(REPORT_KEY);
        if (raw) setSaved(JSON.parse(raw));
      } catch {}
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!saved) {
    return (
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">No report yet</h1>
        <p className="mt-3 text-muted">Run a security test to see your agent&rsquo;s report here.</p>
        <Link href="/test" className="btn btn-primary mt-6">Start Security Test</Link>
      </div>
    );
  }

  const { agentName, report } = saved;
  const score = Math.max(0, Math.min(100, Math.round(report.score)));
  const passed = report.results.filter((r) => r.status === "PASS").length;
  const failed = report.results.length - passed;
  const v = verdict(score);

  return (
    <div>
      <p className="text-muted">Security report for</p>
      <h1 className="text-3xl font-bold tracking-tight break-words">{agentName}</h1>

      <section aria-label="Summary" className="mt-8 rounded-lg border border-line bg-white p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-muted">Overall security score</p>
            <p className="text-5xl font-bold">{score}<span className="text-2xl text-muted"> / 100</span></p>
          </div>
          <p className="text-lg font-semibold">{v.label}</p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label="Security score">
          <div className={`h-full ${v.color}`} style={{ width: `${score}%` }} />
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-md bg-passbg p-4"><dt className="text-sm text-pass">Passed</dt><dd className="text-2xl font-bold text-pass">{passed}</dd></div>
          <div className="rounded-md bg-failbg p-4"><dt className="text-sm text-fail">Failed</dt><dd className="text-2xl font-bold text-fail">{failed}</dd></div>
        </dl>
      </section>

      <ul className="mt-8 space-y-4">
        {report.results.map((r) => {
          const ok = r.status === "PASS";
          return (
            <li key={r.name} className="rounded-lg border border-line bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{r.name}</h2>
                <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${ok ? "bg-passbg text-pass" : "bg-failbg text-fail"}`}>
                  {ok ? "✓ PASS" : "✗ FAIL"}
                </span>
              </div>
              <p className="mt-3"><span className="font-semibold">Reason: </span><span className="text-muted">{r.reason}</span></p>
              <p className="mt-2"><span className="font-semibold">Recommendation: </span><span className="text-muted">{r.recommendation}</span></p>
            </li>
          );
        })}
      </ul>

      <Link href="/test" className="btn btn-secondary mt-8">Run Another Test</Link>
    </div>
  );
}
