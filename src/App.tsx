import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./lib/ScrollToTop";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { CorridorScene } from "./scenes/CorridorScene";
import { GateScene } from "./scenes/GateScene";
import { RoomPlaceholder } from "./scenes/RoomPlaceholder";
import { SoundToggle } from "./scenes/SoundToggle";
import { Servizi } from "./pages/Servizi";
import { Risultati } from "./pages/Risultati";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Contatti } from "./pages/Contatti";
import { NotFound } from "./pages/NotFound";

// The corridor walkthrough (home, portal junction, and its three rooms) is a
// full-bleed cinematic experience — the marketing chrome stays out of the way there.
const IMMERSIVE_ROUTES = [/^\/$/, /^\/portale(\/.*)?$/];

function App() {
  useSmoothScroll();
  const location = useLocation();
  const immersive = IMMERSIVE_ROUTES.some((re) => re.test(location.pathname));

  return (
    <>
      <div className="noise-overlay" />
      <ScrollToTop />
      {!immersive && <Navbar />}
      {immersive && <SoundToggle />}
      <main>
        <Routes>
          <Route path="/" element={<CorridorScene />} />
          <Route path="/portale" element={<GateScene />} />
          <Route path="/portale/:doorId" element={<RoomPlaceholder />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/risultati" element={<Risultati />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!immersive && <Footer />}
    </>
  );
}

export default App;
