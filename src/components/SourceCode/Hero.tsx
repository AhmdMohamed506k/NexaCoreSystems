import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { scrollToId } from "../../lib/scroll";
import { useUI } from "../../store/ui";
import { LiquidReveal } from "./LiquidReveal";
import { Hover, Reveal, SplitHeading } from "./motion";
import { PillButton } from "./ui";
import { ArrowRight, CircleDot, LogoMark, Star } from "./icons";

const ASSET = "https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68";
const ITEMS = [
  { caption: "Scalable Backend", title: "System Architecture." },
  { caption: "Engineered for scale", title: "Built for high performance." },
  { caption: "Brand systems", title: "Designed to last." },
];
const PARTNERS = ["Node.js", "NestJS", "React", "Next.js", "TypeScript"];

function HeroCard() {
  const [i, setI] = useState(0);
  const prev = useRef(0);
  const dir = useRef(1);
  const slot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const els = slot.current?.querySelectorAll<HTMLElement>("[data-item]");
    if (!els) return;
    if (prev.current === i) {
      els.forEach((el, k) => gsap.set(el, { opacity: k === i ? 1 : 0, y: 0 }));
      return;
    }
    const d = dir.current;
    gsap.timeline()
      .to(els[prev.current]!, { y: -14 * d, opacity: 0, duration: 0.45, ease: "power4.out" }, 0)
      .fromTo(els[i]!, { y: 14 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power4.out" }, 0);
    prev.current = i;
  }, { dependencies: [i], scope: slot });

  const go = (step: number) => { dir.current = step; setI((v) => (v + step + ITEMS.length) % ITEMS.length); };

  return (
    <Reveal gate delay={400} from={{ opacity: 0, y: 16, scale: 0.96 }} className="w-full mt-10 max-w-sm rounded-card-sm bg-white/70 p-2 shadow-sm ring-1 ring-line/70 backdrop-blur-xl lg:w-[19rem]">
      <div className="flex cursor-pointer gap-2 rounded-control" onClick={() => go(1)}>
        <div className="grid aspect-square w-24 place-items-center rounded-control bg-white text-3xl text-white">
          <LogoMark className="text-accent-from" />
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-control bg-surface/70 p-3">
          <div ref={slot} className="relative min-h-[3.25rem]" aria-live="polite">
            {ITEMS.map((it, k) => (
              <div key={it.caption} data-item className="absolute inset-0" style={{ opacity: k === 0 ? 1 : 0 }} aria-hidden={k !== i}>
                <div className="text-[.65rem] font-medium uppercase tracking-wider text-foreground/45">{it.caption}</div>
                <div className="max-w-32 text-sm font-medium leading-[1.35]">{it.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-1">
              {ITEMS.map((it, k) => (
                <span key={it.caption} className={`h-1 rounded-full transition-all duration-300 ${k === i ? "w-4 bg-foreground/70" : "w-1.5 bg-foreground/20"}`} />
              ))}
            </div>
            <div className="flex gap-1">
              <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }} className="grid size-7 place-items-center rounded-full bg-white text-foreground/70 ring-1 ring-line hover:text-foreground">
                <ArrowRight className="rotate-180" />
              </button>
              <button aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }} className="grid size-7 place-items-center rounded-full bg-white text-foreground/70 ring-1 ring-line hover:text-foreground">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Hero() {
  const openModal = useUI((s:any) => s.openModal);
  return (
    <section id="home" className="relative  isolate overflow-hidden rounded-b-card bg-hero-to ">
      <LiquidReveal beforeSrc={`${ASSET}/hero/before.jpg`} afterSrc={`${ASSET}/hero/after.jpg`} brushRadius={143} decay={0.016} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b  from-white/35 via-transparent to-white/35" />
      <Reveal gate delay={300} from={{ opacity: 0, y: 20 }} to={{ opacity: 0.4 }} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-28 z-[1] select-none text-center font-bold leading-none text-[length:var(--text-watermark)] text-white/40">
        NexaCore Systems
      </Reveal>

      <div className="shell relative top-20 z-20 flex flex-col  gap-8 px-5 pt-28 pb-20 sm:px-8 lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-36 lg:pb-28">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <Reveal gate delay={200} from={{ opacity: 0, y: 10 }} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70">
            <span className="size-1.5 rounded-full bg-foreground/50" /> Full-Stack Engineering & Product Studio
          </Reveal>
          <SplitHeading as="h1" gate delay={250} stagger={120} label="Scalable code, crafted with quiet precision" className="max-w-[18ch] text-4xl font-semibold leading-[.98] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            <span className="block">Scalable code,</span>
            <span className="block">crafted with</span>
            <span className="block">quiet precision</span>
          </SplitHeading>
          <Reveal gate delay={650} className="flex items-center gap-3">
            <span className="flex text-base text-accent" aria-label="5 stars">
              {[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}
            </span>
            <span className="text-sm font-medium text-foreground/70">10+ production-grade systems deployed</span>
          </Reveal>
          <Reveal gate delay={750} className="flex flex-wrap gap-3">
            <PillButton withArrow onClick={openModal}>Let's Talk</PillButton>
            <PillButton variant="outline" onClick={() => scrollToId("works")}>View Work</PillButton>
          </Reveal>
        </div>
        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:items-end">
          <HeroCard />
          <Reveal gate delay={550} from={{ opacity: 0, y: 14 }} className="w-full max-w-sm lg:w-[19rem]">
            <div className="mb-3 text-left text-xs font-medium text-foreground/45 lg:text-right">Trusted by</div>
            <ul className="grid grid-cols-4 gap-x-4 gap-y-3">
              {PARTNERS.map((p) => (
                <li key={p}>
                  <Hover kind="soft" from={{ y: 0, opacity: 0.7 }} to={{ y: -2, opacity: 1 }} className="flex items-center gap-1.5 text-xs text-foreground/70">
                    <CircleDot className="text-sm text-foreground/40" /> {p}
                  </Hover>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal gate delay={900} className="shell relative z-20 flex items-center justify-between gap-3 border-t border-foreground/10 px-5 py-5 text-xs font-medium uppercase tracking-wide text-foreground/60 sm:px-8">
        <span>Working since 2014</span>
        <span className="hidden sm:block">Remote-first, worldwide</span>
        <span className="inline-flex gap-2">Scroll to explore <span aria-hidden>↓</span></span>
      </Reveal>
    </section>
  );
}
