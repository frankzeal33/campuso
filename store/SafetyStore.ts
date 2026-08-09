import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const CONTACTS_KEY = "campuso-trusted-contacts";
const REPORTS_KEY = "campuso-safety-reports";

export type TrustedContact = {
  id: string;
  name: string;
  phone: string;
  relationship: string;
};

export type SafetyReport = {
  id: string;
  category: string;
  location: string;
  description: string;
  anonymous: boolean;
  createdAt: string;
  status: "Submitted" | "Reviewing" | "Resolved";
};

type SafetyState = {
  contacts: TrustedContact[];
  reports: SafetyReport[];
  initializeSafety: () => Promise<void>;
  addContact: (contact: Omit<TrustedContact, "id">) => Promise<void>;
  updateContact: (id: string, contact: Omit<TrustedContact, "id">) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  addReport: (report: Omit<SafetyReport, "id" | "createdAt" | "status">) => Promise<void>;
};

export const useSafetyStore = create<SafetyState>((set, get) => ({
  contacts: [],
  reports: [],
  initializeSafety: async () => {
    const [contacts, reports] = await Promise.all([
      AsyncStorage.getItem(CONTACTS_KEY),
      AsyncStorage.getItem(REPORTS_KEY),
    ]);
    set({
      contacts: contacts ? JSON.parse(contacts) : [],
      reports: reports ? JSON.parse(reports) : [],
    });
  },
  addContact: async (contact) => {
    const updated = [{ ...contact, id: `contact-${Date.now()}` }, ...get().contacts];
    set({ contacts: updated });
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  },
  updateContact: async (id, contact) => {
    const updated = get().contacts.map((current) =>
      current.id === id ? { ...contact, id } : current,
    );
    set({ contacts: updated });
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  },
  removeContact: async (id) => {
    const updated = get().contacts.filter((contact) => contact.id !== id);
    set({ contacts: updated });
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  },
  addReport: async (report) => {
    const updated: SafetyReport[] = [
      {
        ...report,
        id: `report-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "Submitted",
      },
      ...get().reports,
    ];
    set({ reports: updated });
    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  },
}));
