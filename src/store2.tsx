import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface emptyState {
  id: number;
  user: any;
  setUser: (userData: any) => void;
  resetUser: () => void;
}

const persistedStore = create<emptyState>()(
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

const noPersistStore = create<emptyState>()((set, get) => ({
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
}));

export function usePersistedStore<T>(
  selector: (state: emptyState) => T,
  compare?: (a: T, b: T) => boolean
): T;

export function usePersistedStore<T>(
  selector: (state: emptyState) => T,
  compare?: (a: T, b: T) => boolean
) {
  const store = persistedStore(selector, compare);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const returnStore = isHydrated ? store : noPersistStore;
  console.log("Store SSR", returnStore);
  return returnStore;
}

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
//   const store = persistedStore(selector, compare);
//   const [isHydrated, setHydrated] = useState(false);
//   useEffect(() => setHydrated(true), []);
//   return isHydrated ? store : createEmptyState;
// };

// const user = usePersistedStore((state) => state.user);
