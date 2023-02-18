import { useStore } from "../store2";

export default function Index() {
  const state = useStore({});
  console.log("state", state);
  return (
    <div>
      <button
        onClick={() => {
          // setUser({ name: "test" });
        }}
      >
        add User
      </button>
      {JSON.stringify(state.user)}
    </div>
  );
}
