import { createFileRoute } from "@tanstack/react-router";
import { useAdaptiveGrid } from "../hooks/lumora";
import { PageLoader } from "../components/SourceCode/PageLoader";
import { Header } from "../components/SourceCode/Header";
import { Hero } from "../components/SourceCode/Hero";
import { About, CreateBand, Portfolio, Services, Stats } from "../components/SourceCode/Sections";
import { Footer } from "../components/SourceCode/Footer";
import { NavMenu, RequestModal } from "../components/SourceCode/Overlays";

const TITLE = "NexaCore Systems — Full-Stack Engineering & Product Studio";
const DESC = "NexaCore Systems is a full-stack engineering studio crafting scalable solutions, products, and the systems that connect them — bold ideas, shipped with quiet precision.";

export const Route = createFileRoute("/")({


  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export function Index() {
  useAdaptiveGrid();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[.875rem] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white">
        Skip to content
      </a>
      <PageLoader />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <CreateBand />
        <Portfolio />
        <Services />
        <Stats />
      </main>
      <Footer />
      <NavMenu />
      <RequestModal />
    </>
  );
}
