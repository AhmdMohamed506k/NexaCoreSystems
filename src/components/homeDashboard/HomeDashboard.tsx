import React, { useState } from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeHero } from "./HomeHero";
import { Overview } from "./Overview";
import { HomeFooter } from "./HomeFooter";
import { NavMenu } from "./NavMenu";
import { NewProjectModal } from "./NewProjectModal";
import "./homeDashboard.css";
import { PageLoader } from "../SourceCode/PageLoader";
import { useAuth } from "../auth/context/AuthContext";

export type HomeDashboardUser = {
  name: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
};

export type HomeDashboardProps = {
  user: HomeDashboardUser;
  showLoader?: boolean;
  onNavigate?: (target: string) => void;
  onSignOut?: () => void;
  onCreateProject?: (project: { name: string; type: string; brief: string }) => Promise<void> | void;
};

export default function HomeDashboard({
  user,
  showLoader = true,
  onNavigate,
  onSignOut,
  onCreateProject,
}: HomeDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
    const {setLoaderExit, loaderExit} = useAuth();
  
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const navigate = (target: string) => {
    onNavigate?.(target);
  };

  return (
    <div className="hd-root">
      <a className="hd-skip-link" href="#home-dashboard-main">Skip to content</a>

    
     <PageLoader exitUp={loaderExit} />    
     
      <HomeHeader
        user={user}
        onMenu={() => setMenuOpen(true)}
        onNavigate={navigate}
        onSignOut={onSignOut}
      />

      <main id="home-dashboard-main">
        <HomeHero
          user={user}
          onNavigate={navigate}
          onNewProject={() => setProjectModalOpen(true)}
        />
        <Overview
          onOpenProject={(project) => navigate(`project:${project}`)}
          onNewProject={() => setProjectModalOpen(true)}
        />
      </main>

      <HomeFooter
        onStartProject={() => setProjectModalOpen(true)}
        onNavigate={navigate}
      />

      <NavMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onNavigate={navigate}
        onStartProject={() => {
          setMenuOpen(false);
          setProjectModalOpen(true);
        }}
      />

      <NewProjectModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
        onCreateProject={onCreateProject}
      />
    </div>
  );
}
