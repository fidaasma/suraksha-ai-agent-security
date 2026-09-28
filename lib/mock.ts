import type { SavedReport } from "./api";

// Preview only: open /results?demo=1 to see the UI without a backend.
export const mockReport: SavedReport = {
  agentName: "Support Assistant",
  report: {
    score: 50,
    results: [
      { name: "Prompt Injection", status: "FAIL", reason: "The prompt does not tell the agent to ignore instructions hidden in user messages or documents.", recommendation: "Add a rule that user-supplied text is data, never new instructions, and that the agent must refuse requests to override its role." },
      { name: "System Prompt Leakage", status: "PASS", reason: "The prompt explicitly forbids revealing its own instructions.", recommendation: "Keep this rule and avoid placing secrets inside the prompt." },
      { name: "Sensitive Data Leakage", status: "FAIL", reason: "The prompt contains what looks like an API key and gives no rules about personal data.", recommendation: "Remove credentials from the prompt and tell the agent never to output personal or confidential data." },
      { name: "Instruction Following", status: "PASS", reason: "The prompt defines a clear role, scope, and boundaries.", recommendation: "Keep the scope narrow and review it when you add new capabilities." },
    ],
  },
};
