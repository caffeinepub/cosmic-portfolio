import { create } from "zustand";

interface SceneStore {
  currentScene: number;
  selectedPlanet: number | null;
  isTransitioning: boolean;
  goToScene: (n: number) => void;
  setSelectedPlanet: (idx: number | null) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 0,
  selectedPlanet: null,
  isTransitioning: false,
  goToScene: (n: number) => {
    set({ isTransitioning: true, selectedPlanet: null });
    setTimeout(() => {
      set({ currentScene: n, isTransitioning: false });
    }, 600);
  },
  setSelectedPlanet: (idx: number | null) => set({ selectedPlanet: idx }),
}));
