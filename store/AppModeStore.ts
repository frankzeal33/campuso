import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AppMode = "student" | "provider";

type AppModeState = {
  mode: AppMode;
  hasHydrated: boolean;
  setMode: (mode: AppMode) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useAppModeStore = create<AppModeState>()(
  persist(
    (set) => ({
      mode: "student",
      hasHydrated: false,
      setMode: (mode) => set({ mode }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "campuso-app-mode",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }) as AppModeState,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
