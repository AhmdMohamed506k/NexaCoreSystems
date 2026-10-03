import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", tone === "light" ? "text-white/70" : "text-foreground/60", className)}>
      <span className={cn("size-1.5 rounded-full", tone === "light" ? "bg-white/60" : "bg-accent")} />
      {children}
    </span>
  );
}
