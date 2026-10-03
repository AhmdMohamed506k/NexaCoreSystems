import React from "react";
import { StatsPanel } from "./StatsPanel";
import { ProjectsList } from "./ProjectsList";
import { ActivityFeed } from "./ActivityFeed";
import { NextMilestone } from "./NextMilestone";

export function Overview({ onOpenProject, onNewProject }: { onOpenProject?: (name: string) => void; onNewProject: () => void }) {
  return (
    <section id="projects" className="hd-overview">
      <div className="hd-section-heading">
        <div><p className="hd-eyebrow"><span />Overview</p><h2>Your studio at a glance.</h2></div>
        <button className="hd-text-link" onClick={onNewProject}>Start something new <span>↗</span></button>
      </div>

      <div className="hd-bento">
        <StatsPanel />
        <NextMilestone />
        <ProjectsList onOpenProject={onOpenProject} />
        <ActivityFeed />
      </div>
    </section>
  );
}
