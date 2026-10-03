import { useNavigate } from "react-router-dom";
import { useClock } from "../../hooks/lumora";
import { scrollToId } from "../../lib/scroll";
import { useUI } from "../../store/ui";
import { Hover, Reveal } from "./motion";
import { LogoMark, MenuLines } from "./icons";

export const NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "works" },
  { label: "Services", id: "services" },
  { label: "Studio", id: "about" },
  { label: "Careers", id: "careers" },
] as const;

export function Header() {
  const { time, date } = useClock();
  const openNav = useUI((s: any) => s.openNav);
  const openModal = useUI((s: any) => s.openModal);
  const navigate = useNavigate();

  return (
    <Reveal as="header" gate delay={150} from={{ opacity: 0, y: -14 }} className="absolute inset-x-0 top-0 z-50">
      <div className="shell flex items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6">
        <button onClick={() => scrollToId("home")} aria-label="NexaCore Systems — home">
          <Hover from={{ scale: 1 }} to={{ scale: 1.04 }} className="flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]">
            <LogoMark className="text-xl text-accent" /> NexaCore Systems
          </Hover>
        </button>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex gap-8 text-sm font-medium items-center">
            {NAV.map((n) => (
              <li key={n.label}>
                <button onClick={() => scrollToId(n.id)}>
                  <Hover kind="soft" from={{ y: 0, opacity: 0.8 }} to={{ y: -2, opacity: 1 }} className="inline-flex items-center gap-1">
                    {n.label}
                    {n.label === "Services" && <span className="text-xs opacity-60">▾</span>}
                  </Hover>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
      
          <button
            onClick={() => navigate("/signin")}
            className="hidden sm:inline-flex text-xs font-medium px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            Sign In
          </button>

          
          <button
            onClick={() => navigate("/signup")}
            className="hidden sm:inline-flex text-xs font-medium px-4 py-2 rounded-control bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>

          <div className="hidden items-center gap-3 rounded-control border border-line/80 bg-white/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-sm md:flex">
            <span className="text-foreground/45">Local time</span>
            <span className="min-w-14 font-medium tabular-nums text-foreground">{time}</span>
            <span className="text-foreground/30">•</span>
            <span className="font-medium">{date}</span>
          </div>

          <button onClick={openNav} aria-label="Open menu" className="rounded-control border border-line/80 bg-white/40 backdrop-blur-sm hover:bg-white/70">
            <Hover from={{ scale: 1 }} to={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider">
              <MenuLines className="text-sm" /> <span className="hidden sm:inline">Menu</span>
            </Hover>
          </button>
        </div>
      </div>
    </Reveal>
  );
}