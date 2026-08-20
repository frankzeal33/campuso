import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "campuso-anonymous-help";

export type HelpReply = {
  id: string;
  content: string;
  createdAt: string;
};

export type HelpPost = {
  id: string;
  category: "Academic" | "Social" | "Wellbeing" | "Financial";
  title: string;
  content: string;
  createdAt: string;
  helpful: number;
  replies: HelpReply[];
  isOwner?: boolean;
};

const starterPosts: HelpPost[] = [
  {
    id: "help-1",
    category: "Academic",
    title: "I feel behind in my coursework",
    content:
      "I missed a few lectures because I was unwell and now everything feels overwhelming. How can I catch up without burning out?",
    createdAt: "2026-08-09T08:30:00.000Z",
    helpful: 12,
    replies: [
      {
        id: "reply-1",
        content:
          "Start with one course, ask a classmate for the lecture outline, and speak with your lecturer during office hours. You do not have to fix everything in one day.",
        createdAt: "2026-08-09T09:10:00.000Z",
      },
    ],
  },
  {
    id: "help-2",
    category: "Wellbeing",
    title: "Finding it difficult to settle in",
    content:
      "I am new on campus and have not made close friends yet. What helped you feel less alone?",
    createdAt: "2026-08-08T17:00:00.000Z",
    helpful: 19,
    replies: [],
  },
];

type AnonymousHelpState = {
  posts: HelpPost[];
  initializeHelp: () => Promise<void>;
  addPost: (
    post: Pick<HelpPost, "category" | "title" | "content">,
  ) => Promise<string>;
  updatePost: (
    postId: string,
    post: Pick<HelpPost, "category" | "title" | "content">,
  ) => Promise<void>;
  addReply: (postId: string, content: string) => Promise<void>;
  markHelpful: (postId: string) => Promise<void>;
};

export const useAnonymousHelpStore = create<AnonymousHelpState>((set, get) => ({
  posts: starterPosts,
  initializeHelp: async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) set({ posts: JSON.parse(saved) });
  },
  addPost: async (post) => {
    const id = `help-${Date.now()}`;
    const updated: HelpPost[] = [
      {
        ...post,
        id,
        createdAt: new Date().toISOString(),
        helpful: 0,
        replies: [],
        isOwner: true,
      },
      ...get().posts,
    ];
    set({ posts: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return id;
  },
  updatePost: async (postId, values) => {
    const updated = get().posts.map((post) =>
      post.id === postId && post.isOwner ? { ...post, ...values } : post,
    );
    set({ posts: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  addReply: async (postId, content) => {
    const updated = get().posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: [
              ...post.replies,
              {
                id: `reply-${Date.now()}`,
                content,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : post,
    );
    set({ posts: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  markHelpful: async (postId) => {
    const updated = get().posts.map((post) =>
      post.id === postId ? { ...post, helpful: post.helpful + 1 } : post,
    );
    set({ posts: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
}));
