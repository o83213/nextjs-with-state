import { usePersistedStore } from "../store2";

export default function Index() {
  const { user, setUser, id } = usePersistedStore((state) => state);
  console.log("SSR");
  console.log(user, setUser, id);
  return (
    <div>
      <button
        onClick={() => {
          setUser({ name: "test" });
        }}
      >
        add User
      </button>
      <div>{id}</div>
    </div>
  );
}
