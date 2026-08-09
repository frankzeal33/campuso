import { create } from "zustand";

export interface UserProfile {
  phoneNumber: string;
  countryOfResidence: string;
  email: string;
  fullName: string;
  profilePicture: string;
  userName: string;
  kycVerified: boolean;
  gender: string;
  isProfileCreated: boolean;
  dateOfBirth: string;
  isEmailVerified: boolean;
  school: string;
  course: string;
  level: string;
  bio: string;
  interests: string[];
}

interface ProfileStore {
  userProfile: UserProfile;
  email: string;
  setProfile: (profile: UserProfile) => void;
  setEmail: (email: string) => void;
  clearProfile: () => void;
}

const defaultUserProfile: UserProfile = {
  phoneNumber: "",
  countryOfResidence: "",
  email: "",
  fullName: "",
  userName: "",
  profilePicture: "",
  kycVerified: false,
  gender: "",
  isProfileCreated: false,
  dateOfBirth: "",
  isEmailVerified: false,
  school: "",
  course: "",
  level: "",
  bio: "",
  interests: [],
};

export const useProfileStore = create<ProfileStore>((set) => ({
  userProfile: defaultUserProfile,
  email: "",

  setProfile: (profile) =>
    set(() => ({
      userProfile: { ...defaultUserProfile, ...profile },
    })),

  setEmail: (email) =>
    set(() => ({
      email,
    })),

  clearProfile: () =>
    set(() => ({
      userProfile: defaultUserProfile,
    })),
}));
