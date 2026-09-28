export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden="true">
        <path d="M14 1 26 6v9c0 8-5.2 13.4-12 16C7.2 28.4 2 23 2 15V6L14 1Z" fill="#12233D" />
        <path d="m9 16 3.600 3.600L19.500 12" stroke="#E39A0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-bold tracking-tight">Suraksha</span>
    </span>
  );
}
