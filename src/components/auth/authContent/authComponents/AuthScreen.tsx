import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { useAuthUI } from "../../store/auth-ui";
import { SidePanel } from "./SidePanel";
import { FormPane } from "./Forms/FormPane";
import { PageLoader } from "../../../SourceCode/PageLoader";
import { useAuth } from "../../context/AuthContext";

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

function revealHeadline(root: HTMLElement | null) {
  const h = root?.querySelector<HTMLElement>("[data-headline]");
  if (!h || prefersReducedMotion()) return;
  const split = SplitText.create(h, { type: "words" });
  gsap.from(split.words, { y: 14, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.02, onComplete: () => split.revert() });
}

export function AuthScreen() {


  const { setLoaderExit, loaderExit } = useAuth();
  const root = useRef<HTMLDivElement>(null);
  const side = useRef<HTMLElement>(null);
  const form = useRef<HTMLElement>(null);
  const mode = useAuthUI((s) => s.mode);
  const shownMode = useAuthUI((s) => s.shownMode);
  const first = useRef(true);
  const pendingIn = useRef(false);




  const place = (m: typeof mode) => {
    if (!side.current || !form.current) return;
    if (isDesktop()) {
      gsap.set(side.current, { xPercent: m === "login" ? 0 : 100 });
      gsap.set(form.current, { xPercent: m === "login" ? 100 : 0 });
    } else {
      gsap.set([side.current, form.current], { xPercent: 0 });
    }
  };
  // initial placement + resize
  useLayoutEffect(() => {
    place(useAuthUI.getState().mode);
    const onResize = () => { if (!useAuthUI.getState().animating) place(useAuthUI.getState().mode); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // first load
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(root.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.from("[data-form-content] [data-reveal]", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.1 });
      revealHeadline(root.current);
    },
    { scope: root },
  );
  // mode swap
  useGSAP(
    () => {
      if (first.current) { first.current = false; return; }
      const { setAnimating, setShownMode } = useAuthUI.getState();
      const content = root.current!.querySelector("[data-form-content]");
      const dir = mode === "register" ? 1 : -1;
      setAnimating(true);

      if (prefersReducedMotion()) {
        gsap.timeline({ onComplete: () => setAnimating(false) })
          .to(root.current, { opacity: 0, duration: 0.125 })
          .add(() => { place(mode); setShownMode(mode); })
          .to(root.current, { opacity: 1, duration: 0.125 });
        return;
      }

      const desktop = isDesktop();
      const tl = gsap.timeline({ onComplete: () => { gsap.set(side.current, { zIndex: "" }); setAnimating(false); } });
      tl.to(content, { opacity: 0, x: dir * -24, duration: 0.3, ease: "power2.in" }, 0);
      if (desktop) {
        gsap.set(side.current, { zIndex: 20 });
        tl.to(side.current, { xPercent: mode === "login" ? 0 : 100, duration: 0.8, ease: "power4.inOut" }, 0.1);
        tl.to(form.current, { xPercent: mode === "login" ? 100 : 0, duration: 0.8, ease: "power4.inOut" }, 0.1);
      }
      tl.add(() => { pendingIn.current = true; setShownMode(mode); }, desktop ? 0.5 : 0.3);
    },
    { scope: root, dependencies: [mode] },
  );
  // incoming content after the swapped form renders
  useGSAP(
    () => {
      if (!pendingIn.current) return;
      pendingIn.current = false;
      const content = root.current!.querySelector("[data-form-content]");
      gsap.set(content, { opacity: 1, x: 0 });
      gsap.fromTo(
        "[data-form-content] [data-reveal]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 },
      );
      revealHeadline(root.current);
    },
    { scope: root, dependencies: [shownMode] },
  );







  return (
    <div ref={root} className="relative min-h-[100dvh] w-full overflow-hidden bg-background">
      <PageLoader exitUp={loaderExit} />
      <SidePanel ref={side} />
      <FormPane ref={form} />
    </div>
  );
}
