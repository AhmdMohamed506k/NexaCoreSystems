import { createElement, useRef, type ElementType, type ReactNode, type HTMLAttributes } from "react";
import { gsap, SplitText, EASES, prefersReduced, useGSAP } from "../../lib/gsap";
import { useUI } from "../../store/ui";

type Vars = gsap.TweenVars;

type HoverProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  from: Vars;
  to: Vars;
  kind?: keyof typeof EASES;
  /** trigger on closest [data-hover-root] ancestor (or self) */
  root?: boolean;
  children?: ReactNode;
  [k: `data-${string}`]: unknown;
};

/** Hover spring (GSAP), disabled on touch devices. */
export function Hover({ as = "span", from, to, kind = "snappy", root, children, ...rest }: HoverProps) {


  const ref = useRef<HTMLElement>(null);


  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const trig = root ? ((el.parentElement?.closest("[data-hover-root]") as HTMLElement | null) ?? el) : el;



    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      gsap.set(el, from);
      const { duration, ease } = EASES[kind];
      const enter = () => gsap.to(el, { ...to, duration, ease, overwrite: "auto" });
      const leave = () => gsap.to(el, { ...from, duration, ease, overwrite: "auto" });
      trig.addEventListener("mouseenter", enter);
      trig.addEventListener("mouseleave", leave);
      return () => {
        trig.removeEventListener("mouseenter", enter);
        trig.removeEventListener("mouseleave", leave);
      };
    });
    return () => mm.revert();
  }, { scope: ref });
  return createElement(as, { ref, ...rest }, children);
}

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  from?: Vars;
  to?: Vars;
  delay?: number;
  gate?: boolean;
  children?: ReactNode;
};

/** Reveal on scroll (or after loader when `gate`). Delay in ms. */
export function Reveal({ as = "div", from = { opacity: 0 }, to, delay = 0, gate, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const ready = useUI((s:any) => s.ready);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const final: Vars = { opacity: 1, x: 0, y: 0, scale: 1, ...to };
    if (prefersReduced()) { gsap.set(el, final); return; }
    const tween: Vars = { ...final, duration: 0.8, ease: "expo.out", delay: delay / 1000 };
    if (gate) {
      gsap.set(el, from);
      if (ready) gsap.to(el, tween);
    } else {
      gsap.set(el, from);
      gsap.to(el, { ...tween, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    }
  }, { dependencies: [gate ? ready : false], scope: ref });
  return createElement(as, { ref, ...rest }, children);
}

type SplitProps = {
  as?: ElementType;
  mode?: "lines" | "words";
  stagger?: number;
  delay?: number;
  gate?: boolean;
  className?: string;
  label: string;
  children: ReactNode;
};

export function SplitHeading({ as = "h2", mode = "lines", stagger = 120, delay = 0, gate, className, label, children }: SplitProps) {


  const ref = useRef<HTMLElement>(null);
  const ready = useUI((s:any) => s.ready);



  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (gate && !ready) { gsap.set(el, { opacity: 0 }); return; }



    gsap.set(el, { opacity: 1 });
    if (prefersReduced()) return;
    let split: SplitText | null = null;
    let cancelled = false;


    
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return;
      split = SplitText.create(el, {
        type: mode,
        ...(mode === "lines" ? { mask: "lines" as const } : {}),
        autoSplit: true,
        onSplit(self) {
          const st: gsap.TweenVars = gate ? {} : { scrollTrigger: { trigger: el, start: "top 88%", once: true } };
          if (mode === "lines") {
            return gsap.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.9, ease: "power2.out", stagger: stagger / 1000, delay: delay / 1000, ...st });
          }
          return gsap.from(self.words, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.035, delay: delay / 1000, ...st });
        },
      });
    });
    return () => { cancelled = true; split?.revert(); };
  }, { dependencies: [gate ? ready : false], scope: ref });
  return createElement(as, { ref, className, "aria-label": label }, children);
}
