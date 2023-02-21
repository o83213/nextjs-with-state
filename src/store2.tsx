import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateTypes {
  id: number;
  user: any;
  setUser: (userData: any) => void;
  resetUser: () => void;
}

const initailizer = (
  set: (
    partial:
      | StateTypes
      | Partial<StateTypes>
      | ((state: StateTypes) => StateTypes | Partial<StateTypes>),
    replace?: boolean | undefined
  ) => void
) => ({
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

const persistedStore = create<StateTypes>()(
  persist(initailizer, { name: "user-storage" })
);

export function usePersistedStore<T>(
  selector: (state: StateTypes) => T,
  compare?: (a: T, b: T) => boolean
): T;

export function usePersistedStore<T>(
  selector: (state: StateTypes) => T,
  compare?: (a: T, b: T) => boolean
) {
  const store = persistedStore(selector, compare);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return isHydrated ? store : initailizer(selector);
}
