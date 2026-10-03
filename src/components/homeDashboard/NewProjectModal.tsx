import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Check, X } from "./icons";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject?: (project: { name: string; type: string; brief: string }) => Promise<void> | void;
};

export function NewProjectModal({ open, onOpenChange, onCreateProject }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Branding");
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("hd-lock-scroll");
    gsap.fromTo(".hd-modal-panel", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: "power3.out" });
    return () => document.body.classList.remove("hd-lock-scroll");
  }, [open]);

  if (!open) return null;

  const close = () => {
    if (loading) return;
    setSuccess(false);
    setName("");
    setBrief("");
    onOpenChange(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brief.trim()) return;
    setLoading(true);
    try {
      await onCreateProject?.({ name: name.trim(), type, brief: brief.trim() });
      if (!onCreateProject) await new Promise((r) => setTimeout(r, 800));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hd-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="hd-project-title">
      <div className="hd-modal-panel">
        <button className="hd-modal-close" onClick={close} aria-label="Close"><X /></button>
        {!success ? (
          <form onSubmit={submit}>
            <p className="hd-eyebrow"><span />New project</p>
            <h2 id="hd-project-title">Tell us what<br /><em>you’re building.</em></h2>
            <label>Project name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aster Labs" required /></label>
            <label>Type<select value={type} onChange={(e) => setType(e.target.value)}><option>Branding</option><option>Product</option><option>Mobile</option><option>Consulting</option></select></label>
            <label>Brief<textarea rows={4} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="A few words about the project, goals and timing…" required /></label>
            <button className="hd-pill hd-pill-dark hd-modal-submit" disabled={loading}>{loading ? "Creating…" : "Create project"} {!loading && <span>↗</span>}</button>
          </form>
        ) : (
          <div className="hd-modal-success" aria-live="polite">
            <div><Check /></div><p className="hd-eyebrow"><span />All set</p>
            <h2>Project created.</h2><p>We’ll set up your workspace and get back to you within one business day.</p>
            <button className="hd-pill hd-pill-dark" onClick={close}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
