import React from "react";
import { ArrowUpRight } from "./icons";
import {LogoMark}from "../SourceCode/icons"

export function HomeFooter({ onStartProject, onNavigate }: { onStartProject: () => void; onNavigate?: (target: string) => void }) {
  return (
    <footer className="hd-footer">
      <div className="hd-footer-cta">
        <p className="hd-eyebrow hd-eyebrow-light"><span />NexaCore Systems studio</p>
        <h2>Need something new?<br /><em>Let’s get to work.</em></h2>
        <button className="hd-pill hd-pill-white" onClick={onStartProject}>Start a project <ArrowUpRight /></button>
      </div>
      <div className="hd-footer-grid">
        <button className="hd-footer-brand" onClick={() => onNavigate?.("home")}><LogoMark /><span>NexaCore Systems</span></button>
        <div><b>Company</b><button onClick={() => onNavigate?.("about")}>About</button><button onClick={() => onNavigate?.("contact")}>Contact</button></div>
        <div><b>Services</b><button onClick={() => onNavigate?.("branding")}>Branding</button><button onClick={() => onNavigate?.("product")}>Product</button></div>
        <div><b>Social</b><button onClick={() => onNavigate?.("instagram")}>Instagram</button><button onClick={() => onNavigate?.("linkedin")}>LinkedIn</button></div>
      </div>
      <div className="hd-footer-legal"><span>© {new Date().getFullYear()} NexaCore Systems Studio</span><span>Privacy · Terms</span><strong>NexaCore Systems</strong></div>
    </footer>
  );
}
