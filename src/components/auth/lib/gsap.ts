import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;
if (!registered && typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, useGSAP);
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, SplitText, useGSAP };
