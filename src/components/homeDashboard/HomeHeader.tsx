import React, { useEffect, useRef, useState } from "react";
import { MenuLines, Logout } from "./icons";
import {LogoMark} from "../SourceCode/icons"
import { useClock } from "./hooks/useClock";
import { useAuth } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  user: { name: string; email?: string; role?: string; avatarUrl?: string };
  onMenu: () => void;
  onNavigate?: (target: string) => void;
  onSignOut?: () => void;
};

export function HomeHeader({ user, onMenu, onNavigate, onSignOut }: Props) {



  const { time } = useClock();
  const {logout} = useAuth();
  const Navigate = useNavigate()
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const initials = user.name.split(/\s+/).map((x) => x[0]).slice(0, 2).join("").toUpperCase();

  useEffect(() => {
    if (!accountOpen) return;
    const close = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [accountOpen]);

  const handleSignOut = () => {
    setAccountOpen(false);
    Navigate("/")
    logout()
    onSignOut?.();
  };

  return (
    <header className="hd-header">
      <button className="hd-brand" onClick={() => onNavigate?.("home")} aria-label="NexaCore Systems home">
        <LogoMark className="text-xl text-accent" /><span>NexaCore Systems</span>
      </button>

      <nav className="hd-nav" aria-label="Primary navigation">
        {[""].map((item) => (
          <button key={item} className={item === "Home" ? "is-active" : ""} onClick={() => onNavigate?.(item.toLowerCase())}>
            {item}
          </button>
        ))}
      </nav>

      <div className="hd-header-right">
        <span className="hd-clock">{time}</span>

        <div className="hd-account" ref={accountRef}>
          <button
            className={`hd-avatar ${accountOpen ? "is-open" : ""}`}
            onClick={() => setAccountOpen((open) => !open)}
            aria-label={`Open account menu for ${user.name}`}
            aria-haspopup="menu"
            aria-expanded={accountOpen}
          >
            {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}
          </button>

          {accountOpen && (
            <div className="hd-account-popover" role="menu" aria-label="Account menu">
              <div className="hd-account-head">
                <div className="hd-account-avatar">
                  {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials}
                </div>
                <div className="hd-account-identity">
                  <strong>{user.name}</strong>
                  <span>{user.email || "Your studio account"}</span>
                </div>
              </div>

              <div className="hd-account-status">
                <span className="hd-account-status-dot" />
                <div>
                  <b>{user.role || "Studio member"}</b>
                  <small>Account active</small>
                </div>
              </div>

              <div className="hd-account-divider" />

              <button className="hd-account-profile" role="menuitem" onClick={() => {
                setAccountOpen(false);
                onNavigate?.("profile");
              }}>
                <span>Profile</span>
                <span>↗</span>
              </button>

              <button className="hd-account-logout" role="menuitem" onClick={handleSignOut}>
                <Logout />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>

        <button className="hd-menu-button" onClick={onMenu} aria-label="Open menu"><MenuLines /></button>
      </div>
    </header>
  );
}
