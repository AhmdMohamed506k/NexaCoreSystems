import { useEffect } from "react";

export function useAdaptiveGrid() {
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width <= 640 || width <= 1024 || width <= 1440 || width <= 1920) return;
      const size = 16 - (16 * (((1920 - width) / 1920) * 100 * 0.6666) / 100);
      if (size > 16) document.documentElement.style.fontSize = `${size}px`;
      else document.documentElement.style.removeProperty("font-size");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
}
