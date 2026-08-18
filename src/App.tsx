import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./lib/ScrollToTop";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { Home } from "./pages/Home";
import { Servizi } from "./pages/Servizi";
import { Risultati } from "./pages/Risultati";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Contatti } from "./pages/Contatti";
import { NotFound } from "./pages/NotFound";
import { RistoranteDemo } from "./pages/demo/Ristorante";

function App() {
  useSmoothScroll();

  // Le pagine demo (es. /demo/ristorante) sono template dimostrativi con una
  // propria identità visiva: non usano navbar/footer di Will Agency.
  const { pathname } = useLocation();
  const isDemoPage = pathname.startsWith("/demo/");

  return (
    <>
      {!isDemoPage && <div className="noise-overlay" />}
      <ScrollToTop />
      {!isDemoPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/risultati" element={<Risultati />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/demo/ristorante" element={<RistoranteDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDemoPage && <Footer />}
    </>
  );
}

export default App;
