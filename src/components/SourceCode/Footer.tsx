import { useUI } from "../../store/ui";
import { SplitHeading } from "./motion";
import { AnimatedLink, PillButton } from "./ui";
import { LogoMark } from "./icons";

const COLS = [
  { t: "Company", l: [["About", "#about"], ["Careers", "#careers"], ["Partners", "#partners"], ["Contact", "#contact"]] },
  { t: "Services", l: [["Development", "#development"], ["Design", "#design"], ["Quality Assurance", "#qa"], ["Consulting", "#consulting"]] },
  { t: "Social", l: [["X / Twitter", "#"], ["Behance", "#"], ["Dribbble", "#"], ["LinkedIn", "#"]] },
];

export function Footer() {
  const openModal = useUI((s:any) => s.openModal);
  return (
    <footer className="relative overflow-hidden rounded-t-card bg-ink text-white">
      <div className="shell relative z-10 px-5 pt-20 pb-10 sm:px-8 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <SplitHeading stagger={100} label="Have a project in mind? Let's get to work." className="max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Have a project in mind? Let's get to work.
          </SplitHeading>
          <div><PillButton variant="light" withArrow arrow="up-right" onClick={openModal}>Start a project</PillButton></div>
        </div>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold"><LogoMark className="text-xl" /> NexaCore Systems</div>
            <p className="max-w-80 text-sm text-white/55">An independent studio crafting brands, products, and the systems that connect them.</p>
          </div>
          {COLS.map((c) => (
            <div key={c.t} className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-wide text-white/40">{c.t}</div>
              <ul className="flex flex-col gap-2 text-sm">
                {c.l.map(([label, href]) => <li key={label}><AnimatedLink href={href ?? "#"}>{label}</AnimatedLink></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <span>© 2025 NexaCore Systems. All rights reserved.</span>
          <div className="flex gap-6">
            <AnimatedLink legal href="#privacy">Privacy</AnimatedLink>
            <AnimatedLink legal href="#terms">Terms</AnimatedLink>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 select-none text-center font-bold leading-none text-[length:var(--text-watermark)] text-white/5">
        NexaCore Systems
      </div>
    </footer>
  );
}
