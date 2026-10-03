import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap, useGSAP } from "../../lib/gsap";
import { scrollToId, startScroll, stopScroll } from "../../lib/scroll";
import { useUI } from "../../store/ui";
import { useClock } from "../../hooks/lumora";
import { NAV } from "./Header";
import { PillButton } from "./ui";
import { LogoMark, X } from "./icons";

function NavContent() {



  const ref = useRef<HTMLDivElement>(null);
  const closeNav = useUI((s:any) => s.closeNav);
  const openModal = useUI((s:any) => s.openModal);
  const { time } = useClock();



  useGSAP(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.utils.toArray<HTMLElement>("[data-nav-item]").forEach((el, i) =>
      gsap.fromTo(el, { y: "1rem", opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: (i * 45 + 80) / 1000 }),
    );
  }, { scope: ref });
  const go = (id: string | null) => {
    closeNav();
    if (id) setTimeout(() => scrollToId(id), 50);
    else openModal();
  };
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="shell flex w-full items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center gap-2 text-lg font-semibold"><LogoMark className="text-xl text-accent-from" /> NexaCore Systems</div>
        <Dialog.Close className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:border-white/40 hover:text-white">
          <X className="text-sm" /> Close
        </Dialog.Close>
      </div>
      <nav className="shell flex w-full flex-1 flex-col justify-center px-5 sm:px-8" aria-label="Menu">
        <ul className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <li key={n.label}>
              <button data-nav-item onClick={() => go(n.id)} className="group flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-[-0.02em] sm:text-6xl">
                <span className="text-base font-normal text-white/30 group-hover:text-accent-from">0{i + 1}</span>
                <span className="text-white/70 transition-colors duration-300 group-hover:text-white">{n.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shell flex w-full flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs uppercase tracking-wide text-white/45 sm:flex-row sm:justify-between sm:px-8">
        <span>Local time — {time}</span>
        <button onClick={() => go(null)} className="text-left uppercase text-white/70 hover:text-white hover:underline">Start a project →</button>
      </div>
    </div>
  );
}

export function NavMenu() {

  const open = useUI((s:any) => s.navOpen);
  const closeNav = useUI((s:any) => s.closeNav);
  const modalOpen = useUI((s:any) => s.modalOpen);

  useEffect(() => {
    if (open) stopScroll();
    else if (!modalOpen) startScroll();
  }, [open, modalOpen]);


  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && closeNav()}>
      <Dialog.Portal>
        <Dialog.Content aria-describedby={undefined} className="fixed inset-0 z-[115] flex flex-col bg-ink text-white outline-none">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <NavContent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const schema = z.object({


  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  project: z.string().min(1, "Tell us a little about it"),


});



type FormData = z.infer<typeof schema>;

const field = "w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:bg-white";
const caption = "text-xs font-medium uppercase tracking-wide text-foreground/50";

function ModalPanel({ success, setSuccess }: { success: boolean; setSuccess: (v: boolean) => void }) {


  const ref = useRef<HTMLDivElement>(null);
  const closeModal = useUI((s:any) => s.closeModal);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });


  
  useGSAP(() => {gsap.fromTo(ref.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" });}, { scope: ref });


  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
  };


  return (
    <div ref={ref} className="relative w-full max-w-lg overflow-hidden rounded-card bg-white p-6 shadow-2xl ring-1 ring-line sm:p-8">
      <Dialog.Close aria-label="Close" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-surface text-foreground/60 hover:bg-surface-2 hover:text-foreground">
        <X />
      </Dialog.Close>
      {success ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-ink text-2xl text-accent-from"><LogoMark /></div>
          <Dialog.Title className="text-2xl font-semibold">Request received</Dialog.Title>
          <p className="max-w-[32ch] text-sm text-foreground/60">Thanks for reaching out — we'll get back to you within one business day.</p>
          <PillButton onClick={closeModal}>Close</PillButton>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
              <span className="size-1.5 rounded-full bg-accent" /> Start a project
            </span>
            <Dialog.Title className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">Tell us what you're building.</Dialog.Title>
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className={caption}>Name</span>
              <input type="text" placeholder="Your name" className={field} {...register("name")} />
              {errors.name && <span className="text-xs text-accent">{errors.name.message}</span>}
            </label>
            <label className="flex flex-col gap-2">
              <span className={caption}>Email</span>
              <input type="email" placeholder="you@company.com" className={field} {...register("email")} />
              {errors.email && <span className="text-xs text-accent">{errors.email.message}</span>}
            </label>
            <label className="flex flex-col gap-2">
              <span className={caption}>Project</span>
              <textarea rows={4} placeholder="A few words about your project, timeline, and budget." className={`${field} resize-none`} {...register("project")} />
              {errors.project && <span className="text-xs text-accent">{errors.project.message}</span>}
            </label>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-xs text-foreground/45">We reply within one business day.</span>
              <PillButton type="submit" withArrow arrow="up-right" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send request"}</PillButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export function RequestModal() {


  const open = useUI((s:any) => s.modalOpen);
  const closeModal = useUI((s:any) => s.closeModal);
  const navOpen = useUI((s:any) => s.navOpen);
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    if (open) stopScroll();
    else {
      if (!navOpen) startScroll();
      const t = setTimeout(() => setSuccess(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, navOpen]);


  
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-foreground/30 backdrop-blur-lg" />
        <Dialog.Content aria-describedby={undefined} className="fixed inset-0 z-[110] flex items-end justify-center p-4 outline-none sm:items-center"
          onPointerDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <ModalPanel success={success} setSuccess={setSuccess} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
