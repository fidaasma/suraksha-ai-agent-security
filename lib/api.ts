// API contract for POST /api/test. The Flutter client should mirror these shapes.

export type TestStatus = "PASS" | "FAIL";

export interface TestRequest {
  agentName: string;
  systemPrompt: string;
}

export interface TestResult {
  name: string;
  status: TestStatus;
  reason: string;
  recommendation: string;
}

export interface TestResponse {
  score: number;
  results: TestResult[];
}

export async function runSecurityTest(payload: TestRequest): Promise<TestResponse> {
  let res: Response;
  try {
    res = await fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }
  if (!res.ok) {
    throw new Error(`The security test failed (error ${res.status}). Try again in a moment.`);
  }
  const data = await res.json();
  if (typeof data?.score !== "number" || !Array.isArray(data?.results)) {
    throw new Error("The server sent an unexpected response.");
  }
  return data as TestResponse;
}

// Saved between /test and /results (no database, no extra endpoints).
export const REPORT_KEY = "suraksha:report";
export interface SavedReport { agentName: string; report: TestResponse }
