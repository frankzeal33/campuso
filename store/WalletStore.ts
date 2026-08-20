import { create } from "zustand";

interface WalletBalances {
  total: number;
  bonus: number;
  playing: number;
  winning: number;
}

export interface WalletTransaction {
  id: string;
  title: string;
  note: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
}

interface WalletStore {
  wallet: WalletBalances;
  balanceLoading: boolean;
  hideWallet: string | null;
  transactions: WalletTransaction[];
  setWalletInfo: (data: WalletBalances) => void;
  setBalanceLoading: (loading: boolean) => void;
  setHideWallet: (status: string | null) => void;
  fundWallet: (amount: number) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  wallet: {
    total: 1750,
    bonus: 0,
    playing: 0,
    winning: 0,
  },
  balanceLoading: false,
  hideWallet: null,
  transactions: [
    {
      id: "wallet-1",
      title: "Welcome credit",
      note: "From Campuso",
      amount: 500,
      type: "credit",
      date: "Today, 9:20 AM",
    },
    {
      id: "wallet-2",
      title: "Data bundle",
      note: "MTN · 2 GB",
      amount: 750,
      type: "debit",
      date: "Aug 7, 4:12 PM",
    },
    {
      id: "wallet-3",
      title: "Wallet funding",
      note: "Bank card",
      amount: 2000,
      type: "credit",
      date: "Aug 5, 11:08 AM",
    },
  ],

  setWalletInfo: (data) => set({ wallet: data }),
  setBalanceLoading: (loading) => set({ balanceLoading: loading }),
  setHideWallet: (status) => set({ hideWallet: status }),
  fundWallet: (amount) =>
    set((state) => ({
      wallet: { ...state.wallet, total: state.wallet.total + amount },
      transactions: [
        {
          id: `wallet-${Date.now()}`,
          title: "Wallet funding",
          note: "Bank card",
          amount,
          type: "credit",
          date: "Just now",
        },
        ...state.transactions,
      ],
    })),
}));

export default useWalletStore;
