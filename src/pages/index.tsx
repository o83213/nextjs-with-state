import { useState, useMemo, useEffect } from "react";
import { shallow } from "zustand/shallow";
//
import styles from "../styles/Home.module.css";
import { useBearStore, usePersistBearStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
//

const BearCounter = () => {
  const bears = usePersistBearStore((state) => state.bears);

  return <div>{bears} around here...</div>;
};

export default function Home() {
  const router = useRouter();
  const { addABear } = usePersistBearStore();
  // console.log("re render!");
  return (
    <div className={styles.main}>
      <button onClick={addABear}>add bears</button>
      <BearCounter />

      <Link href={"/test"}>Go to test</Link>
      <button
        onClick={() => {
          router.push("/test");
        }}
      >
        Go by Router!
      </button>
    </div>
  );
}
