"use client";

import Header from "@/components/atom/Header";
import { ModalProvider } from "@/contexts/modal.context";
import QueryProvider from "@/providers/query.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ModalProvider>
        <Header />
        <div className="max-w-[1360px] mx-auto mt-12"> {children}</div>
      </ModalProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
