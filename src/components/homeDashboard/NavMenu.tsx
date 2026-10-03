import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, X } from "./icons";
import { useClock } from "./hooks/useClock";

const items = ["Home", "Projects", "Messages", "Files", "Billing", "Support"];

export function NavMenu({ open, onOpenChange, onNavigate, onStartProject }: { open: boolean; onOpenChange: (v: boolean) => void; onNavigate?: (target: string) => void; onStartProject: () => void }) {
  const { time, date } = useClock();

  useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hd-nav-dialog-item", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .06, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div className="hd-nav-dialog" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="hd-nav-dialog-top"><span>LUMORA</span><button onClick={() => onOpenChange(false)} aria-label="Close menu"><X /></button></div>
      <nav>
        {items.map((item) => <button className="hd-nav-dialog-item" key={item} onClick={() => { onOpenChange(false); onNavigate?.(item.toLowerCase()); }}>{item}<ArrowUpRight /></button>)}
      </nav>
      <div className="hd-nav-dialog-bottom"><span>{date} · {time}</span><button onClick={onStartProject}>Start a project <ArrowUpRight /></button></div>
    </div>
  );
}
