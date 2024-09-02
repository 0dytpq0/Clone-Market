import Modal from "@/components/atom/Modal";
import { ReactNode, createContext, useContext, useState } from "react";

interface ModalOptions {
  title: string;
}

const initialValue = {
  open: (options: ModalOptions) => {},
  close: () => {},
};

const ModalContext = createContext<typeof initialValue>(initialValue);

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);
  const value = {
    open: (options: ModalOptions) => {
      setModalOptions(options);
    },
    close: () => {
      setModalOptions(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && <Modal title={modalOptions.title} />}
    </ModalContext.Provider>
  );
}
