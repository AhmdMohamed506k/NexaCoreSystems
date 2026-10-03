import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "./gsap";

let lenis: Lenis | null = null;

export function initScroll() {
  if (lenis || typeof window === "undefined") return lenis;
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  const instance = new Lenis({ smoothWheel: !prefersReduced(), autoRaf: false });
  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => instance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis = instance;
  return lenis;
}

export function stopScroll() {
  initScroll()?.stop();
  const s = document.documentElement.style;
  s.position = "relative";
  s.overflow = "hidden";
  s.height = "100%";
}

export function startScroll() {
  initScroll()?.start();
  const s = document.documentElement.style;
  s.removeProperty("position");
  s.removeProperty("overflow");
  s.removeProperty("height");
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const l = initScroll();
  if (l) l.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}
