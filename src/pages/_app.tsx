import { useCreateStore, Provider } from "../lib/store";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <Provider createStore={createStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
