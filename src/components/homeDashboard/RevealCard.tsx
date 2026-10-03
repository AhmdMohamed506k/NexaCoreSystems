import React, { useRef } from "react";
import { gsap } from "gsap";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "light" | "dark" | "accent";
  as?: "div" | "article" | "section";
};

export function RevealCard({ tone = "light", as = "div", className = "", children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as any;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    gsap.to(el, { "--mx": `${x}%`, "--my": `${y}%`, duration: 0.35, ease: "power3.out", overwrite: true });
  };

  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { "--mx": "50%", "--my": "50%", duration: 0.6, ease: "power3.out" });
  };

  return (
    <Tag ref={ref} className={`hd-reveal-card hd-tone-${tone} ${className}`} onPointerMove={move} onPointerLeave={leave} {...props}>
      <div className="hd-reveal-layer" aria-hidden="true" />
      <div className="hd-reveal-content">{children}</div>
    </Tag>
  );
}
