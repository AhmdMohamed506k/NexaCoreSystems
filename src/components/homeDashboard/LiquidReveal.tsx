import React, { useEffect, useRef } from "react";

type Props = {
  baseSrc?: string;
  revealedSrc?: string;
};




export function LiquidReveal({baseSrc = `../../../public/before.jpg`, revealedSrc = `../../../public/after.jpg`,}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const mask = document.createElement("canvas");
    const maskCtx = mask.getContext("2d");
    if (!ctx || !maskCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 1;
    let height = 1;
    let raf = 0;
    let inside = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Keep the reveal local. It is deliberately smaller than the old
    // accumulating brush so the hero never becomes completely monochrome.
    const radius = 175;

    const reveal = new Image();
    reveal.crossOrigin = "anonymous";
    reveal.src = revealedSrc;

    const drawCover = (image: HTMLImageElement, target: CanvasRenderingContext2D) => {
      if (!image.naturalWidth || !image.naturalHeight) return;

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;

      target.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = mask.width = Math.floor(width * dpr);
      canvas.height = mask.height = Math.floor(height * dpr);
      canvas.style.width = mask.style.width = `${width}px`;
      canvas.style.height = mask.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, width, height);
      maskCtx.clearRect(0, 0, width, height);

      if (!inside) {
        currentX = width / 2;
        currentY = height / 2;
        targetX = currentX;
        targetY = currentY;
      }
    };

    const drawReveal = () => {
      ctx.clearRect(0, 0, width, height);
      maskCtx.clearRect(0, 0, width, height);

      if (!inside || !reveal.complete || !reveal.naturalWidth) return;

      // Smooth the spotlight instead of snapping it to the pointer.
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      const gradient = maskCtx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        radius,
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.42, "rgba(255,255,255,.98)");
      gradient.addColorStop(0.72, "rgba(255,255,255,.72)");
      gradient.addColorStop(0.9, "rgba(255,255,255,.24)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      maskCtx.fillStyle = gradient;
      maskCtx.fillRect(0, 0, width, height);

      // Draw the monochrome version and clip it strictly to the spotlight.
      drawCover(reveal, ctx);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    };

    const render = () => {
      drawReveal();
      raf = requestAnimationFrame(render);
    };

    const pointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const nextInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      if (!nextInside) {
        inside = false;
        return;
      }

      inside = true;
      targetX = x;
      targetY = y;

    
      if (!currentX && !currentY) {
        currentX = x;
        currentY = y;
      }
    };

    const reset = () => {
      inside = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointerleave", reset);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerleave", reset);
    };
  }, [revealedSrc]);

  return (
    <div ref={hostRef} className="hd-liquid" aria-hidden="true">
      <img className="hd-liquid-base" src={baseSrc} alt="" />
      <canvas ref={canvasRef} className="hd-liquid-canvas" />
      <div className="hd-liquid-vignette" />
    </div>
  );
}
