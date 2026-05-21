import { useRef } from "react";
import { T } from "../../tokens/theme";
import { Star } from "../ui/Star";
import { SectionHeading } from "../ui/SectionHeading";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";
import { pillars } from "../../data/pillars";

const PillarCard = ({ icon, title, text }) => (
  <div
    className="pillar-card"
    style={{
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
    <div style={{ fontSize: "2.4rem", marginBottom: "16px" }}>{icon}</div>
    <h3 style={{
      fontFamily: T.fontDisplay,
      fontSize: "1.2rem",
      fontWeight: 700,
      color: T.white,
      margin: "0 0 12px",
    }}>{title}</h3>
    <p style={{
      fontFamily: T.fontBody,
      fontSize: "0.92rem",
      color: "rgba(255,255,255,0.65)",
      lineHeight: 1.65,
      margin: 0,
    }}>{text}</p>
  </div>
);

export const IdeologySection = () => {
  const ref = useRef(null);

  useGsapAnimation(ref, (gsap) => {
    gsap.from(".ideology-title", {
      scrollTrigger: { trigger: ".ideology-title", start: "top 85%" },
      y: 50, opacity: 0, duration: 1,
    });
    gsap.from(".pillar-card", {
      scrollTrigger: { trigger: ".pillars-container", start: "top 80%" },
      y: 50, opacity: 0, duration: 0.7, stagger: 0.15,
    });
  });

  return (
    <section ref={ref} style={{
      background: `linear-gradient(175deg, ${T.redDeep} 0%, ${T.red} 50%, ${T.redDark} 100%)`,
      padding: "100px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
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
        <div className="ideology-title">
          <SectionHeading
            eyebrow="Nossos Pilares"
            title={`Nossa <span style="color:${T.gold}">Ideologia</span>`}
            subtitle="Fortalecer a Nação, lutar pelo socialismo — esse é o lema que guia mais de um século de militância comunista no Brasil."
            light
          />
        </div>

        <div className="pillars-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}>
          {pillars.map((p) => (
            <PillarCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};
