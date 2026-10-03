import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { stats } from "./data/welcome";

function Spark({ values }: { values: number[] }) {
  const min = Math.min(...values), max = Math.max(...values);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 36 - ((v - min) / Math.max(1, max - min)) * 30;
    return `${x},${y}`;
  }).join(" ");

  return <svg className="hd-spark" viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, { n: value, duration: 1.2, delay: .15, ease: "power2.out", onUpdate: () => setDisplay(Math.round(obj.n)) });
    return () => tween.kill();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

export function StatsPanel() {
  return (
    <article className="hd-stats-panel">
      <div className="hd-panel-label"><span />Studio pulse</div>
      <div className="hd-stats-grid">
        {stats.map((item) => (
          <div className="hd-stat" key={item.label}>
            <span className="hd-stat-label">{item.label}</span>
            <strong><Counter value={item.value} suffix={item.suffix} /></strong>
            <Spark values={item.spark} />
          </div>
        ))}
      </div>
    </article>
  );
}
