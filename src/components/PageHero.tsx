import type { ReactNode } from "react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";

export function PageHero({
  label,
  title,
  subtitle,
  children,
}: {
  label: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-44 md:pt-52">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[380px] w-[560px] rounded-full opacity-[0.14] blur-[130px]"
        style={{ background: "radial-gradient(circle, #FFC107, transparent 70%)" }}
      />
      <Container className="relative">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-display mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.05] tracking-tight text-paper md:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-7 max-w-2xl text-balance text-lg text-smoke md:text-xl">{subtitle}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
