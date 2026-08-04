import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/servizi", label: "Servizi" },
  { to: "/risultati", label: "Risultati" },
  { to: "/chi-siamo", label: "Chi Siamo" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-lg" : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  isActive ? "text-gold" : "text-bone hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink
            to="/contatti"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Prenota una call
          </NavLink>
        </div>

        <button
          aria-label="Apri menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-line py-4 text-lg font-display ${isActive ? "text-gold" : "text-paper"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/contatti"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-ink"
              >
                Prenota una call
              </NavLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
