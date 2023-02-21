import { usePersistedStore } from "../store2";

export default function Index() {
  const { user, setUser } = usePersistedStore((state) => state);
  return (
    <div>
      <button
        onClick={() => {
          setUser({ name: "test" });
        }}
      >
        add User
      </button>
      {JSON.stringify(user)}
    </div>
  );
}
