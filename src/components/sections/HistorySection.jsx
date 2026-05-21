import { useRef } from "react";
import { T } from "../../tokens/theme";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";
import { milestones } from "../../data/milestones";

const TimelineItem = ({ year, title, text, index }) => {
  const isLast = index === milestones.length - 1;
  return (
    <div className="tl-item" style={{
      display: "grid",
      gridTemplateColumns: "96px 1px 1fr",
      gap: "0 32px",
      paddingBottom: isLast ? 0 : "56px",
    }}>
      {/* Ano */}
      <div style={{ textAlign: "right", paddingTop: "2px" }}>
        <span style={{
          fontFamily: T.fontMono,
          fontSize: "0.75rem",
          fontWeight: 500,
          color: index === 0 ? T.gold : "rgba(255,255,255,0.25)",
          letterSpacing: "2px",
        }}>
          {year}
        </span>
      </div>

      {/* Trilho vertical + ponto */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: index === 0 ? T.gold : "rgba(255,255,255,0.2)",
          border: index === 0 ? `2px solid ${T.gold}` : "2px solid rgba(255,255,255,0.15)",
          flexShrink: 0,
          marginTop: "4px",
          position: "relative",
          zIndex: 1,
          boxShadow: index === 0 ? `0 0 12px rgba(242,199,68,0.4)` : "none",
        }} />
        {!isLast && (
          <div style={{
            flex: 1,
            width: "1px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
            marginTop: "6px",
          }} />
        )}
      </div>

      {/* Conteúdo */}
      <div style={{ paddingTop: 0 }}>
        <h3 style={{
          fontFamily: T.fontBody,
          fontSize: "1rem",
          fontWeight: 700,
          color: index === 0 ? T.white : "rgba(255,255,255,0.65)",
          margin: "0 0 8px",
          letterSpacing: "-0.2px",
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.75,
          margin: 0,
          fontWeight: 400,
          maxWidth: "460px",
        }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export const HistorySection = () => {
  const ref = useRef(null);

  useGsapAnimation(ref, (gsap) => {
    gsap.from(".hs-header", {
      scrollTrigger: { trigger: ".hs-header", start: "top 88%" },
      opacity: 0, y: 32, duration: 0.9,
    });
    gsap.from(".tl-item", {
      scrollTrigger: { trigger: ".hs-timeline", start: "top 82%" },
      opacity: 0, y: 24, duration: 0.7, stagger: 0.1,
    });
  });

  return (
    <section ref={ref} style={{
      background: T.gray900,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Linha vermelha no topo — continuidade com a hero */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${T.red} 20%, ${T.red} 80%, transparent)`,
        opacity: 0.3,
      }} />

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "120px 48px 120px",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "80px",
        alignItems: "start",
      }} className="hs-layout">

        {/* Coluna esquerda — cabeçalho fixo */}
        <div className="hs-header" style={{ position: "sticky", top: "120px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
          }}>
            <div style={{ width: "24px", height: "1px", background: T.red, opacity: 0.8 }} />
            <span style={{
              fontFamily: T.fontMono,
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              Nossa Trajetória
            </span>
          </div>

          <h2 style={{
            fontFamily: T.fontDisplay,
            fontSize: "clamp(2.2rem, 3vw, 3rem)",
            fontWeight: 900,
            color: T.white,
            lineHeight: 1.05,
            margin: "0 0 24px",
            letterSpacing: "-1px",
          }}>
            Uma tradição<br />
            <span style={{ color: T.red }}>internacional</span><br />
            de luta.
          </h2>

          <p style={{
            fontFamily: T.fontBody,
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.8,
            margin: "0 0 40px",
            fontWeight: 400,
          }}>
            Uma trajetória de organização, teoria e
            ação revolucionária da classe trabalhadora.
          </p>

          {/* Linha decorativa */}
          <div style={{
            width: "40px",
            height: "2px",
            background: T.red,
            opacity: 0.5,
          }} />
        </div>

        {/* Coluna direita — linha do tempo */}
        <div className="hs-timeline">
          {milestones.map((m, i) => (
            <TimelineItem key={m.year} {...m} index={i} />
          ))}
        </div>
      </div>

      {/* Gradiente de saída para a próxima seção */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)`,
      }} />

      <style>{`
        @media (max-width: 768px) {
          .hs-layout { grid-template-columns: 1fr !important; gap: 48px !important; padding: 72px 24px !important; }
          .hs-header { position: static !important; }
        }
      `}</style>
    </section>
  );
};
