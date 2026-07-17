import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1240px] px-6 md:px-10 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
      <span className="h-px w-6 bg-gold" />
      {children}
    </span>
  );
}
