import Link from "next/link";

const checks = [
  ["Prompt Injection", "Can a user message override your agent's rules?"],
  ["System Prompt Leakage", "Will the agent reveal its own instructions?"],
  ["Sensitive Data Leakage", "Does the prompt expose secrets or personal data?"],
  ["Instruction Following", "Are the agent's role and limits clear enough to hold?"],
];

export default function Home() {
  return (
    <div>
      <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">AI Agent Security Checker</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Paste your agent&rsquo;s system prompt and Suraksha checks it for common security weaknesses.
        You get a score, plain-language reasons, and a fix for every failed check.
      </p>
      <Link href="/test" className="btn btn-primary mt-8">Start Security Test</Link>

      <h2 className="mt-16 text-xl font-semibold">What Suraksha checks</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {checks.map(([name, desc]) => (
          <li key={name} className="rounded-lg border border-line bg-white p-5">
            <h3 className="font-semibold">{name}</h3>
            <p className="mt-1.5 text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
