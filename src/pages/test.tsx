import { useState, useMemo, useEffect } from "react";
//
import styles from "../styles/Home.module.css";
import { useBearStore } from "@/store";
import { useRouter } from "next/router";
//

const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);
  const [displayedBear, setDisplayedBear] = useState(0);
  useEffect(() => {
    setDisplayedBear(bears);
  }, [bears]);
  return <div>{displayedBear} around here...</div>;
};

export default function Index() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <BearCounter />
      <button
        onClick={() => {
          router.back();
        }}
      >
        Go back
      </button>
    </div>
  );
}
