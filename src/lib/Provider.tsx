"use client";

import { persistor, store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Container from "@/components/ui/components";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>{children}</Container>
        </PersistGate>
      </ReduxProvider>
    </NextUIProvider>
  );
};

export default Provider;
