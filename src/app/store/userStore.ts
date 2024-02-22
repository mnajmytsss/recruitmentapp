// userStore.ts
import { create } from "zustand";
import { User } from "../types/index";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  toggleShowPassword: () => void;
  showPassword: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "",
    email: "",
    password: "",
    pendidikan: "",
    pengalamanKerja: "",
    cv: "",
    suratLamaran: "",
    userPhoto: "",
  },
  setUser: (user) => set({ user }),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  showPassword: false,
}));
