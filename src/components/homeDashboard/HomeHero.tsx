import React from "react";
import { gsap } from "gsap";
import { useClock } from "./hooks/useClock";
import { useGreeting } from "./hooks/useGreeting";
import { LiquidReveal } from "../SourceCode/LiquidReveal";
import { RevealCard } from "./RevealCard";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Folder, Message, Plus, Receipt } from "./icons";
import { carouselProjects } from "./data/welcome";

type User = { name: string; email?: string; role?: string; avatarUrl?: string };

export function HomeHero({ user, onNavigate, onNewProject }: { user: User; onNavigate?: (target: string) => void; onNewProject: () => void }) {
  
  
  const { time, date, now } = useClock();
  const greeting = useGreeting(now);
  const [slide, setSlide] = React.useState(0);
  const project = carouselProjects[slide];
  const initials = user.name.split(/\s+/).map((x) => x[0]).slice(0, 2).join("").toUpperCase();

  const changeSlide = (dir: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSlide((s) => (s + dir + carouselProjects.length) % carouselProjects.length);
      return;
    }
    gsap.fromTo(".hd-carousel-content", { y: dir > 0 ? 14 : -14, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: "power4.out" });
    setSlide((s) => (s + dir + carouselProjects.length) % carouselProjects.length);
  };

  return (
    <section id="home" className="hd-hero">
      <LiquidReveal afterSrc="/before.jpg"  beforeSrc="/after.jpg" brushRadius={123} decay={0.026} />

      <div className="hd-hero-watermark">{user.name}</div>

      <div className="hd-hero-grid">
        <div className="hd-hero-copy">
          <p className="hd-eyebrow hd-animate-1"><span />{greeting}</p>
          <h1 className="hd-hero-title hd-animate-2">Welcome back,<br /><em>{user.name.split(/\s+/)[0]}.</em></h1>
          <p className="hd-hero-sub hd-animate-3">Your studio is moving. Here’s everything that needs your attention today.</p>

          <div className="hd-mini-stats hd-animate-4">
            <span><b>04</b> Active</span>
            <span><b>07</b> Due</span>
            <span><b>12</b> Messages</span>
          </div>

          <div className="hd-hero-actions hd-animate-5">
            <button className="hd-pill hd-pill-dark" onClick={onNewProject}>New project <Plus /></button>
            <button className="hd-pill hd-pill-light" onClick={() => onNavigate?.("projects")}>View projects <ArrowRight /></button>
          </div>

          <div className="hd-hero-status">
            <span className="hd-live-dot" /> All systems operational
            <span className="hd-status-date">{date} · {time}</span>
          </div>
        </div>

        <div className="hd-hero-side">
          <RevealCard className="hd-profile-card" tone="light">
            <div className="hd-profile-top">
              <div className="hd-large-avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}</div>
              <span className="hd-tag">Studio member</span>
            </div>
            <h3>{user.name}</h3>
            <p>{user.email || "Your studio account"}</p>
            <div className="hd-profile-meta"><span>Plan</span><b>Studio</b></div>
            <div className="hd-profile-meta"><span>Last sign-in</span><b>Live now</b></div>
          </RevealCard>

          <RevealCard className="hd-carousel" tone="dark">
            <div className="hd-carousel-top">
              <div className="hd-carousel-copy hd-carousel-content">
                <span className="hd-carousel-caption">{project.caption}</span>
                <h3>{project.title}</h3>
                <p>{project.progress}% complete</p>
              </div>
              <div className="hd-carousel-logo">L</div>
            </div>

            <div className="hd-progress mb-4
            "><span style={{ width: `${project.progress}%` }} /></div>

            <div className="hd-carousel-controls mb-5">
              <div className="hd-dots">{carouselProjects.map((_, i) => <button key={i} className={i === slide ? "is-active" : ""} onClick={() => setSlide(i)} aria-label={`Show project ${i + 1}`} />)}</div>
              <div><button onClick={() => changeSlide(-1)} aria-label="Previous project"><ChevronLeft /></button><button onClick={() => changeSlide(1)} aria-label="Next project"><ChevronRight /></button></div>
            </div>
          </RevealCard>

          <div className="hd-quick-actions">
            {[
              ["New", Plus, onNewProject],
              ["Chat", Message, () => onNavigate?.("messages")],
              ["Files", Folder, () => onNavigate?.("files")],
              ["Billing", Receipt, () => onNavigate?.("billing")],
            ].map(([label, Icon, action]: any) => (
              <button key={label as string} onClick={action} className="hd-quick">
                <span><Icon /></span><b>{label as string}</b><ArrowUpRight />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
