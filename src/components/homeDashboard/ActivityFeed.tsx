import React from "react";
import { activities } from "./data/welcome";
import { Check } from "./icons";

export function ActivityFeed() {
  return (
    <article id="activity" className="hd-activity-card">
      <div className="hd-card-head"><div><p className="hd-eyebrow"><span />Activity</p><h3>Recent updates</h3></div><button className="hd-small-link">View all</button></div>
      <div className="hd-activity-list">
        {activities.map(([text, time], i) => (
          <div className="hd-activity" key={text}>
            <span className={`hd-activity-dot ${i === 0 ? "is-live" : ""}`}>{i === 2 ? <Check /> : ""}</span>
            <div><b>{text}</b><small>{time}</small></div>
          </div>
        ))}
      </div>
    </article>
  );
}
