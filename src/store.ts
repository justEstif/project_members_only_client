import create from 'zustand'
import { persist } from "zustand/middleware";
import { TAuth200, TGlobal } from "./types";

const useStore = create<TGlobal>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (auth: TAuth200) =>
        set((state) => ({
          ...state,
          user: auth.user,
          token: auth.token,
        })),
      logout: () =>
        set((state) => ({
          ...state,
          user: null,
          token: null,
        })),
    }),
    {
      name: "talaria-store",
    }
  )
);

export default useStore;
