import { useState, useEffect, useRef, useCallback } from "react";
import { loadFonts, loadGSAP } from "./utils/loaders";
import { T } from "./tokens/theme";
import { Divider } from "./components/ui/Divider";
import { HeroSection } from "./components/sections/HeroSection";
import { HistorySection } from "./components/sections/HistorySection";
import { IdeologySection } from "./components/sections/IdeologySection";
import { WhyJoinSection } from "./components/sections/WhyJoinSection";
import { FormSection } from "./components/sections/FormSection";
import { SuccessScreen } from "./components/sections/SuccessScreen";
import { SplashScreen } from "./components/sections/SplashScreen";

export default function App() {
  const [screen, setScreen] = useState("splash"); // "splash" | "landing" | "success"
  const [userData, setUserData] = useState(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    loadFonts();
    loadGSAP();
  }, []);

  const scrollToForm = useCallback(() => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleFormSuccess = useCallback((data) => {
    setUserData(data);
    window.scrollTo({ top: 0, behavior: "instant" });
    setScreen("success");
  }, []);

  if (screen === "success") return <SuccessScreen userData={userData} />;

  if (screen === "splash") return <SplashScreen onComplete={() => setScreen("landing")} />;

  return (
    <div style={{ background: T.offWhite, minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        ::selection { background: ${T.red}; color: ${T.white}; }
        input::placeholder, textarea::placeholder { color: ${T.gray300}; }
        @media (max-width: 600px) {
          .form-container div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <HeroSection onCtaClick={scrollToForm} />
      <HistorySection />
      <Divider inverted />
      <IdeologySection />
      <Divider />
      <WhyJoinSection onCtaClick={scrollToForm} />
      <Divider inverted />
      <FormSection onSubmitSuccess={handleFormSuccess} formRef={formSectionRef} />
    </div>
  );
}
