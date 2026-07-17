export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#FFC107" />
      <path
        d="M13 20L22 44L32 26L42 44L51 20"
        stroke="#0A0A0A"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={26} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
          WILL<span className="text-gold">.</span>
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-bone">
          Marketing Agency
        </span>
      </span>
    </span>
  );
}
