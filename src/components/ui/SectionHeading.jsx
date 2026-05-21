import { T } from "../../tokens/theme";
import { Star } from "./Star";

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  light = false,
  eyebrowIcon = "line",
}) => {
  const eyebrowColor = light ? T.gold : T.red;
  const titleColor = light ? T.white : T.gray900;
  const subtitleColor = light ? "rgba(255,255,255,0.7)" : T.gray600;

  const EyebrowDecoration = eyebrowIcon === "star"
    ? () => <Star size={14} color={eyebrowColor} />
    : () => <div style={{ width: "32px", height: "2px", background: eyebrowColor }} />;

  return (
    <div style={{ textAlign: "center", marginBottom: "64px" }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px",
      }}>
        <EyebrowDecoration />
        <span style={{
          fontFamily: T.fontMono,
          fontSize: "12px",
          color: eyebrowColor,
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontWeight: 500,
        }}>
          {eyebrow}
        </span>
        <EyebrowDecoration />
      </div>

      <h2
        style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          fontWeight: 800,
          color: titleColor,
          margin: "0 0 16px",
          lineHeight: 1.15,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle && (
        <p style={{
          fontFamily: T.fontBody,
          fontSize: "1.1rem",
          color: subtitleColor,
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
