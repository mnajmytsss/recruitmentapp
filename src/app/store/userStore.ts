// userStore.ts
import { create } from "zustand";
import { UserStore, AuthStore } from "../types";
import { parseCookies } from 'nookies';

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "",
    email: "",
    password: "",
    pendidikan: "",
    pengalamanKerja: "",
    cv: "",
    suratLamaran: "",
    picture: "",
  },
  setUser: (user) => set({ user }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  showPassword: false,
}));

const { cookies } = parseCookies();

// export const useAuthStore = create<AuthStore>((set) => ({
//   isLoggedIn: !!cookies["next-auth.session-token"],
//   login: () => set({ isLoggedIn: true }),
//   logout: () => set({ isLoggedIn: false }),
// }));
