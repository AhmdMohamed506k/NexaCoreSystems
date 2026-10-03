import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const EASES = {
  snappy: { duration: 0.4, ease: "back.out(2)" },
  soft: { duration: 0.35, ease: "power3.out" },
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
