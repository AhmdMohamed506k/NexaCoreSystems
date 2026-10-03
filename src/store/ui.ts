import { create } from "zustand";

type UI = {
  ready: boolean;
  navOpen: boolean;
  modalOpen: boolean;
  setReady: (v: boolean) => void;
  openNav: () => void;
  closeNav: () => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useUI = create<UI>((set) => ({
  ready: false,
  navOpen: false,
  modalOpen: false,
  setReady: (ready) => set({ ready }),
  openNav: () => set({ navOpen: true }),
  closeNav: () => set({ navOpen: false }),
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));
