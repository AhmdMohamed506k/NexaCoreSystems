import { useRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { gsap, useGSAP } from "../../lib/gsap";
import { ArrowRight } from "../icons";

const pill = cva(
  "relative inline-flex items-center justify-center gap-3 rounded-pill text-sm font-medium transition-colors disabled:opacity-60",
  {
    variants: {
      variant: {
        dark: "bg-ink text-white",
        light: "bg-surface text-foreground",
        outline: "border border-line bg-transparent text-foreground hover:bg-surface/60",
      },
      withArrow: { true: "py-1.5 pl-6 pr-1.5 justify-between", false: "py-3.5 px-7" },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "dark", withArrow: false, full: false },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof pill> & { arrow?: "right" };

export function PillButton({ className, variant, withArrow, full, arrow = "right", children, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const el = ref.current!;
        const icon = el.querySelector("[data-arrow]");
        const enter = () => {
          if (el.disabled) return;
          gsap.to(el, { scale: 1.04, duration: 0.4, ease: "back.out(2)" });
          if (icon) gsap.to(icon, { x: 3, duration: 0.4, ease: "back.out(2)" });
        };
        const leave = () => {
          gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(2)" });
          if (icon) gsap.to(icon, { x: 0, duration: 0.4, ease: "back.out(2)" });
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <button ref={ref} className={cn(pill({ variant, withArrow, full }), className)} {...rest}>
      <span>{children}</span>
      {withArrow && arrow === "right" && (
        <span className={cn("grid size-9 place-items-center rounded-full", variant === "dark" || !variant ? "bg-white text-ink" : "bg-ink text-white")}>
          <ArrowRight data-arrow className="text-base" />
        </span>
      )}
    </button>
  );
}