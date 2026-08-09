import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "campuso-saved-items";

export type SavedItem = {
  id: string;
  type: "Marketplace" | "Find" | "Events";
  title: string;
  subtitle: string;
  image?: string;
  icon?: string;
  route: string;
  params?: Record<string, string>;
};

type SavedItemsState = {
  items: SavedItem[];
  initialized: boolean;
  initializeSavedItems: () => Promise<void>;
  toggleSavedItem: (item: SavedItem) => Promise<void>;
  removeSavedItem: (id: string) => Promise<void>;
  isSaved: (id: string) => boolean;
};

export const useSavedItemsStore = create<SavedItemsState>((set, get) => ({
  items: [],
  initialized: false,
  initializeSavedItems: async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    set({ items: saved ? JSON.parse(saved) : [], initialized: true });
  },
  toggleSavedItem: async (item) => {
    const current = get().items;
    const updated = current.some((savedItem) => savedItem.id === item.id)
      ? current.filter((savedItem) => savedItem.id !== item.id)
      : [item, ...current];
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  removeSavedItem: async (id) => {
    const updated = get().items.filter((item) => item.id !== id);
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  isSaved: (id) => get().items.some((item) => item.id === id),
}));
