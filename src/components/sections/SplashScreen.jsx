import { useEffect, useRef } from "react";
import { T } from "../../tokens/theme";

const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

export const SplashScreen = ({ onComplete }) => {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBotRef = useRef(null);
  const labelRef = useRef(null);
  const taglineRef = useRef(null);
  const barRef = useRef(null);
  const barFillRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const animate = (gsap) => {
      gsap.set([logoRef.current, lineTopRef.current, lineBotRef.current, labelRef.current, taglineRef.current, barRef.current], { opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.7, rotate: -8 });
      gsap.set([lineTopRef.current, lineBotRef.current], { scaleX: 0, transformOrigin: "center" });
      gsap.set(labelRef.current, { y: 16 });
      gsap.set(taglineRef.current, { y: 12 });
      gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.timeline({ onComplete })
            .to([labelRef.current, taglineRef.current, barRef.current], { opacity: 0, y: -10, duration: 0.4, stagger: 0.06, ease: "power2.in" })
            .to([lineTopRef.current, lineBotRef.current], { scaleX: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.2")
            .to(logoRef.current, { scale: 1.15, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.3")
            .to(overlayRef.current, { scaleY: 1, duration: 0.6, ease: "power4.inOut" }, "-=0.2");
        },
      });

      tl
        .to(logoRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "expo.out", delay: 0.2 })
        .to([lineTopRef.current, lineBotRef.current], { opacity: 1, scaleX: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(barRef.current, { opacity: 1, duration: 0.3 }, "-=0.2")
        .to(barFillRef.current, { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, "-=0.1");
    };

    const run = () => {
      if (window.gsap) animate(window.gsap);
      else setTimeout(run, 50);
    };

    run();
  }, []);

  return (
    <div ref={rootRef} style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: T.redDeep,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Ruído */}
      <div style={{ position: "absolute", inset: 0, background: NOISE, pointerEvents: "none" }} />

      {/* Overlay de saída — cresce de baixo para cima */}
      <div ref={overlayRef} style={{
        position: "absolute",
        inset: 0,
        background: T.gray900,
        transformOrigin: "bottom center",
        transform: "scaleY(0)",
        zIndex: 10,
      }} />

      {/* Conteúdo central */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}>
        {/* Linha superior */}
        <div ref={lineTopRef} style={{
          width: "180px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(242,199,68,0.4), transparent)`,
          marginBottom: "36px",
        }} />

        {/* Logo */}
        <img
          ref={logoRef}
          src="/logo.png"
          alt="PCdoB"
          style={{
            width: "110px",
            height: "110px",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
            marginBottom: "36px",
          }}
        />

        {/* Nome do partido */}
        <div ref={labelRef} style={{
          fontFamily: T.fontMono,
          fontSize: "11px",
          fontWeight: 500,
          color: "rgba(242,199,68,0.7)",
          letterSpacing: "5px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}>
          Partido Comunista do Brasil
        </div>

        {/* Tagline */}
        <div ref={taglineRef} style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.18)",
          fontStyle: "italic",
          letterSpacing: "0.5px",
          marginBottom: "48px",
        }}>
          Fortalecer a Nação, lutar pelo socialismo.
        </div>

        {/* Linha inferior */}
        <div ref={lineBotRef} style={{
          width: "180px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(242,199,68,0.4), transparent)`,
          marginBottom: "40px",
        }} />

        {/* Barra de progresso */}
        <div ref={barRef} style={{
          width: "120px",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div ref={barFillRef} style={{
            position: "absolute",
            inset: 0,
            background: T.gold,
            opacity: 0.6,
          }} />
        </div>
      </div>
    </div>
  );
};
