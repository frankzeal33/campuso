import { create } from "zustand";

interface RefData {
  invitees: number;
  referralCode: string;
  totalEarned: number;
}

export interface ReferralHistoryItem {
  id: string;
  name: string;
  status: "earned" | "pending";
  points: number;
  date: string;
}

interface ReferralStore {
  refData: RefData;
  setReferralInfo: (payload: RefData) => void;
  referralLoading: boolean;
  setReferralLoading: (payload: boolean) => void;
  history: ReferralHistoryItem[];
}

export const useReferralStore = create<ReferralStore>((set) => ({
  refData: {
    invitees: 3,
    referralCode: "CAMPUSO-OD24",
    totalEarned: 120,
  },

  setReferralInfo: (payload) =>
    set(() => ({
      refData: payload,
    })),

  referralLoading: true,
  history: [
    { id: "ref-1", name: "Chiamaka joined Campuso", status: "earned", points: 50, date: "Aug 8" },
    { id: "ref-2", name: "Tobi completed verification", status: "earned", points: 50, date: "Aug 4" },
    { id: "ref-3", name: "Amara signed up", status: "pending", points: 20, date: "Aug 2" },
  ],

  setReferralLoading: (loading) => set({ referralLoading: loading }),
}));

// import { create } from 'zustand'

// interface ReferralWallet {
//   createdAt: string
//   id: string
//   pointsExpired: string
//   pointsUsed: string
//   referralBalance: string
//   updatedAt: string
//   userId: string
// }

// interface RefData {
//   pendingSignups: number
//   referralCode: string
//   referralWallet: ReferralWallet
//   referrals: any[] // Use specific type if available
//   signupsThatTransacted: number
//   totalSignups: number
// }

// interface ReferralStore {
//   refData: RefData
//   setReferralInfo: (payload: RefData) => void
//   referralLoading: boolean
//   setReferralLoading: (payload: boolean) => void
// }

// export const useReferralStore = create<ReferralStore>((set) => ({
//   refData: {
//     pendingSignups: 0,
//     referralCode: '',
//     referralWallet: {
//       createdAt: '',
//       id: '',
//       pointsExpired: '0',
//       pointsUsed: '0',
//       referralBalance: '0',
//       updatedAt: '',
//       userId: '',
//     },
//     referrals: [],
//     signupsThatTransacted: 0,
//     totalSignups: 0,
//   },

//   setReferralInfo: (payload) =>
//     set(() => ({
//       refData: payload,
//     })),

//   referralLoading: false,

//   setReferralLoading: (loading) => set({ referralLoading: loading }),
// }))
