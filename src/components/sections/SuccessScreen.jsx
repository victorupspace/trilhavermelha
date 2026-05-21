import { useRef } from "react";
import { T } from "../../tokens/theme";
import { HammerSickle } from "../ui/HammerSickle";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";
import { nextSteps } from "../../data/nextSteps";
import { engagementChannels } from "../../data/engagementChannels.jsx";

const NOISE_BG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")";


export const SuccessScreen = ({ userData }) => {
  const ref = useRef(null);

  useGsapAnimation(ref, (gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".success-check", { scale: 0, rotation: -180, duration: 0.8, delay: 0.3 })
      .from(".success-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".success-subtitle", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
      .from(".timeline-step", { x: -40, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.3")
      .from(".engage-heading", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
      .from(".engage-card", { y: 40, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
  });

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: T.offWhite }}>
      <div style={{
        background: `linear-gradient(135deg, ${T.redDeep} 0%, ${T.red} 50%, ${T.redDark} 100%)`,
        padding: "80px 20px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: NOISE_BG, pointerEvents: "none" }} />
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
          {nextSteps.map((step, i) => (
            <div key={step.num} className="timeline-step" style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              paddingBottom: i < nextSteps.length - 1 ? "28px" : "0",
              marginBottom: i < nextSteps.length - 1 ? "28px" : "0",
              borderBottom: i < nextSteps.length - 1 ? "1px solid rgba(204,27,27,0.08)" : "none",
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
                <h3 style={{
                  fontFamily: T.fontDisplay,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: T.gray900,
                  margin: "0 0 4px",
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: "0.92rem",
                  color: T.gray600,
                  lineHeight: 1.6,
                  margin: 0,
                }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 80px" }}>
        <div className="engage-heading" style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "1.6rem",
            fontWeight: 700,
            color: T.gray900,
            margin: "0 0 8px",
          }}>
            Enquanto isso, <span style={{ color: T.red }}>fique por dentro</span>
          </h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: "0.95rem",
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
          {engagementChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="engage-card"
              style={{
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
          PCdoB — Partido Comunista do Brasil · Fortalecer a Nação, lutar pelo socialismo
        </p>
      </div>
    </div>
  );
};
