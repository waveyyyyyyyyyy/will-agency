export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#FFC107" />
        <path
          d="M13 20L22 44L32 26L42 44L51 20"
          stroke="#0A0A0A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
        WILL<span className="text-gold">.</span>AGENCY
      </span>
    </span>
  );
}
