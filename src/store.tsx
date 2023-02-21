import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface StateTypes {
  bears: number;
  nuts: number;
  fishes: number;
  increasePopulation: () => void;
  increaseNuts: () => void;
  removeAllBears: () => void;
  getFisihes: () => Promise<void>;
}

export const useBearStore = create<StateTypes>((set) => ({
  bears: 0,
  nuts: 0,
  fishes: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  increaseNuts: () => set((state) => ({ nuts: state.nuts + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  removeAllBears: () => set({}, true),
  getFisihes: async () => {
    setTimeout(() => {
      console.log("after 5 second, you get a finsh 😁");
      set((state) => ({ fishes: state.fishes + 1 }));
    }, 5000);
  },
}));

// export const usePersistBearStore = create(
//   persist(
//     (set: any, get: any) => ({
//       bears: 0,
//       addABear: () => set({ bears: get().bears + 1 }),
//     }),
//     {
//       name: "food-storage", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//       getStorage: () => ({
//         // Returning a promise from getItem is necessary to avoid issues with hydration
//         getItem: async (name: string) => localStorage.getItem(name),
//         setItem: (name: string, value: string) =>
//           localStorage.setItem(name, value),
//         removeItem: (name: string) => localStorage.removeItem(name),
//       }),
//     }
//   )
// );
export const usePersistBearStore = create((set: any, get: any) => ({
  bears: 0,
  addABear: () => set({ bears: get().bears + 1 }),
}));

// const store = usePersistBearStore();
