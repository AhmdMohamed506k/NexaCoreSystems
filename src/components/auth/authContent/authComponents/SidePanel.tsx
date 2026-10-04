import { forwardRef } from "react";
import { LogoMark } from "../icons";
import { Eyebrow } from "../ui/Eyebrow";
import { useAuthUI } from "../../store/auth-ui";
import { SidePanelScene } from "./SidePanelScene";
import { Hover } from "../../../SourceCode/motion";
import { useNavigate } from "react-router-dom";

const COPY = {
  login: { h: "Good to see you again.", s: "Sign in to pick up exactly where you left off." },
  register: { h: "Let's build something bold.", s: "Create an account and start shipping with quiet precision." },
};




export const SidePanel = forwardRef<HTMLElement>(function SidePanel(_, ref) {
  const shown = useAuthUI((s) => s.shownMode);
  const c = COPY[shown];



  const navegate = useNavigate()






  return (
    <aside ref={ref} className="absolute inset-y-0 left-0 hidden w-1/2 flex-col justify-between overflow-hidden bg-scene-deep p-10 text-white lg:flex xl:p-14">
      <SidePanelScene />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/10 via-transparent to-ink/45" />
      <button onClick={() => navegate("/")} aria-label="NexaCore Systems — home">
        <Hover from={{ scale: 1 }} to={{ scale: 1.04 }} className="flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]">
          <LogoMark className="text-xl text-accent" /> NexaCore Systems
        </Hover>
      </button>
      <div className="relative z-10 flex max-w-[250px] flex-col gap-3 xl:max-w-[490px]">
        <Eyebrow tone="light">Independent Studio</Eyebrow>
        <h1 data-headline key={shown} className="max-w-[14ch] text-3xl font-semibold leading-tight tracking-[-0.02em] xl:text-5xl">{c.h}</h1>
        <p className="max-w-[30ch] text-sm text-white/55">{c.s}</p>
        <p className="mt-8 text-xl uppercase tracking-wide text-white/35">Bold ideas, shipped with quiet precision.</p>
      </div>
    </aside>
  );
});
