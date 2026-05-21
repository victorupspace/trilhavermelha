import { useRef } from "react";
import { T } from "../../tokens/theme";
import { HammerSickle } from "../ui/HammerSickle";
import { Star } from "../ui/Star";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";

export const HeroSection = ({ onCtaClick }) => {
  const ref = useRef(null);

  useGsapAnimation(ref, (gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".h-nav", { opacity: 0, y: -16, duration: 0.7, delay: 0.15 })
      .from(".h-tag", { opacity: 0, x: -12, duration: 0.5 }, "-=0.3")
      .from(".h-title", { opacity: 0, y: 48, duration: 1, ease: "power4.out" }, "-=0.2")
      .from(".h-desc", { opacity: 0, y: 24, duration: 0.7 }, "-=0.5")
      .from(".h-actions", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".h-stats", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
      .from(".h-video-col", { opacity: 0, duration: 1.2 }, "-=0.9");
  });

  return (
    <>
      <style>{`
        .hero-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all 0.22s ease;
        }
        .hero-btn-primary {
          background: ${T.gold};
          color: ${T.redDeep};
          padding: 16px 44px;
        }
        .hero-btn-primary:hover {
          background: ${T.goldLight};
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(242,199,68,0.25);
        }
        .hero-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.55);
          padding: 16px 28px;
          border: 1px solid rgba(255,255,255,0.12) !important;
        }
        .hero-btn-ghost:hover {
          color: ${T.white};
          border-color: rgba(255,255,255,0.3) !important;
        }
        @media (max-width: 900px) {
          .h-root { flex-direction: column !important; height: auto !important; }
          .h-left { padding: 48px 32px 56px !important; }
          .h-video-col { height: 56vw !important; min-height: 260px !important; flex: none !important; }
        }
      `}</style>

      <section ref={ref} className="h-root" style={{
        height: "100vh",
        minHeight: "680px",
        display: "flex",
        overflow: "hidden",
        background: T.redDeep,
      }}>

        {/* ══ COLUNA ESQUERDA ══════════════════════════════ */}
        <div className="h-left" style={{
          flex: "0 0 48%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          padding: "0 72px",
        }}>

          {/* Borda vermelha mais viva na direita da coluna */}
          <div style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "1px",
            background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)`,
          }} />

          {/* Elemento decorativo — martelo e foice grande no canto */}
          <div style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            opacity: 0.04,
            pointerEvents: "none",
          }}>
            <HammerSickle size={400} color={T.white} />
          </div>

          {/* NAV / topo */}
          <div className="h-nav" style={{
            paddingTop: "44px",
            paddingBottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <HammerSickle size={20} color={T.gold} />
              <span style={{
                fontFamily: T.fontMono,
                fontSize: "10px",
                color: "rgba(242,199,68,0.65)",
                letterSpacing: "3.5px",
                textTransform: "uppercase",
              }}>
                ICR
              </span>
            </div>
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              Internacional
            </span>
          </div>

          {/* CONTEÚDO CENTRAL */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}>
            {/* Tag superior */}
            <div className="h-tag" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
            }}>
              <div style={{ width: "28px", height: "1px", background: T.gold, opacity: 0.6 }} />
              <span style={{
                fontFamily: T.fontMono,
                fontSize: "10px",
                color: "rgba(242,199,68,0.6)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}>
                Trilha Vermelha — Filiação
              </span>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="h-title" style={{
              fontFamily: T.fontDisplay,
              color: T.white,
              fontSize: "clamp(3rem, 4.2vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              margin: "0 0 32px",
              letterSpacing: "-2px",
            }}>
              Fortalecer<br />
              a Nação,<br />
              <span style={{
                color: T.gold,
                fontStyle: "italic",
                fontWeight: 800,
                letterSpacing: "-1px",
              }}>
                lutar pelo<br />comunismo.
              </span>
            </h1>

            {/* Linha separadora */}
            <div style={{
              width: "48px",
              height: "2px",
              background: `linear-gradient(90deg, ${T.gold}, transparent)`,
              marginBottom: "28px",
              opacity: 0.7,
            }} />

            {/* Descrição */}
            <p className="h-desc" style={{
              fontFamily: T.fontBody,
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
              lineHeight: 1.85,
              margin: "0 0 52px",
              fontWeight: 400,
              maxWidth: "380px",
            }}>
              A Internacional Comunista Revolucionária organiza
              militantes pela transformação socialista da sociedade.
              Conheça a ICR e descubra onde sua luta começa.
            </p>

            {/* CTAs */}
            <div className="h-actions" style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}>
              <button className="hero-btn hero-btn-primary" onClick={onCtaClick}>
                Quero me filiar
              </button>
              <button className="hero-btn hero-btn-ghost" onClick={onCtaClick}>
                Saiba mais
              </button>
            </div>
          </div>

          {/* ESTATÍSTICAS / rodapé */}
          <div className="h-stats" style={{
            paddingBottom: "44px",
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}>
            {[
              { value: "ICR", label: "Organização internacional" },
              { value: "BR", label: "Atuação no Brasil" },
              { value: "∞", label: "Luta socialista" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: T.white,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ COLUNA DIREITA — VÍDEO ═══════════════════════ */}
        <div className="h-video-col" style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background: "#0c0c0c",
        }}>
          {/* Vídeo */}
          <video
            src="/lenin.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Vinheta sobre o vídeo */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }} />

          {/* Divisa vertical entre colunas — sem gradiente horizontal, só uma linha */}
          <div style={{
            position: "absolute",
            top: "10%",
            bottom: "10%",
            left: 0,
            width: "1px",
            background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)`,
          }} />

          {/* Selo canto inferior direito */}
          <div style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}>
            <Star size={12} color={T.gold} style={{ opacity: 0.2 }} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "8px",
              color: "rgba(255,255,255,0.1)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              Trilha Vermelha
            </span>
          </div>
        </div>

      </section>
    </>
  );
};
