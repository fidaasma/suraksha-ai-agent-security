"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REPORT_KEY, runSecurityTest } from "@/lib/api";

export default function TestPage() {
  const router = useRouter();
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [errors, setErrors] = useState<{ agentName?: string; systemPrompt?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = agentName.trim();
    const prompt = systemPrompt.trim();

    const next: typeof errors = {};
    if (!name) next.agentName = "Enter a name for your agent.";
    else if (name.length > 80) next.agentName = "Use 80 characters or fewer.";
    if (!prompt) next.systemPrompt = "Paste the system prompt you want to test.";
    else if (prompt.length < 10) next.systemPrompt = "The prompt is too short to test. Paste the full system prompt.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setApiError("");
    setLoading(true);
    try {
      const report = await runSecurityTest({ agentName: name, systemPrompt: prompt });
      sessionStorage.setItem(REPORT_KEY, JSON.stringify({ agentName: name, report }));
      router.push("/results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Test your agent</h1>
      <p className="mt-3 text-muted">Your prompt is sent only to run this test.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <div>
          <label htmlFor="agentName" className="mb-2 block font-semibold">Agent name</label>
          <input
            id="agentName" className="field" value={agentName} placeholder="e.g. Support Assistant"
            onChange={(e) => setAgentName(e.target.value)}
            aria-invalid={!!errors.agentName} aria-describedby={errors.agentName ? "agentName-error" : undefined}
          />
          {errors.agentName && <p id="agentName-error" className="mt-2 text-sm font-medium text-fail">{errors.agentName}</p>}
        </div>

        <div>
          <label htmlFor="systemPrompt" className="mb-2 block font-semibold">System prompt</label>
          <textarea
            id="systemPrompt" className="field min-h-[220px] resize-y" value={systemPrompt}
            placeholder="Paste your agent's full system prompt here"
            onChange={(e) => setSystemPrompt(e.target.value)}
            aria-invalid={!!errors.systemPrompt} aria-describedby={errors.systemPrompt ? "systemPrompt-error" : undefined}
          />
          {errors.systemPrompt && <p id="systemPrompt-error" className="mt-2 text-sm font-medium text-fail">{errors.systemPrompt}</p>}
        </div>

        {apiError && (
          <div role="alert" className="rounded-md border border-fail bg-failbg p-4 text-fail">
            <p className="font-semibold">Test could not run</p>
            <p className="mt-1">{apiError}</p>
          </div>
        )}

        <button type="submit" disabled={loading} aria-busy={loading} className="btn btn-primary w-full sm:w-auto">
          {loading ? "Running tests…" : "Run Security Test"}
        </button>
        <p role="status" className="sr-only">{loading ? "Running security tests" : ""}</p>
      </form>
    </div>
  );
}
