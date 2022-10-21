import create from 'zustand'
import { persist } from "zustand/middleware";
import { TAuth200, TGlobal } from "./types";

const useStore = create<TGlobal>()(
  persist(
    (set) => ({
      auth: null,
      login: (auth: TAuth200) =>
        set((state) => ({
          ...state,
          auth: auth
        })),
      logout: () =>
        set((state) => ({
          ...state,
          auth: null,
        })),
    }),
    {
      name: "talaria-store",
    }
  )
);

export default useStore;
