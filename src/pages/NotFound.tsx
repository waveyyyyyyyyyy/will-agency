import { NavLink } from "react-router-dom";
import { Container } from "../components/Container";

export function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center pt-24">
      <Container className="text-center">
        <span className="font-display text-gold text-lg">404</span>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-paper md:text-5xl">
          Questa pagina non esiste.
        </h1>
        <NavLink
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink"
        >
          Torna alla home
        </NavLink>
      </Container>
    </section>
  );
}
