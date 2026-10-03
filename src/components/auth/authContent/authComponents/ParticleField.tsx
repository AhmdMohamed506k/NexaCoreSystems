import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/gsap";

const COLORS = ["#b15f2c", "#cf8047", "#97501f"];
const RADIUS = 160;
const LINK = 90;

interface P { x: number; y: number; r: number; a: number; ba: number; vx: number; vy: number; bvx: number; bvy: number; c: string; k: number; life?: number }
const MAX_EXTRA = 60;

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // the host must be a positioning context for the absolute canvas
    if (getComputedStyle(host).position === "static") host.style.position = "relative";

    let w = 0, h = 0;
    let ps: P[] = [];

    const seed = () => {
      const n = w < 640 ? 75 : w < 1024 ? 110 : 145;
      ps = Array.from({ length: n }, () => {
        const vx = (Math.random() - 0.5) * 0.1, vy = (Math.random() - 0.5) * 0.1;
        const ba = 0.15 + Math.random() * 0.25;
        return { x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 1.6, a: ba, ba, vx, vy, bvx: vx, bvy: vy, c: COLORS[(Math.random() * 3) | 0]!, k: 0 };
      });
    };
    const measure = () => {
      // size = the host (white pane) only, NOT the window
      const nw = host.clientWidth, nh = host.clientHeight;
      if (nw === 0 || nh === 0) return;
      const first = w === 0;
      w = nw; h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first || ps.length === 0) seed();
    };
    measure();

    const ptr = { x: -9999, y: -9999, t: -1e9 };
    let boost = 0, boostTarget = 0, extras: P[] = [];

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const active = time - ptr.t < 2500;
      const pulse = 0.5 + 0.5 * Math.sin(time / 1400);
      boost += (boostTarget - boost) * 0.07;
      const radius = RADIUS + 110 * boost;
      extras = extras.filter((p) => (p.life ?? 0) > 0.02);
      const all = ps.concat(extras);
      for (const p of all) {
        const dx = p.x - ptr.x, dy = p.y - ptr.y;
        const d = Math.hypot(dx, dy);
        let target = 0;
        if (active && d < radius) {
          target = (1 - d / radius) * (1 + boost * 0.8);
          if (p.life !== undefined) {
            const pull = 0.05 * (1 - d / (radius * 2));
            p.vx -= (dx / (d || 1)) * pull;
            p.vy -= (dy / (d || 1)) * pull;
          } else {
            const f = target * (0.12 + boost * 0.1);
            p.vx += (dx / (d || 1)) * f;
            p.vy += (dy / (d || 1)) * f;
          }
        } else if (!active) {
          const cd = Math.hypot(p.x - w / 2, p.y - h / 2);
          if (cd < 180) target = (1 - cd / 180) * pulse * 0.6;
        }
        p.k += (Math.min(1.6, target) - p.k) * 0.08;
        p.vx += (p.bvx - p.vx) * 0.04;
        p.vy += (p.bvy - p.vy) * 0.04;
        p.x += p.vx; p.y += p.vy;
        if (p.life !== undefined) {
          p.life -= active && boost > 0.1 ? 0.004 : 0.02;
          p.a = p.ba * Math.min(1, p.life * 2);
        } else {
          if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
          if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
          p.a = p.ba + (p.ba * 2.2 - p.ba) * Math.min(1, p.k);
        }
      }
      // lines
      ctx.lineWidth = 1;
      const linkDist = LINK + 40 * boost;
      for (let i = 0; i < all.length; i++) {
        const a = all[i]!; if (a.k < 0.08) continue;
        for (let j = i + 1; j < all.length; j++) {
          const b = all[j]!; if (b.k < 0.08) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(177,95,44,${(0.05 + 0.1 * (1 - d / linkDist)) * Math.min(1, (a.k + b.k))})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of all) {
        ctx.globalAlpha = Math.min(1, p.a);
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + p.k * 0.6), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    };

    if (prefersReducedMotion()) {
      draw(0);
      const ro = new ResizeObserver(() => { measure(); draw(0); });
      ro.observe(host);
      return () => ro.disconnect();
    }

    let lastX = -1, lastY = -1;

    const reset = () => {
      boostTarget = 0;
      ptr.x = -9999; ptr.y = -9999; ptr.t = -1e9; // effect off immediately
      lastX = -1;
    };

    const onMove = (e: PointerEvent) => {
      const fr = host.getBoundingClientRect();
      // local coordinates inside the white pane
      const x = e.clientX - fr.left, y = e.clientY - fr.top;
      const inForm = x >= 0 && x <= fr.width && y >= 0 && y <= fr.height;
      if (!inForm) { reset(); return; }

      boostTarget = 1;
      const dx = lastX < 0 ? 0 : x - lastX, dy = lastX < 0 ? 0 : y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = dist > 6 ? Math.min(3, Math.max(1, Math.floor(dist / 8))) : 0;
      for (let s = 0; s < steps && extras.length < MAX_EXTRA; s++) {
        const t = (s + 1) / (steps + 1);
        const jx = (Math.random() - 0.5) * 10, jy = (Math.random() - 0.5) * 10;
        const vx = dx * 0.15 + (Math.random() - 0.5) * 0.5;
        const vy = dy * 0.15 + (Math.random() - 0.5) * 0.5;
        const ba = 0.35 + Math.random() * 0.45;
        extras.push({
          x: x - dx * t + jx, y: y - dy * t + jy,
          r: 0.8 + Math.random() * 2, a: ba, ba, vx, vy, bvx: vx, bvy: vy,
          c: COLORS[(Math.random() * 3) | 0]!, k: 1, life: 1,
        });
      }
      lastX = x; lastY = y;
      ptr.x = x; ptr.y = y; ptr.t = performance.now();
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", reset);

    let raf = 0;
    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
    const onVis = () => (document.visibilityState === "visible" ? start() : cancelAnimationFrame(raf));
    document.addEventListener("visibilitychange", onVis);
    start();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}