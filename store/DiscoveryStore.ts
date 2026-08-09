import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "allow-cross-school-discovery";
const PROFILE_VISIBILITY_KEY = "allow-cross-school-profile-visibility";

type DiscoveryState = {
  allowCrossSchool: boolean;
  visibleToOtherSchools: boolean;
  initialized: boolean;
  initializeDiscovery: () => Promise<void>;
  setAllowCrossSchool: (enabled: boolean) => Promise<void>;
  setVisibleToOtherSchools: (enabled: boolean) => Promise<void>;
};

export const useDiscoveryStore = create<DiscoveryState>((set) => ({
  allowCrossSchool: false,
  visibleToOtherSchools: false,
  initialized: false,
  initializeDiscovery: async () => {
    const [storedDiscovery, storedVisibility] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEY),
      AsyncStorage.getItem(PROFILE_VISIBILITY_KEY),
    ]);
    set({
      allowCrossSchool: storedDiscovery === "true",
      visibleToOtherSchools: storedVisibility === "true",
      initialized: true,
    });
  },
  setAllowCrossSchool: async (enabled) => {
    set({ allowCrossSchool: enabled });
    await AsyncStorage.setItem(STORAGE_KEY, String(enabled));
  },
  setVisibleToOtherSchools: async (enabled) => {
    set({ visibleToOtherSchools: enabled });
    await AsyncStorage.setItem(PROFILE_VISIBILITY_KEY, String(enabled));
  },
}));
