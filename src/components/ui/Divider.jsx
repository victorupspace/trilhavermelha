import { T } from "../../tokens/theme";

export const Divider = ({ inverted = false }) => (
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
