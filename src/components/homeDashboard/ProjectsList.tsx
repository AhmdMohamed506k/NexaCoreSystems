import React from "react";
import { ArrowUpRight } from "./icons";
import { projects } from "./data/welcome";

export function ProjectsList({ onOpenProject }: { onOpenProject?: (name: string) => void }) {
  return (
    <article className="hd-projects-card">
      <div className="hd-card-head"><div><p className="hd-eyebrow"><span />Projects</p><h3>Current work</h3></div><span>04 active</span></div>
      <div className="hd-project-rows mb-5">
        {projects.map((p, i) => (
          <button className="hd-project-row" key={p.name} onClick={() => onOpenProject?.(p.name)}>
            <span className="hd-project-index">0{i + 1}</span>
            <span className="hd-project-name"><b>{p.name}</b><small>{p.type}</small></span>
            <span className="hd-project-status">{p.status}</span>
            <span className="hd-project-progress"><i style={{ width: `${p.progress}%` }} /></span>
            <span className="hd-project-due">{p.due}</span>
            <ArrowUpRight className="hd-project-arrow" />
          </button>
        ))}
      </div>
    </article>
  );
}
