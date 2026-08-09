import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "campuso-academic-planner";

export type PlannerItem = {
  id: string;
  type: "class" | "deadline";
  title: string;
  detail: string;
  day: string;
  time: string;
  completed?: boolean;
};

const starterItems: PlannerItem[] = [
  {
    id: "class-csc-301",
    type: "class",
    title: "CSC 301 · Data Structures",
    detail: "LT 2, Science Complex",
    day: "Monday",
    time: "9:00 AM",
  },
  {
    id: "class-mth-305",
    type: "class",
    title: "MTH 305 · Numerical Methods",
    detail: "Room B14",
    day: "Monday",
    time: "1:00 PM",
  },
  {
    id: "deadline-csc",
    type: "deadline",
    title: "Submit CSC 301 assignment",
    detail: "Algorithms worksheet",
    day: "Friday",
    time: "11:59 PM",
    completed: false,
  },
];

type PlannerState = {
  items: PlannerItem[];
  initializePlanner: () => Promise<void>;
  addPlannerItem: (item: Omit<PlannerItem, "id">) => Promise<void>;
  updatePlannerItem: (id: string, item: Omit<PlannerItem, "id">) => Promise<void>;
  toggleCompleted: (id: string) => Promise<void>;
  removePlannerItem: (id: string) => Promise<void>;
};

export const usePlannerStore = create<PlannerState>((set, get) => ({
  items: starterItems,
  initializePlanner: async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) set({ items: JSON.parse(saved) });
  },
  addPlannerItem: async (item) => {
    const updated = [{ ...item, id: `${item.type}-${Date.now()}` }, ...get().items];
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  updatePlannerItem: async (id, item) => {
    const updated = get().items.map((current) =>
      current.id === id ? { ...item, id } : current,
    );
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  toggleCompleted: async (id) => {
    const updated = get().items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  removePlannerItem: async (id) => {
    const updated = get().items.filter((item) => item.id !== id);
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
}));
