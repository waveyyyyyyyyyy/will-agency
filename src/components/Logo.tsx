// Simplified icon (no ring) for small sizes — navbar, footer, favicon.
// The full ring badge below turns to mud under ~48px, so this variant
// crops in tighter on the W-arrow alone and uses a heavier stroke.
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" rx="40" fill="#0A0A0A" />
      <path
        d="M 38 68 L 64 140 L 90 92 L 116 140 L 172 42"
        stroke="#FFFFFF"
        strokeWidth="19"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M 181.9 24.6 L 182.2 52.4 L 157.9 38.5 Z" fill="#FFC107" />
    </svg>
  );
}

// Full badge with the broken gold ring — only legible at larger sizes
// (hero moments, brand placements), never in the nav/footer.
export function LogoBadge({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" rx="40" fill="#0A0A0A" />
      <path
        d="M 163.89 55.26 A 78 78 0 0 1 79.81 175.34"
        stroke="#FFC107"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 36.11 144.74 A 78 78 0 0 1 86.46 23.18"
        stroke="#FFC107"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 55 78 L 72 128 L 92 95 L 112 128 L 150 55"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M 158.3 39.0 L 157.9 63.6 L 138.4 53.5 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={30} />
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
