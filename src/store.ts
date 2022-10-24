import create from "zustand";
import { persist } from "zustand/middleware";
import { TAuth200, TGlobal, TUser } from "./types";

const useStore = create<TGlobal>()(
  persist(
    (set) => ({
      auth: null,
      login: (auth: TAuth200) =>
        set((state) => ({
          ...state,
          auth: auth,
        })),
      logout: () =>
        set((state) => ({
          ...state,
          auth: null,
        })),
      updateUser: (auth: TAuth200) =>
        set((state) => ({
          ...state,
          auth: auth,
        })),
    }),
    {
      name: "talaria-store",
    }
  )
);

export default useStore;
