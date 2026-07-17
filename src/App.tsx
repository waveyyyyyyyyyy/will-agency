import { Route, Routes } from "react-router-dom";
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

function App() {
  useSmoothScroll();

  return (
    <>
      <div className="noise-overlay" />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/risultati" element={<Risultati />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
