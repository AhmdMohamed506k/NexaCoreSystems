import { useEffect, useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function useClock() {
  const [now, setNow] = useState({ time: "9:41am", date: "12 March, 2025" });
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours();
      const time = `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}${h >= 12 ? "pm" : "am"}`;
      setNow({ time, date: `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}` });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function useAdaptiveGrid() {
  useEffect(() => {
    const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
    const apply = () => {
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + "px";
      else document.documentElement.style.removeProperty("font-size");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
}
