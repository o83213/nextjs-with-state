import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface emptyState {
  id: number;
  user: any;
  setUser: (userData: any) => void;
  resetUser: () => void;
}

const createEmptyState = (set: any, get: any) => ({
  id: 0,
  user: {
    isSignedIn: false,
  },
  setUser: (userData: any) => {
    set({ user: { ...userData } });
  },
  resetUser: () => {
    set({ user: {} });
  },
});

const usePersistedStore = create<emptyState>()(
  persist(
    (set) => ({
      id: 0,
      user: {
        isSignedIn: false,
      },
      setUser: (userData: any) => {
        set({ user: { ...userData } });
      },
      resetUser: () => {
        set({ user: {} });
      },
    }),
    { name: "user-storage" }
  )
);

const user = usePersistedStore((state) => state.user);

// export const useStore = <T,>({
//   selector,
//   compare,
// }: {
//   selector: (state: emptyState) => T;
//   compare?: (a: T, b: T) => boolean;
// }) => {
//   /*
//   This a fix to ensure zustand never hydrates the store before React hydrates the page.
//   Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
//   an error.
//    */
//   const store = usePersistedStore(selector, compare);
//   const [isHydrated, setHydrated] = useState(false);
//   useEffect(() => setHydrated(true), []);
//   return isHydrated ? store : createEmptyState;
// };
