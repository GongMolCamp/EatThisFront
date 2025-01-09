import { create } from "zustand";

interface ScrollState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isVisible: true,
  setIsVisible: (visible: boolean) => set({ isVisible: visible }),
}));
