import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

export function SidePanelScene() {
  const gradient = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = gradient.current;
    const highlight = reveal.current;
    const panel = layer?.parentElement?.parentElement;
    if (!layer || !highlight || !panel) return;

    const reduced = prefersReducedMotion();
    const cycle = reduced ? null : gsap.to(layer, {
      filter: "hue-rotate(8deg)",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    const move = (event: PointerEvent) => {
      const bounds = panel.getBoundingClientRect();
      highlight.style.setProperty("--reveal-x", `${event.clientX - bounds.left}px`);
      highlight.style.setProperty("--reveal-y", `${event.clientY - bounds.top}px`);
    };
    const enter = (event: PointerEvent) => {
      move(event);
      if (reduced) {
        highlight.style.opacity = "1";
      }
      else {
        gsap.to(highlight, { opacity: 1, duration: 0.45, ease: "power2.out", overwrite: true });
        if (cycle) gsap.to(cycle, { timeScale: 3, duration: 0.8, ease: "power2.out", overwrite: true });
      }
    };
    const leave = () => {
      if (reduced) {
        highlight.style.opacity = "0";
      }
      else {
        gsap.to(highlight, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: true });
        if (cycle) gsap.to(cycle, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
      }
    };

    panel.addEventListener("pointerenter", enter);
    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);
    return () => {
      panel.removeEventListener("pointerenter", enter);
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(highlight);
      if (cycle) {
        gsap.killTweensOf(cycle);
        cycle.kill();
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div ref={gradient} className="side-gradient absolute inset-0" />
      <div ref={reveal} className="side-gradient-reveal absolute inset-0" />
    </div>
  );
}
