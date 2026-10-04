import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { startScroll, stopScroll } from "../../lib/scroll";
import { useUI } from "../../store/ui";
import { LogoMark } from "./icons";

type PageLoaderProps = {
  exitUp?: boolean;
};

export function PageLoader({ exitUp = true }: PageLoaderProps) {
  const [done, setDone] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  const setReady = useUI((s: any) => s.setReady);

  useEffect(() => {
    stopScroll();
  }, []);

  useGSAP(() => {
    const proxy = { p: 0 };

    const exitY = exitUp ? -100 : 100;
    const centerY = exitUp ? -12 : 12;

    const tl = gsap.timeline();

    tl.to(proxy, {
      p: 1,
      duration: 1.3,
      ease: "power3.inOut",

      onUpdate: () => {
        if (fill.current) {
          fill.current.style.width = `${proxy.p * 100}%`;
        }

        if (counter.current) {
          counter.current.textContent = String(
            Math.round(proxy.p * 100)
          ).padStart(3, "0");
        }
      },
    })
      .to(
        panel.current,
        {
          yPercent: exitY,
          duration: 0.7,
          ease: "power4.out",
        },
        "exit"
      )
      .to(
        center.current,
        {
          opacity: 0,
          y: centerY,
          duration: 0.5,
        },
        "exit"
      )
      .call(() => {
        setReady(true);
        startScroll();
        setDone(true);

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
  }, { scope: panel });

  if (done) return null;

  return (
    <div
      ref={panel}
      className="fixed inset-0 z-[120] left-0 flex flex-col items-center justify-center gap-8 rounded-[5px] bg-ink text-white"
    >
      <div
        ref={center}
        className="flex flex-col items-center gap-5 text-center"
      >
        <div className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
          <LogoMark className="text-3xl text-accent-from" />
          NexaCore Systems
        </div>

        <p className="max-w-[24ch] text-sm text-white/55">
          Scalable code, crafted with quiet precision.
        </p>
      </div>

      <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
        <div className="h-px bg-white/15">
          <div
            ref={fill}
            className="h-full w-0 bg-accent-from"
          />
        </div>

        <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-white/45">
          <span>Loading</span>

          <span
            ref={counter}
            className="tabular-nums text-white/80"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}