"use client";
import { NextUIProvider } from "@nextui-org/react";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
const UIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <div className="h-screen w-full max-w-7xl md:mx-auto md:px-5">
            {children}
          </div>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default UIProvider;
