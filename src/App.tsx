import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./lib/ScrollToTop";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { IntroScene } from "./scenes/IntroScene";
import { CorridorScene } from "./scenes/CorridorScene";
import { ChoiceScene } from "./scenes/ChoiceScene";
import { ElementSelector } from "./scenes/ElementSelector";
import { PathHub } from "./scenes/PathHub";
import { GemPathScene } from "./scenes/GemPathScene";
import { GemRoom } from "./scenes/GemRoom";
import { JourneyRoom } from "./scenes/JourneyRoom";
import { DisclaimerGate, hasAcknowledgedDisclaimer } from "./scenes/DisclaimerGate";
import { SoundToggle } from "./scenes/SoundToggle";
import { Servizi } from "./pages/Servizi";
import { Risultati } from "./pages/Risultati";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Contatti } from "./pages/Contatti";
import { NotFound } from "./pages/NotFound";

// The Supernova walkthrough (intro, corridor, choice, personalisation, portal
// and its five paths) is a full-bleed cinematic experience — the marketing
// chrome stays out of the way there.
const IMMERSIVE_ROUTES = [/^\/$/, /^\/ingresso$/, /^\/scegli$/, /^\/personalizza$/, /^\/portale(\/.*)?$/];

function App() {
  useSmoothScroll();
  const location = useLocation();
  const immersive = IMMERSIVE_ROUTES.some((re) => re.test(location.pathname));
  const [acknowledged, setAcknowledged] = useState(hasAcknowledgedDisclaimer);
  const gated = immersive && !acknowledged;

  return (
    <>
      <div className="noise-overlay" />
      <ScrollToTop />
      {!immersive && <Navbar />}
      {immersive && acknowledged && <SoundToggle />}
      <main>
        {gated ? (
          <DisclaimerGate onAcknowledge={() => setAcknowledged(true)} />
        ) : (
          <Routes>
            <Route path="/" element={<IntroScene />} />
            <Route path="/ingresso" element={<CorridorScene />} />
            <Route path="/scegli" element={<ChoiceScene />} />
            <Route path="/personalizza" element={<ElementSelector />} />
            <Route path="/portale" element={<PathHub />} />
            <Route path="/portale/pietre" element={<GemPathScene />} />
            <Route path="/portale/pietre/:gemId" element={<GemRoom />} />
            <Route path="/portale/galassie" element={<JourneyRoom journeyId="galassie" />} />
            <Route path="/portale/mare" element={<JourneyRoom journeyId="mare" />} />
            <Route path="/portale/montagna" element={<JourneyRoom journeyId="montagna" />} />
            <Route path="/portale/geometrico" element={<JourneyRoom journeyId="geometrico" />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/risultati" element={<Risultati />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      {!immersive && <Footer />}
    </>
  );
}

export default App;
