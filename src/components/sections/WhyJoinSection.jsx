import { useRef } from "react";
import { T } from "../../tokens/theme";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { useGsapAnimation } from "../../hooks/useGsapAnimation";
import { reasons } from "../../data/reasons";

const ReasonItem = ({ num, title, text }) => (
  <div
    className="reason-item"
    style={{
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
      e.currentTarget.style.borderColor = "rgba(204,27,27,0.15)";
      e.currentTarget.style.boxShadow = T.shadow;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(204,27,27,0.06)";
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
    }}>{num}</span>
    <div>
      <h3 style={{
        fontFamily: T.fontDisplay,
        fontSize: "1.15rem",
        fontWeight: 700,
        color: T.gray900,
        margin: "0 0 6px",
      }}>{title}</h3>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: "0.95rem",
        color: T.gray600,
        lineHeight: 1.65,
        margin: 0,
      }}>{text}</p>
    </div>
  </div>
);

export const WhyJoinSection = ({ onCtaClick }) => {
  const ref = useRef(null);

  useGsapAnimation(ref, (gsap) => {
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
  });

  return (
    <section ref={ref} style={{
      background: T.offWhite,
      padding: "100px 20px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="why-heading">
          <SectionHeading
            eyebrow="Por que se filiar?"
            title={`A mudança começa com <span style="color:${T.red}">você</span>`}
          />
        </div>

        <div className="reasons-list" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "56px" }}>
          {reasons.map((r) => (
            <ReasonItem key={r.num} {...r} />
          ))}
        </div>

        <div className="why-cta-block" style={{ textAlign: "center" }}>
          <Button onClick={onCtaClick} variant="red">
            Preencher formulário de interesse
          </Button>
        </div>
      </div>
    </section>
  );
};
