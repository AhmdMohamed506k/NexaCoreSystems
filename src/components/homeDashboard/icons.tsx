import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowRight = (p: IconProps) => <svg {...base} {...p}><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>;
export const ArrowUpRight = (p: IconProps) => <svg {...base} {...p}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>;
export const ChevronLeft = (p: IconProps) => <svg {...base} {...p}><path d="m14 18-6-6 6-6"/></svg>;
export const ChevronRight = (p: IconProps) => <svg {...base} {...p}><path d="m10 18 6-6-6-6"/></svg>;
export const Plus = (p: IconProps) => <svg {...base} {...p}><path d="M12 5v14M5 12h14"/></svg>;
export const Message = (p: IconProps) => <svg {...base} {...p}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.8-3.6A7.4 7.4 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z"/></svg>;
export const Folder = (p: IconProps) => <svg {...base} {...p}><path d="M3.5 7.5h6l2 2h9v8.8a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7Z"/><path d="M3.5 7.5V5.8A1.8 1.8 0 0 1 5.3 4h4l2 2h5.4"/></svg>;
export const Receipt = (p: IconProps) => <svg {...base} {...p}><path d="M6 3.8h12v16.4l-3-1.8-3 1.8-3-1.8-3 1.8Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>;
export const Bell = (p: IconProps) => <svg {...base} {...p}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>;
export const Clock = (p: IconProps) => <svg {...base} {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>;
export const Check = (p: IconProps) => <svg {...base} {...p}><path d="m5 12 4 4L19 6"/></svg>;
export const X = (p: IconProps) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
export const MenuLines = (p: IconProps) => <svg {...base} {...p}><path d="M4 8h16M4 16h16"/></svg>;
export const Globe = (p: IconProps) => <svg {...base} {...p}><circle cx="12" cy="12" r="8.5"/><path d="M3.7 12h16.6M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"/></svg>;
export const Star = (p: IconProps) => <svg {...base} {...p}><path d="m12 4 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8Z"/></svg>;
export const Logout = (p: IconProps) => <svg {...base} {...p}><path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10"/><path d="M13 16l4-4-4-4"/><path d="M9 12h8"/></svg>;
export const LogoMark = (p: IconProps) => <svg {...base} {...p}><path d="M4 17.5 8.2 6.5l4.1 11 3.4-7.5 4.3 7.5"/><path d="M6.2 14.8h4.5"/></svg>;
