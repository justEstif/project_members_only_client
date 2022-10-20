import create from "zustand/react";
import { persist } from "zustand/middleware";

interface IUser {
  id: string;
  role: string;
  name: string;
  userName: string;
  email: string;
  token: string;
}

interface IGlobal {
  user: IUser | null;
  loginUser: (user: IUser) => void;
  logoutUser: () => void;
}

const useStore = create<IGlobal>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (user: IUser) =>
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
      name: "user-store",
    }
  )
);

export default useStore;
