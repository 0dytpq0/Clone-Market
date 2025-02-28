"use client";

import Header from "@/components/atom/Header";
import { ModalProvider } from "@/contexts/modal.context";
import { useAuth } from "@/hooks/useAuth";
import QueryProvider from "@/providers/query.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {

  return (
    <QueryProvider>
      <ModalProvider>
        <Header />
        <div className="max-w-[1360px] mx-auto h-screen pt-20"> {children}</div>
      </ModalProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
