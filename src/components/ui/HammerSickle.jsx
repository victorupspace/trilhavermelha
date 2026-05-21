import { T } from "../../tokens/theme";

export const HammerSickle = ({ size = 40, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={style}>
    <path d="M55 15c-16 0-30 12-33 28h18c2-8 9-14 17-14 1 0 3 0 4 1l5-13c-3-1-7-2-11-2z" />
    <path d="M20 48c0 2 0 4 1 6l32 32 8-8-28-28h24c-1-1-2-2-4-2H20z" />
    <path d="M42 62l-8 8 12 12 8-8z" />
    <path d="M58 35l-3 8c6 4 10 11 10 19 0 1 0 2 0 3l14-2c0-1 0-2 0-3 0-11-5-21-13-27l-8 2z" />
  </svg>
);
