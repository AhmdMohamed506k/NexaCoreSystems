import { useEffect, useRef } from "react";

type Props = { beforeSrc: string; afterSrc: string; brushRadius?: number; decay?: number };

export function LiquidReveal({ beforeSrc, afterSrc, brushRadius = 143, decay = 0.016 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = wrap.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const radius = brushRadius * dpr;
    const diam = Math.ceil(radius * 2);
    const c = diam / 2;
    const cover = document.createElement("canvas");
    const coverCtx = cover.getContext("2d")!;
    const brush = document.createElement("canvas");
    brush.width = brush.height = diam;
    const bctx = brush.getContext("2d")!;
    const img = new Image();
    img.crossOrigin = "anonymous";
    let loaded = false;

    const buildCover = () => {
      cover.width = canvas.width;
      cover.height = canvas.height;
      if (!loaded) return;
      const s = Math.max(cover.width / img.naturalWidth, cover.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      coverCtx.drawImage(img, (cover.width - w) / 2, (cover.height - h) / 2, w, h);
    };
    const measure = () => {
      const r = container.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      buildCover();
    };
    img.onload = () => { loaded = true; buildCover(); };
    img.src = beforeSrc;

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    measure();

    const queue: [number, number][] = [];
    let last: [number, number] | null = null;
    let idle = 0;
    let raf = 0;
    let running = false;

    const stamp = (x: number, y: number) => {
      bctx.clearRect(0, 0, diam, diam);
      bctx.globalCompositeOperation = "source-over";
      const g = bctx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,.82)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      bctx.fillStyle = g;
      bctx.fillRect(0, 0, diam, diam);
      bctx.globalCompositeOperation = "source-in";
      bctx.drawImage(cover, x - c, y - c, diam, diam, 0, 0, diam, diam);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brush, x - c, y - c);
    };

    const tick = () => {
      const drawing = queue.length > 0;
      if (drawing) idle = 0;
      else idle++;
      if (idle > 120) { running = false; return; }
      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (drawing && loaded) { for (const [x, y] of queue) stamp(x, y); }
      queue.length = 0;
      if (idle === 120) ctx.clearRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr;
      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) { last = null; return; }
      if (last) {
        const dx = x - last[0], dy = y - last[1];
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) queue.push([last[0] + (dx * i) / n, last[1] + (dy * i) / n]);
      } else queue.push([x, y]);
      last = [x, y];
      if (!running) { running = true; idle = 0; raf = requestAnimationFrame(tick); }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [beforeSrc, brushRadius, decay]);

  return (
    <div ref={wrap} className="absolute inset-0 z-0">
      <img src={afterSrc} alt="" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
    </div>
  );
}
