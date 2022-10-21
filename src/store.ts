import create from "zustand/react";
import { persist } from "zustand/middleware";
import { TGlobal, TUser } from "./types";

const useStore = create<TGlobal>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (user: TUser) =>
        set((state) => ({
          ...state,
          user: user,
        })),
      logoutUser: () =>
        set((state) => ({
          ...state,
          user: null,
        })),
    }),
    {
      name: "talaria-store",
    }
  )
);

export default useStore;
