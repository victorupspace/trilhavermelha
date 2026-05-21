import { T } from "../../tokens/theme";

export const Button = ({
  onClick,
  children,
  variant = "gold",
  disabled = false,
  fullWidth = false,
  style: extraStyle = {},
}) => {
  const variants = {
    gold: {
      color: T.redDeep,
      background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLight} 100%)`,
      boxShadow: "0 4px 24px rgba(242,199,68,0.35)",
      hoverShadow: "0 8px 36px rgba(242,199,68,0.5)",
    },
    red: {
      color: T.white,
      background: `linear-gradient(135deg, ${T.red} 0%, ${T.redDark} 100%)`,
      boxShadow: "0 4px 24px rgba(204,27,27,0.3)",
      hoverShadow: "0 8px 36px rgba(204,27,27,0.45)",
    },
  };

  const v = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: T.fontBody,
        fontSize: "1.05rem",
        fontWeight: 700,
        color: disabled ? T.white : v.color,
        background: disabled ? T.gray300 : v.background,
        border: "none",
        borderRadius: "100px",
        padding: "18px 48px",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: v.boxShadow,
        transition: T.transition,
        width: fullWidth ? "100%" : undefined,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        ...extraStyle,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
          e.currentTarget.style.boxShadow = v.hoverShadow;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = v.boxShadow;
      }}
    >
      {children}
    </button>
  );
};
