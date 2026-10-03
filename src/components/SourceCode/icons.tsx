import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: "1em", height: "1em", "aria-hidden": true } as const;
const stroke = (w: number) => ({ fill: "none", stroke: "currentColor", strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const LogoMark = (p: P) => (
  <svg {...base} viewBox="0 0 48 48" fill="currentColor" {...p}>
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(2)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(2)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Star = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
  </svg>
);
export const Globe = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(1.4)} {...p}>
    <circle cx="12" cy="12" r="9.25" />
    <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
  </svg>
);
export const X = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(2)} {...p}><path d="M4 4l16 16M20 4 4 20" /></svg>
);
export const CircleDot = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(1.6)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
  </svg>
);
export const MenuLines = (p: P) => (
  <svg {...base} viewBox="0 0 24 24" {...stroke(2)} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
);
