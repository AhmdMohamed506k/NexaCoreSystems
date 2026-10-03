import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "../authContent/authComponents/AuthScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Lumora" },
      { name: "description", content: "Sign in or create your Lumora studio account." },
      { property: "og:title", content: "Sign in — Lumora" },
      { property: "og:description", content: "Sign in or create your Lumora studio account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthScreen,
});
