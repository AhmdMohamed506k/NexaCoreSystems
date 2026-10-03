import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Hover } from "./motion";
import { ArrowRight, ArrowUpRight } from "./icons";

const pill = cva("inline-flex items-center gap-3 rounded-full text-sm font-medium", {
  variants: {
    variant: {
      dark: "bg-ink text-white",
      light: "bg-surface text-foreground",
      outline: "border border-line bg-transparent text-foreground",
    },
    withArrow: { true: "py-1.5 pl-6 pr-1.5", false: "py-3.5 px-7" },
  },
  defaultVariants: { variant: "dark", withArrow: false },
});

type PillProps = {
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  withArrow?: boolean;
  arrow?: "right" | "up-right";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function PillButton({ children, variant = "dark", withArrow = false, arrow = "right", href, onClick, type = "button", disabled }: PillProps) {
  const inner = (
    <>
      {children}
      {withArrow && (
        <span className={cn("grid size-9 place-items-center rounded-full text-base", variant === "dark" ? "bg-white text-ink" : "bg-ink text-white")}>
          <Hover root from={{ x: 0, y: 0 }} to={arrow === "right" ? { x: 3 } : { x: 2, y: -2 }} className="inline-flex">
            {arrow === "right" ? <ArrowRight /> : <ArrowUpRight />}
          </Hover>
        </span>
      )}
    </>
  );
  const cls = pill({ variant, withArrow });
  return (
    <Hover data-hover-root className="inline-block" from={{ scale: 1 }} to={{ scale: 1.04 }}>
      {href ? (
        <a href={href} onClick={onClick} className={cls}>{inner}</a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>
      )}
    </Hover>
  );
}

export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", tone === "dark" ? "text-foreground/70" : "text-white/70", className)}>
      <span className={cn("size-1.5 rounded-full", tone === "dark" ? "bg-foreground/50" : "bg-white/60")} />
      {children}
    </span>
  );
}

export function TagChip({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm text-white">{children}</span>;
}

export function AnimatedLink({ href, children, legal }: { href: string; children: ReactNode; legal?: boolean }) {
  return (
    <a href={href} className="inline-flex">
      <Hover kind="soft" from={legal ? { x: 0, opacity: 0.7 } : { x: 0, opacity: 0.65 }} to={legal ? { x: 3, opacity: 1 } : { x: 4, opacity: 1 }}>
        {children}
      </Hover>
    </a>
  );
}
