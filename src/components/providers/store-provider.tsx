"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { hydrateAuth } from "@/store/slices/authSlice";

function AuthBootstrap({ store }: { store: AppStore }) {
  const bootstrapped = useRef(false);

  if (!bootstrapped.current) {
    bootstrapped.current = true;
    store.dispatch(hydrateAuth());
  }

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <AuthBootstrap store={storeRef.current} />
      {children}
    </Provider>
  );
}
