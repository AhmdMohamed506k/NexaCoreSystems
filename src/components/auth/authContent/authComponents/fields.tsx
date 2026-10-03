import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string | undefined; aside?: ReactNode };

export const controlCls =
  "w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:bg-white";

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field({ id, label, error, aside, ...rest }, ref) {
  return (
    <div data-reveal className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-foreground/50">{label}</label>
        {aside}
      </div>
      <input ref={ref} id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={controlCls} {...rest} />
      {error && <p id={`${id}-err`} className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
});

export const PasswordField = forwardRef<HTMLInputElement, FieldProps>(function PasswordField({ id, label, error, aside, ...rest }, ref) {
  const [show, setShow] = useState(false);
  return (
    <div data-reveal className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-foreground/50">{label}</label>
        {aside}
      </div>
      <div className="relative">
        <input ref={ref} id={id} type={show ? "text" : "password"} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${controlCls} pr-16`} {...rest} />
        <button type="button" aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-foreground/50 hover:text-foreground">
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p id={`${id}-err`} className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
});

export function Divider() {
  return (
    <div data-reveal className="flex items-center gap-3 text-xs uppercase tracking-wide text-foreground/40">
      <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
    </div>
  );
}
