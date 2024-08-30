"use client";

import { ModalProvider } from "@/contexts/modal.context";
import QueryProvider from "@/providers/query.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
