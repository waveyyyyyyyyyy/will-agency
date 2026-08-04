// The real Will Marketing Agency logo file (public/logo.jpg) is a single
// 1600x1600 square with the ring+W+arrow mark on top and the "WILL /
// MARKETING AGENCY" wordmark baked in below. That full square only reads
// well at large sizes — at navbar/footer scale the wordmark inside it
// turns to mush — so small placements crop in on just the mark via a
// background-position trick (no separate cropped file needed) and pair it
// with real HTML text instead.
const SOURCE_SIZE = 1600;
const CROP = { x: 375, y: 130, size: 850 }; // square region around the ring+W+arrow, measured from the source pixels

export function LogoMark({ size = 24 }: { size?: number }) {
  const scale = size / CROP.size;
  return (
    <span
      className="block shrink-0 rounded-[20%] bg-ink"
      style={{
        width: size,
        height: size,
        backgroundImage: "url(/logo.jpg)",
        backgroundSize: `${scale * SOURCE_SIZE}px ${scale * SOURCE_SIZE}px`,
        backgroundPosition: `${-scale * CROP.x}px ${-scale * CROP.y}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

// Full lockup exactly as supplied — only used where it has room to breathe
// (large brand moments), never at nav/footer scale.
export function LogoBadge({ size = 96 }: { size?: number }) {
  return (
    <img
      src="/logo.jpg"
      alt="Will Marketing Agency"
      width={size}
      height={size}
      className="rounded-[14%] object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={40} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight text-paper">
          WILL<span className="text-gold">.</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-bone">
          Marketing Agency
        </span>
      </span>
    </span>
  );
}
