import { usePersistedStore } from "../store2";

export default function Index() {
  // console.log("usePersistedStore", usePersistedStore);
  const state = usePersistedStore((state) => state);
  console.log("SSR");
  console.log(state);
  console.log(state.user);
  return <div>{JSON.stringify(state.user)}</div>;
}
