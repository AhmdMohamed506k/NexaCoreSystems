import { useRef } from "react";
import { cva } from "class-variance-authority";
import { gsap, prefersReduced, useGSAP } from "../../lib/gsap";
import { Hover, Reveal, SplitHeading } from "./motion";
import { Eyebrow, PillButton, TagChip } from "./ui";
import { ArrowRight, ArrowUpRight, CircleDot, Globe, LogoMark, X } from "./icons";

export function About() {

  
  return (
    <section id="about" className="bg-white">
      <div className="shell grid grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div className="relative flex min-h-56 flex-col justify-between lg:min-h-80">
          <Globe className="absolute -left-4 top-1/2 -translate-y-1/2 text-[12rem] text-foreground/10 sm:text-[16rem] lg:-left-6 lg:text-[20rem]" />
          <Eyebrow className="relative">Engineering Philosophy</Eyebrow>
          <Reveal from={{ opacity: 0, y: 12 }} className="relative flex items-center gap-3 text-sm text-foreground/70">
            <Globe className="text-2xl text-foreground" />
            <span className="max-w-56">Architecting robust backend systems and scalable web applications across the globe.</span>
          </Reveal>
        </div>
        <div className="flex flex-col gap-10">
          <SplitHeading mode="words" label="We partner with ambitious teams to ship digital products, brand systems, and the strategy that holds them together." className="text-2xl font-medium leading-[1.35] tracking-[-0.01em] sm:text-3xl">
           We partner with ambitious teams to engineer{" "}
            <span className="text-muted">robust backend architectures, high-performance web applications, and scalable digital products.</span>
          </SplitHeading>
          <Reveal delay={200} from={{ opacity: 0, y: 12 }} className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
            <div>
              <div className="mb-3 text-sm text-foreground/45">Find us online</div>
              <div className="flex gap-2">
                <a href="#" aria-label="X / Twitter" className="grid size-9 place-items-center rounded-full bg-accent text-sm text-white">
                  <Hover from={{ scale: 1 }} to={{ scale: 1.18 }} className="inline-flex"><X /></Hover>
                </a>
                {["Behance", "Dribbble"].map((s) => (
                  <a key={s} href="#" aria-label={s} className="grid size-9 place-items-center rounded-full bg-surface text-sm text-foreground/70">
                    <Hover from={{ scale: 1 }} to={{ scale: 1.18 }} className="inline-flex"><CircleDot /></Hover>
                  </a>
                ))}
              </div>
            </div>
            <PillButton variant="outline" withArrow href="#about">About Us</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const tile = cva("grid h-24 place-items-center rounded-full text-3xl font-medium sm:h-40 sm:text-4xl", {
  variants: {
    variant: {
      light: "bg-surface text-foreground",
      accent: "bg-gradient-to-br from-accent-from to-accent-to text-white",
      dark: "bg-ink text-white",
      ghost: "bg-surface/60 text-foreground/35",
    },
  },
});

export function CreateBand() {
  const tiles = [
    { v: "light", c: "We" },
    { v: "accent", c: "Build" },
    { v: "dark", c: <ArrowRight className="text-4xl sm:text-5xl" aria-label="leads to" /> },
    { v: "ghost", c: "Better" },
  ] as const;
  return (
    <section className="bg-white">
      <ul className="shell flex flex-col gap-3 px-5 py-10 sm:flex-row sm:gap-4 sm:px-8">
        {tiles.map((t, i) => (
          <Reveal as="li" key={i} delay={i * 120} from={{ opacity: 0, y: 28 }} className="flex-1">
            <Hover as="div" from={{ scale: 1 }} to={{ scale: 1.03 }} className={tile({ variant: t.v })}>{t.c}</Hover>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

const WORKS = [
  { name: "Aster Labs", cat: "Branding", year: 2025, desc: "A complete identity and go-to-market system for a fast-moving research startup.", tags: ["Branding", "Strategy", "Design"] },
  { name: "Nova Finance", cat: "Product", year: 2024, desc: "A finance platform reimagined — clear data, calm interfaces, and effortless flows.", tags: ["Product Design", "Web App", "QA"] },
  { name: "Helio Studio", cat: "Identity", year: 2023, desc: "A bold visual identity and art direction system built to scale across every surface.", tags: ["Brand Identity", "Art Direction"] },
  { name: "Pulse Health", cat: "Mobile", year: 2023, desc: "A wellness app grounded in research, shipped end to end from concept to release.", tags: ["Mobile App", "UX Research", "Development"] },
];

export function Portfolio() {
  return (
    <section id="works" className="bg-white">
      <div className="shell px-5 pt-10 pb-20 sm:px-8 lg:pb-28">
        <div className="flex justify-center">
          <Reveal><Eyebrow className="rounded-full border border-line px-4 py-1.5">Portfolio</Eyebrow></Reveal>
        </div>
        <SplitHeading delay={120} label="Selected Work" className="mx-auto mt-5 mb-12 w-fit text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          Selected Work
        </SplitHeading>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WORKS.map((w, i) => (
            <Reveal as="li" key={w.name} delay={i * 90} from={{ opacity: 0, y: 48 }}>
              <a href="#works" className="block rounded-card" aria-label={w.name}>
                <Hover as="article" data-hover-root kind="soft" from={{ y: 0, scale: 1 }} to={{ y: -8, scale: 1.012 }} className="relative block min-h-[22rem] overflow-hidden rounded-card bg-ink p-6 text-white ring-1 ring-white/5 sm:min-h-[26rem] sm:p-8">
                  <div className="relative z-10 flex justify-between text-xs uppercase tracking-wide text-white/45">
                    <span>{w.cat} — {w.year}</span>
                    <Hover root from={{ rotate: 0, scale: 1 }} to={{ rotate: 45, scale: 1.08 }} className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                      <ArrowUpRight />
                    </Hover>
                  </div>
                  <div className="pointer-events-none absolute inset-0 grid place-items-center">
                    <span className="flex items-start"><LogoMark className="text-7xl text-white/90" /><span className="text-xs text-white/60">®</span></span>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                    <h3 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">{w.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/55">{w.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{w.tags.map((t) => <TagChip key={t}>{t}</TagChip>)}</div>
                  </div>
                </Hover>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SERVICES = [
  ["Software Development", "Scalable web & mobile products built to last."],
  ["Product Design", "Interfaces that feel effortless and look sharp."],
  ["Quality Assurance", "Rigorous testing for flawless, confident releases."],
  ["Consulting", "Strategy and direction for ambitious teams."],
];

export function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="shell px-5 py-20 sm:px-8 lg:py-28">
        <Reveal><Eyebrow>Services</Eyebrow></Reveal>
        <SplitHeading delay={120} label="What we do best" className="mt-5 mb-12 max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] sm:mb-14 sm:text-5xl">
          What we do best
        </SplitHeading>
        <ul>
          {SERVICES.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 80} from={{ opacity: 0, y: 24 }} className={i ? "border-t border-line" : ""}>
              <a href="#services" className="block">
                <Hover
                  as="div"
                  data-hover-root
                  kind="soft"
                  from={{ backgroundColor: "rgba(241,240,238,0)", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
                  to={{ backgroundColor: "rgba(241,240,238,1)", paddingLeft: "2rem", paddingRight: "1.25rem" }}
                  className="flex items-center gap-4 rounded-card-sm px-6 py-6 sm:gap-6 sm:py-8"
                >
                  <span className="w-7 text-sm font-medium text-foreground/40 sm:w-10">0{i + 1}</span>
                  <h3 className="flex-1 text-2xl font-medium tracking-[-0.01em] sm:text-3xl md:text-4xl">{t}</h3>
                  <p className="hidden max-w-80 text-sm text-foreground/55 lg:block">{d}</p>
                  <Hover root kind="soft" from={{ x: 0 }} to={{ x: 5 }} className="grid size-10 place-items-center rounded-full bg-ink text-white sm:size-12">
                    <ArrowUpRight />
                  </Hover>
                </Hover>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { el.textContent = String(value); return; }
    gsap.timeline({
      scrollTrigger: {
        trigger: el, start: "top bottom", end: "center center", scrub: true,
        onUpdate: (self) => { el.textContent = String(Math.round(self.progress * value)); },
      },
    });
  }, { scope: ref });
  return <span ref={ref}>0</span>;
}

const STATS = [
  { v: 150, s: "+", l: "Projects delivered" },
  { v: 98, s: "%", l: "Client retention" },
  { v: 12, s: "", l: "Years of craft" },
  { v: 40, s: "+", l: "Team members" },
];

export function Stats() {
  return (
    <section className="bg-white">
      <div className="shell px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal from={{ opacity: 0, y: 40, scale: 0.99 }} className="rounded-card bg-ink px-6 py-12 text-white sm:px-8 sm:py-16 md:px-16">
          <Eyebrow tone="light">By the numbers</Eyebrow>
          <SplitHeading delay={120} label="Proof in the work, not the words." className="mt-4 max-w-[20ch] text-3xl font-medium tracking-[-0.01em] md:text-4xl">
            Proof in the work, not the words.
          </SplitHeading>
          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.l} delay={i * 90} from={{ opacity: 0, y: 20 }}>
                <div className="text-5xl font-semibold tabular-nums tracking-[-0.02em] sm:text-6xl md:text-7xl">
                  <StatNumber value={s.v} />{s.s}
                </div>
                <div className="mt-3 text-sm text-white/55">{s.l}</div>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
