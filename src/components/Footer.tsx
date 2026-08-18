import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink pt-20">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">
              Trasformiamo attività locali in brand riconoscibili attraverso strategia,
              contenuti e dati. Nessun contenuto senza uno scopo.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Agenzia</p>
            <nav className="mt-5 flex flex-col gap-4 text-sm text-smoke">
              <NavLink to="/servizi" className="hover:text-gold">Servizi</NavLink>
              <NavLink to="/risultati" className="hover:text-gold">Risultati</NavLink>
              <NavLink to="/chi-siamo" className="hover:text-gold">Chi Siamo</NavLink>
              <NavLink to="/contatti" className="hover:text-gold">Contatti</NavLink>
              <a href="/demo/ristorante" target="_blank" rel="noreferrer" className="hover:text-gold">
                Esempio: sito Ristorante ↗
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Contatti</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-smoke">
              <a href="mailto:info@willmarketingagency.com" className="hover:text-gold">
                info@willmarketingagency.com
              </a>
              <a href="tel:+393515952825" className="hover:text-gold">
                +39 351 595 2825
              </a>
              <span>Italia</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Social</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-smoke">
              <a
                href="https://instagram.com/willmarketingagency"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@willmarketingagency"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-xs text-smoke md:flex-row">
          <span>© {new Date().getFullYear()} Will Marketing Agency. Tutti i diritti riservati.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Studiato, prodotto e misurato in Italia.
          </span>
        </div>
      </Container>
    </footer>
  );
}
