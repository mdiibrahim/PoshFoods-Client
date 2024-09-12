"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import Container from "@/components/ui/components";

const UIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Provider store={store}>
          <div className="container  mx-auto px-4">
            <Container>{children}</Container>
          </div>
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default UIProvider;
