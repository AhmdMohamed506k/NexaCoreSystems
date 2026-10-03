import { useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

export function AnimatedLink({ children, href = "#", className }: { children: ReactNode; href?: string; className?: string }) {
  const inner = useRef<HTMLSpanElement>(null);
  const to = (x: number, opacity: number) => {
    if (prefersReducedMotion() || !inner.current) return;
    gsap.to(inner.current, { x, opacity, duration: 0.35, ease: "power3.out" });
  };
  return (
    <a
      href={href}
      onClick={(e) => href === "#" && e.preventDefault()}
      onPointerEnter={() => to(4, 1)}
      onPointerLeave={() => to(0, 0.65)}
      className={cn("inline-block text-xs", className)}
    >
      <span ref={inner} className="inline-block opacity-65">{children}</span>
    </a>
  );
}
