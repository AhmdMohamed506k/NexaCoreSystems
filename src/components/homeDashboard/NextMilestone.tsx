import React, { useEffect, useState } from "react";
import { ArrowRight, Clock, Star } from "./icons";
import { milestone } from "./data/welcome";

export function NextMilestone() {
  const [left, setLeft] = useState({ days: milestone.dueDays, hours: 0, mins: 0 });
  useEffect(() => {
    const end = Date.now() + milestone.dueDays * 86400000;
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms / 3600000) % 24);
      const mins = Math.floor((ms / 60000) % 60);
      setLeft({ days, hours, mins });
    };
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <article className="hd-milestone">
      <div className="hd-milestone-orb"><Star /></div>
      <div className="hd-panel-label"><Clock /> Next milestone</div>
      <h3>{milestone.title}</h3>
      <div className="hd-countdown">
        <div><b>{String(left.days).padStart(2, "0")}</b><span>days</span></div>
        <div><b>{String(left.hours).padStart(2, "0")}</b><span>hours</span></div>
        <div><b>{String(left.mins).padStart(2, "0")}</b><span>min</span></div>
      </div>
      <button className="hd-milestone-link">Open project <ArrowRight /></button>
    </article>
  );
}
