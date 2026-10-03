import { create } from "zustand";

export type AuthMode = "login" | "register";

interface AuthUIState {
  mode: AuthMode;
  shownMode: AuthMode; // what the form pane currently renders (swaps at the midpoint)
  animating: boolean;
  toggle: () => void;
  setShownMode: (m: AuthMode) => void;
  setAnimating: (a: boolean) => void;
}

export const useAuthUI = create<AuthUIState>((set, get) => ({
  mode: "login",
  shownMode: "login",
  animating: false,
  toggle: () => {
    if (get().animating) return;
    set({ mode: get().mode === "login" ? "register" : "login" });
  },
  setShownMode: (shownMode) => set({ shownMode }),
  setAnimating: (animating) => set({ animating }),
}));
