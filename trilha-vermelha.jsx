import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   TRILHA VERMELHA — ICR Onboarding & Integração Funnel
   Stack: React + GSAP (via CDN) + CSS-in-JS
   ═══════════════════════════════════════════════════════════════ */

// ─── Design Tokens ───────────────────────────────────────────
const T = {
  red: "#CC1B1B",
  redDark: "#8B0000",
  redDeep: "#5C0000",
  gold: "#F2C744",
  goldLight: "#FFD95A",
  white: "#FFFFFF",
  offWhite: "#FFF8F0",
  cream: "#FDF6EC",
  gray100: "#F5F0EB",
  gray300: "#D4CCC4",
  gray600: "#6B5E54",
  gray900: "#1A1210",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'DM Sans', 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radius: "12px",
  radiusLg: "20px",
  shadow: "0 8px 32px rgba(140,0,0,0.12)",
  shadowHover: "0 12px 48px rgba(140,0,0,0.22)",
  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

// ─── GSAP Loader ─────────────────────────────────────────────
const loadGSAP = () => {
  return new Promise((resolve) => {
    if (window.gsap && window.ScrollTrigger) {
      resolve();
      return;
    }
    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.onload = () => {
      const stScript = document.createElement("script");
      stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      stScript.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve();
      };
      document.head.appendChild(stScript);
    };
    document.head.appendChild(gsapScript);
  });
};

// ─── Google Fonts Loader ─────────────────────────────────────
const loadFonts = () => {
  if (document.getElementById("trilha-fonts")) return;
  const link = document.createElement("link");
  link.id = "trilha-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
  document.head.appendChild(link);
};

// ─── Hammer & Sickle SVG Component ──────────────────────────
const HammerSickle = ({ size = 40, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={style}>
    <path d="M55 15c-16 0-30 12-33 28h18c2-8 9-14 17-14 1 0 3 0 4 1l5-13c-3-1-7-2-11-2z" />
    <path d="M20 48c0 2 0 4 1 6l32 32 8-8-28-28h24c-1-1-2-2-4-2H20z" />
    <path d="M42 62l-8 8 12 12 8-8z" />
    <path d="M58 35l-3 8c6 4 10 11 10 19 0 1 0 2 0 3l14-2c0-1 0-2 0-3 0-11-5-21-13-27l-8 2z" />
  </svg>
);

// ─── Star SVG ────────────────────────────────────────────────
const Star = ({ size = 20, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// ─── Section Divider ─────────────────────────────────────────
const Divider = ({ inverted = false }) => (
  <div style={{
    width: "100%",
    height: "80px",
    background: inverted
      ? `linear-gradient(180deg, ${T.offWhite} 0%, ${T.red} 100%)`
      : `linear-gradient(180deg, ${T.red} 0%, ${T.offWhite} 100%)`,
    position: "relative",
    overflow: "hidden",
  }}>
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <path
        d={inverted
          ? "M0,80 C300,20 900,20 1200,80 L1200,0 L0,0 Z"
          : "M0,0 C300,60 900,60 1200,0 L1200,80 L0,80 Z"
        }
        fill={inverted ? T.red : T.offWhite}
      />
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
const HeroSection = ({ onCtaClick }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: -40, opacity: 0, duration: 0.8, delay: 0.3 })
        .from(".hero-title span", { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-scroll-hint", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
      gsap.to(".hero-bg-star", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".hero-floating-element", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${T.redDeep} 0%, ${T.red} 40%, ${T.redDark} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "40px 20px",
    }}>
      {/* Background decorative elements */}
      <div className="hero-bg-star" style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        opacity: 0.04,
        pointerEvents: "none",
      }}>
        <Star size={600} color={T.white} />
      </div>
      <div className="hero-floating-element" style={{
        position: "absolute",
        top: "15%",
        left: "8%",
        opacity: 0.08,
      }}>
        <HammerSickle size={120} color={T.gold} />
      </div>
      <div className="hero-floating-element" style={{
        position: "absolute",
        bottom: "20%",
        right: "10%",
        opacity: 0.06,
      }}>
        <Star size={80} color={T.goldLight} />
      </div>
      {/* Noise overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        maxWidth: "900px",
      }}>
        <div className="hero-badge" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(242,199,68,0.12)",
          border: `1px solid rgba(242,199,68,0.25)`,
          borderRadius: "100px",
          padding: "10px 24px",
          marginBottom: "36px",
          backdropFilter: "blur(8px)",
        }}>
          <Star size={16} color={T.gold} />
          <span style={{
            fontFamily: T.fontBody,
            fontSize: "13px",
            fontWeight: 600,
            color: T.gold,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}>
            Trilha Vermelha
          </span>
          <Star size={16} color={T.gold} />
        </div>

        <h1 className="hero-title" style={{
          fontFamily: T.fontDisplay,
          color: T.white,
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          margin: "0 0 28px 0",
          letterSpacing: "-1px",
        }}>
          <span style={{ display: "block" }}>Faça parte da</span>
          <span style={{ display: "block", position: "relative" }}>
            <span style={{ color: T.gold }}>nossa história</span>
            <svg style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", width: "80%", height: "12px" }} viewBox="0 0 300 12">
              <path d="M5 8 Q75 2, 150 8 T295 6" stroke={T.gold} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
            </svg>
          </span>
        </h1>

        <p className="hero-subtitle" style={{
          fontFamily: T.fontBody,
          color: "rgba(255,255,255,0.82)",
          fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
          lineHeight: 1.7,
          maxWidth: "620px",
          margin: "0 auto 48px",
          fontWeight: 300,
        }}>
          A Internacional Comunista Revolucionária organiza militantes
          pela transformação socialista da sociedade.
          Conheça a ICR e descubra como fazer parte dessa luta.
        </p>

        <button className="hero-cta" onClick={onCtaClick} style={{
          fontFamily: T.fontBody,
          fontSize: "1.05rem",
          fontWeight: 700,
          color: T.redDeep,
          background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLight} 100%)`,
          border: "none",
          borderRadius: "100px",
          padding: "18px 48px",
          cursor: "pointer",
          letterSpacing: "0.5px",
          boxShadow: "0 4px 24px rgba(242,199,68,0.35)",
          transition: T.transition,
          position: "relative",
          overflow: "hidden",
        }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-3px) scale(1.03)";
            e.target.style.boxShadow = "0 8px 36px rgba(242,199,68,0.5)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 4px 24px rgba(242,199,68,0.35)";
          }}
        >
          Quero construir a ICR
        </button>

        <div className="hero-scroll-hint" style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{
            fontFamily: T.fontBody,
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}>
            Conheça o partido
          </span>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
          }} />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// HISTORY SECTION
// ═══════════════════════════════════════════════════════════════
const HistorySection = () => {
  const ref = useRef(null);

  const milestones = [
    { year: "1848", title: "Manifesto Comunista", text: "A afirmação histórica de que a emancipação da classe trabalhadora precisa ser obra da própria classe trabalhadora." },
    { year: "1871", title: "Comuna de Paris", text: "A primeira experiência de poder operário moderno, referência permanente para a luta revolucionária internacional." },
    { year: "1917", title: "Revolução Russa", text: "A classe trabalhadora toma o poder e demonstra, na prática, a possibilidade de uma sociedade socialista." },
    { year: "1938", title: "Continuidade Revolucionária", text: "A defesa do marxismo revolucionário diante da degeneração burocrática e das derrotas do movimento operário." },
    { year: "Hoje", title: "Internacional Comunista Revolucionária", text: "Construção de uma organização internacional para unir teoria marxista, formação política e ação militante." },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      gsap.from(".history-heading", {
        scrollTrigger: { trigger: ".history-heading", start: "top 85%" },
        y: 50, opacity: 0, duration: 1,
      });
      gsap.from(".milestone-card", {
        scrollTrigger: { trigger: ".milestones-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.12,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: T.offWhite,
      padding: "100px 20px 80px",
      position: "relative",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="history-heading" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <div style={{ width: "32px", height: "2px", background: T.red }} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "12px",
              color: T.red,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>Nossa Trajetória</span>
            <div style={{ width: "32px", height: "2px", background: T.red }} />
          </div>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 800,
            color: T.gray900,
            margin: "0 0 16px",
            lineHeight: 1.15,
          }}>
            Uma tradição <span style={{ color: T.red }}>internacional</span> de luta
          </h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: "1.1rem",
            color: T.gray600,
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Uma trajetória de organização, teoria e ação revolucionária da classe trabalhadora.
          </p>
        </div>

        <div className="milestones-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {milestones.map((m, i) => (
            <div key={i} className="milestone-card" style={{
              background: T.white,
              borderRadius: T.radius,
              padding: "32px 28px",
              border: "1px solid rgba(204,27,27,0.08)",
              transition: T.transition,
              cursor: "default",
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = T.shadowHover;
                e.currentTarget.style.borderColor = "rgba(204,27,27,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(204,27,27,0.08)";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${T.red}, ${T.gold})`,
                opacity: 0.7,
              }} />
              <span style={{
                fontFamily: T.fontDisplay,
                fontSize: "2.2rem",
                fontWeight: 900,
                color: T.red,
                opacity: 0.15,
                display: "block",
                marginBottom: "4px",
                lineHeight: 1,
              }}>{m.year}</span>
              <h3 style={{
                fontFamily: T.fontDisplay,
                fontSize: "1.2rem",
                fontWeight: 700,
                color: T.gray900,
                margin: "0 0 10px",
              }}>{m.title}</h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: "0.92rem",
                color: T.gray600,
                lineHeight: 1.65,
                margin: 0,
              }}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// IDEOLOGY SECTION
// ═══════════════════════════════════════════════════════════════
const IdeologySection = () => {
  const ref = useRef(null);

  const pillars = [
    {
      icon: "⚒️",
      title: "Marxismo-Leninismo",
      text: "Fundada na ciência social mais avançada, a ICR é guiada pelo materialismo histórico e dialético como método de análise e transformação da realidade.",
    },
    {
      icon: "🇧🇷",
      title: "Soberania Nacional",
      text: "Defesa intransigente da independência e soberania do Brasil, contra o imperialismo e a subordinação aos interesses do capital internacional.",
    },
    {
      icon: "✊",
      title: "Poder Popular",
      text: "Construção de uma democracia verdadeira, onde o povo exerça de fato o poder de decidir sobre seus destinos, com justiça social e igualdade.",
    },
    {
      icon: "🌎",
      title: "Internacionalismo",
      text: "Solidariedade com os povos em luta por libertação nacional e social em todo o mundo, construindo pontes de cooperação e fraternidade.",
    },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      gsap.from(".ideology-title", {
        scrollTrigger: { trigger: ".ideology-title", start: "top 85%" },
        y: 50, opacity: 0, duration: 1,
      });
      gsap.from(".pillar-card", {
        scrollTrigger: { trigger: ".pillars-container", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: `linear-gradient(175deg, ${T.redDeep} 0%, ${T.red} 50%, ${T.redDark} 100%)`,
      padding: "100px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative */}
      <div style={{
        position: "absolute",
        bottom: "-50px",
        left: "-50px",
        opacity: 0.04,
        transform: "rotate(15deg)",
      }}>
        <Star size={400} color={T.white} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="ideology-title" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <div style={{ width: "32px", height: "2px", background: T.gold }} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "12px",
              color: T.gold,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>Nossos Pilares</span>
            <div style={{ width: "32px", height: "2px", background: T.gold }} />
          </div>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 800,
            color: T.white,
            margin: "0 0 16px",
            lineHeight: 1.15,
          }}>
            Nossa <span style={{ color: T.gold }}>Ideologia</span>
          </h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Organizar a classe trabalhadora, defender o marxismo revolucionário e lutar pela transformação socialista da sociedade.
          </p>
        </div>

        <div className="pillars-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}>
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card" style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: T.radius,
              padding: "36px 28px",
              transition: T.transition,
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(242,199,68,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "16px" }}>{p.icon}</div>
              <h3 style={{
                fontFamily: T.fontDisplay,
                fontSize: "1.2rem",
                fontWeight: 700,
                color: T.white,
                margin: "0 0 12px",
              }}>{p.title}</h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.65,
                margin: 0,
              }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// WHY JOIN SECTION
// ═══════════════════════════════════════════════════════════════
const WhyJoinSection = ({ onCtaClick }) => {
  const ref = useRef(null);

  const reasons = [
    { num: "01", title: "Organização Coletiva", text: "Seu desejo de mudança ganha força quando se soma à organização de milhares de militantes em todo o Brasil." },
    { num: "02", title: "Formação Política", text: "Acesso a cursos, materiais, debates e formações que aprofundam sua compreensão sobre o Brasil e o mundo." },
    { num: "03", title: "Ação Transformadora", text: "Participação direta em campanhas, movimentos sociais e na construção de políticas públicas que transformam vidas." },
    { num: "04", title: "Comunidade e Pertencimento", text: "Fazer parte de uma rede de camaradas que compartilham valores, sonhos e a coragem de lutar por um mundo melhor." },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      gsap.from(".why-heading", {
        scrollTrigger: { trigger: ".why-heading", start: "top 85%" },
        y: 50, opacity: 0, duration: 1,
      });
      gsap.from(".reason-item", {
        scrollTrigger: { trigger: ".reasons-list", start: "top 80%" },
        x: -40, opacity: 0, duration: 0.7, stagger: 0.12,
      });
      gsap.from(".why-cta-block", {
        scrollTrigger: { trigger: ".why-cta-block", start: "top 90%" },
        y: 30, opacity: 0, duration: 0.8,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: T.offWhite,
      padding: "100px 20px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="why-heading" style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <div style={{ width: "32px", height: "2px", background: T.red }} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "12px",
              color: T.red,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>Por que se filiar?</span>
            <div style={{ width: "32px", height: "2px", background: T.red }} />
          </div>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: 800,
            color: T.gray900,
            margin: "0 0 16px",
            lineHeight: 1.15,
          }}>
            A mudança começa com <span style={{ color: T.red }}>você</span>
          </h2>
        </div>

        <div className="reasons-list" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "56px" }}>
          {reasons.map((r, i) => (
            <div key={i} className="reason-item" style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              background: T.white,
              borderRadius: T.radius,
              padding: "28px 32px",
              border: "1px solid rgba(204,27,27,0.06)",
              transition: T.transition,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(204,27,27,0.15)`;
                e.currentTarget.style.boxShadow = T.shadow;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `rgba(204,27,27,0.06)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{
                fontFamily: T.fontDisplay,
                fontSize: "2rem",
                fontWeight: 900,
                color: T.red,
                opacity: 0.2,
                lineHeight: 1,
                flexShrink: 0,
              }}>{r.num}</span>
              <div>
                <h3 style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: T.gray900,
                  margin: "0 0 6px",
                }}>{r.title}</h3>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.95rem",
                  color: T.gray600,
                  lineHeight: 1.65,
                  margin: 0,
                }}>{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why-cta-block" style={{ textAlign: "center" }}>
          <button onClick={onCtaClick} style={{
            fontFamily: T.fontBody,
            fontSize: "1.05rem",
            fontWeight: 700,
            color: T.white,
            background: `linear-gradient(135deg, ${T.red} 0%, ${T.redDark} 100%)`,
            border: "none",
            borderRadius: "100px",
            padding: "18px 48px",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(204,27,27,0.3)",
            transition: T.transition,
          }}
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 36px rgba(204,27,27,0.45)";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 24px rgba(204,27,27,0.3)";
            }}
          >
            Preencher formulário de interesse
          </button>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// FORM SECTION
// ═══════════════════════════════════════════════════════════════
const FormSection = ({ onSubmitSuccess, formRef }) => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    nome: "", email: "", whatsapp: "", nascimento: "",
    cidade: "", estado: "", profissao: "", motivacao: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const estados = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
    "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
  ];

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      gsap.from(".form-heading", {
        scrollTrigger: { trigger: ".form-heading", start: "top 85%" },
        y: 50, opacity: 0, duration: 1,
      });
      gsap.from(".form-field", {
        scrollTrigger: { trigger: ".form-container", start: "top 80%" },
        y: 30, opacity: 0, duration: 0.5, stagger: 0.08,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "Informe seu nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (form.whatsapp.replace(/\D/g, "").length < 10) errs.whatsapp = "WhatsApp inválido";
    if (!form.nascimento) errs.nascimento = "Informe sua data de nascimento";
    if (!form.cidade.trim()) errs.cidade = "Informe sua cidade";
    if (!form.estado) errs.estado = "Selecione seu estado";
    if (!form.profissao.trim()) errs.profissao = "Informe sua profissão";
    if (form.motivacao.trim().length < 20) errs.motivacao = "Conte um pouco mais (mínimo 20 caracteres)";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(form);
    }, 2000);
  };

  const inputStyle = (field) => ({
    fontFamily: T.fontBody,
    fontSize: "1rem",
    color: T.gray900,
    background: T.white,
    border: `2px solid ${errors[field] ? "#E53E3E" : "rgba(204,27,27,0.12)"}`,
    borderRadius: "10px",
    padding: "14px 18px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: T.transition,
  });

  const labelStyle = {
    fontFamily: T.fontBody,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: T.gray900,
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.3px",
  };

  const errorStyle = {
    fontFamily: T.fontBody,
    fontSize: "0.78rem",
    color: "#E53E3E",
    marginTop: "4px",
    display: "block",
  };

  return (
    <section ref={(el) => { sectionRef.current = el; if (formRef) formRef.current = el; }} style={{
      background: T.cream,
      padding: "100px 20px",
      position: "relative",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div className="form-heading" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <Star size={14} color={T.red} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "12px",
              color: T.red,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>Formulário de Interesse</span>
            <Star size={14} color={T.red} />
          </div>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            color: T.gray900,
            margin: "0 0 12px",
          }}>
            Comece sua <span style={{ color: T.red }}>trilha</span>
          </h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: "1rem",
            color: T.gray600,
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Preencha seus dados abaixo. Nossa equipe analisará seu interesse e entrará em contato.
          </p>
        </div>

        <div className="form-container" style={{
          background: T.white,
          borderRadius: T.radiusLg,
          padding: "clamp(28px, 5vw, 48px)",
          boxShadow: T.shadow,
          border: "1px solid rgba(204,27,27,0.06)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* Nome */}
            <div className="form-field">
              <label style={labelStyle}>Nome Completo *</label>
              <input
                style={inputStyle("nome")}
                value={form.nome}
                onChange={e => handleChange("nome", e.target.value)}
                placeholder="Seu nome completo"
                onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                onBlur={e => { e.target.style.borderColor = errors.nome ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
              />
              {errors.nome && <span style={errorStyle}>{errors.nome}</span>}
            </div>

            {/* Email & WhatsApp */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>E-mail *</label>
                <input
                  type="email"
                  style={inputStyle("email")}
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>WhatsApp *</label>
                <input
                  style={inputStyle("whatsapp")}
                  value={form.whatsapp}
                  onChange={e => handleChange("whatsapp", e.target.value)}
                  placeholder="(00) 00000-0000"
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.whatsapp ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.whatsapp && <span style={errorStyle}>{errors.whatsapp}</span>}
              </div>
            </div>

            {/* Nascimento & Profissão */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>Data de Nascimento *</label>
                <input
                  type="date"
                  style={inputStyle("nascimento")}
                  value={form.nascimento}
                  onChange={e => handleChange("nascimento", e.target.value)}
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.nascimento ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.nascimento && <span style={errorStyle}>{errors.nascimento}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>Profissão *</label>
                <input
                  style={inputStyle("profissao")}
                  value={form.profissao}
                  onChange={e => handleChange("profissao", e.target.value)}
                  placeholder="Sua profissão"
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.profissao ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.profissao && <span style={errorStyle}>{errors.profissao}</span>}
              </div>
            </div>

            {/* Cidade & Estado */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
              <div className="form-field">
                <label style={labelStyle}>Cidade *</label>
                <input
                  style={inputStyle("cidade")}
                  value={form.cidade}
                  onChange={e => handleChange("cidade", e.target.value)}
                  placeholder="Sua cidade"
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.cidade ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.cidade && <span style={errorStyle}>{errors.cidade}</span>}
              </div>
              <div className="form-field">
                <label style={labelStyle}>Estado *</label>
                <select
                  style={{ ...inputStyle("estado"), cursor: "pointer", appearance: "auto" }}
                  value={form.estado}
                  onChange={e => handleChange("estado", e.target.value)}
                  onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                  onBlur={e => { e.target.style.borderColor = errors.estado ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
                >
                  <option value="">UF</option>
                  {estados.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
                {errors.estado && <span style={errorStyle}>{errors.estado}</span>}
              </div>
            </div>

            {/* Motivação */}
            <div className="form-field">
              <label style={labelStyle}>Por que você deseja construir o partido com a gente? *</label>
              <textarea
                style={{ ...inputStyle("motivacao"), minHeight: "120px", resize: "vertical", lineHeight: 1.6 }}
                value={form.motivacao}
                onChange={e => handleChange("motivacao", e.target.value)}
                placeholder="Compartilhe suas motivações, experiências e o que te inspira a fazer parte dessa luta..."
                onFocus={e => { e.target.style.borderColor = T.red; e.target.style.boxShadow = `0 0 0 3px rgba(204,27,27,0.08)`; }}
                onBlur={e => { e.target.style.borderColor = errors.motivacao ? "#E53E3E" : "rgba(204,27,27,0.12)"; e.target.style.boxShadow = "none"; }}
              />
              {errors.motivacao && <span style={errorStyle}>{errors.motivacao}</span>}
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading} style={{
              fontFamily: T.fontBody,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: T.white,
              background: loading
                ? T.gray300
                : `linear-gradient(135deg, ${T.red} 0%, ${T.redDark} 100%)`,
              border: "none",
              borderRadius: "12px",
              padding: "18px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: T.transition,
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
              onMouseEnter={e => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 28px rgba(204,27,27,0.35)";
                }
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{
                    animation: "trilha-spin 1s linear infinite",
                  }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="30 70" strokeLinecap="round" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar meu interesse
                  <span style={{ fontSize: "1.2rem" }}>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trilha-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .form-container div[style*="grid-template-columns: 1fr 1fr"],
          .form-container div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SUCCESS SCREEN
// ═══════════════════════════════════════════════════════════════
const SuccessScreen = ({ userData }) => {
  const ref = useRef(null);

  const steps = [
    { num: "1", title: "Análise do Comitê", desc: "Seu interesse será analisado pelo comitê regional mais próximo de você.", icon: "📋" },
    { num: "2", title: "Contato Inicial", desc: "Um(a) camarada entrará em contato pelo WhatsApp para conversar com você.", icon: "📱" },
    { num: "3", title: "Reunião de Acolhimento", desc: "Você será convidado(a) para uma reunião de apresentação do núcleo local.", icon: "🤝" },
    { num: "4", title: "Integração à ICR", desc: "Após a aprovação, você passa a construir oficialmente a Internacional Comunista Revolucionária!", icon: "⭐" },
  ];

  const channels = [
    {
      name: "Instagram",
      desc: "Acompanhe as publicações diárias",
      url: "https://www.instagram.com/icr.br.comunista/",
      color: "#E1306C",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Portal da ICR",
      desc: "Leia notícias, análises e materiais da organização",
      url: "https://marxista.org/",
      color: T.red,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
    },
    {
      name: "Manifesto da ICR",
      desc: "Conheça o programa da Internacional Comunista Revolucionária",
      url: "https://marxista.org/manifesto-da-internacional-comunista-revolucionaria/",
      color: "#8B4513",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      ),
    },
    {
      name: "Organize-se",
      desc: "Saiba como se somar à construção revolucionária",
      url: "https://marxismo.org.br/junte-se/",
      color: "#2B6CB0",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".success-check", { scale: 0, rotation: -180, duration: 0.8, delay: 0.3 })
        .from(".success-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".success-subtitle", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".timeline-step", { x: -40, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.3")
        .from(".engage-heading", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
        .from(".engage-card", { y: 40, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{
      minHeight: "100vh",
      background: T.offWhite,
    }}>
      {/* Header Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.redDeep} 0%, ${T.red} 50%, ${T.redDark} 100%)`,
        padding: "80px 20px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="success-check" style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(242,199,68,0.15)",
            border: `3px solid ${T.gold}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="success-title" style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: T.white,
            margin: "0 0 16px",
          }}>
            Bem-vindo(a), <span style={{ color: T.gold }}>{userData?.nome?.split(" ")[0] || "Camarada"}</span>!
          </h1>
          <p className="success-subtitle" style={{
            fontFamily: T.fontBody,
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.8)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Seu interesse foi registrado com sucesso. A partir de agora, você faz parte da nossa caminhada. Veja as próximas etapas:
          </p>
        </div>
      </div>

      {/* Timeline Steps */}
      <div style={{
        maxWidth: "800px",
        margin: "-50px auto 0",
        padding: "0 20px",
        position: "relative",
        zIndex: 3,
      }}>
        <div style={{
          background: T.white,
          borderRadius: T.radiusLg,
          padding: "clamp(28px, 5vw, 48px)",
          boxShadow: T.shadow,
        }}>
          {steps.map((step, i) => (
            <div key={i} className="timeline-step" style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              paddingBottom: i < steps.length - 1 ? "28px" : "0",
              marginBottom: i < steps.length - 1 ? "28px" : "0",
              borderBottom: i < steps.length - 1 ? "1px solid rgba(204,27,27,0.08)" : "none",
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${T.red}, ${T.redDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "1.3rem",
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: T.fontMono,
                  fontSize: "11px",
                  color: T.red,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                  opacity: 0.7,
                }}>Etapa {step.num}</div>
                <h3 style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: T.gray900,
                  margin: "0 0 6px",
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.95rem",
                  color: T.gray600,
                  lineHeight: 1.6,
                  margin: 0,
                }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Section */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "64px 20px 100px",
      }}>
        <div className="engage-heading" style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            fontWeight: 800,
            color: T.gray900,
            margin: "0 0 10px",
          }}>
            Enquanto isso, <span style={{ color: T.red }}>engaje-se!</span>
          </h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: "1rem",
            color: T.gray600,
            lineHeight: 1.6,
          }}>
            Acompanhe o partido e mergulhe na formação política
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}>
          {channels.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className="engage-card" style={{
              background: T.white,
              borderRadius: T.radius,
              padding: "28px 24px",
              textAlign: "center",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.06)",
              transition: T.transition,
              display: "block",
              cursor: "pointer",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = T.shadowHover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: ch.color,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}>
                {ch.icon}
              </div>
              <h3 style={{
                fontFamily: T.fontDisplay,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: T.gray900,
                margin: "0 0 6px",
              }}>{ch.name}</h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: "0.85rem",
                color: T.gray600,
                lineHeight: 1.5,
                margin: 0,
              }}>{ch.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: T.gray900,
        padding: "32px 20px",
        textAlign: "center",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "8px",
        }}>
          <HammerSickle size={20} color={T.gold} />
          <span style={{
            fontFamily: T.fontDisplay,
            fontSize: "0.95rem",
            fontWeight: 700,
            color: T.white,
          }}>Trilha Vermelha</span>
        </div>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.4)",
          margin: 0,
        }}>
          ICR — Internacional Comunista Revolucionária · Pela revolução socialista mundial
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function TrilhaVermelha() {
  const [screen, setScreen] = useState("landing"); // "landing" | "success"
  const [userData, setUserData] = useState(null);
  const [gsapReady, setGsapReady] = useState(false);
  const formSectionRef = useRef(null);

  useEffect(() => {
    loadFonts();
    loadGSAP().then(() => setGsapReady(true));
  }, []);

  const scrollToForm = useCallback(() => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleFormSuccess = useCallback((data) => {
    setUserData(data);
    window.scrollTo({ top: 0, behavior: "instant" });
    setScreen("success");
  }, []);

  if (!gsapReady) {
    return (
      <div style={{
        minHeight: "100vh",
        background: T.red,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}>
        <HammerSickle size={60} color={T.gold} />
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.1rem",
          color: T.gold,
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}>
          Carregando...
        </div>
      </div>
    );
  }

  if (screen === "success") {
    return <SuccessScreen userData={userData} />;
  }

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
      <Divider />
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
