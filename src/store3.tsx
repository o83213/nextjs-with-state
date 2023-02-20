import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const bearStore = createStore<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

// function useBearStore(): BearState;
function useBearStore<T>(
  selector: (state: BearState) => T,
  equals?: (a: T, b: T) => boolean
): T;
function useBearStore<T>(
  selector?: (state: BearState) => T,
  equals?: (a: T, b: T) => boolean
) {
  return useStore(bearStore, selector!, equals);
}

const bear = useBearStore((state) => state.bears);
