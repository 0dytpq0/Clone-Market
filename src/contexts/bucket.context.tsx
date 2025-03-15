"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Customer, Payment } from "@/types/Payment.types";

interface BucketContextType {
  payment: Payment | null;
  step: "product" | "payment";
  setPayment: (data: Payment) => void;
  setStep: (step: "product" | "payment") => void;
}

const BucketContext = createContext<BucketContextType | undefined>(undefined);

export const useBucketContext = () => {
  const context = useContext(BucketContext);
  if (!context) {
    throw new Error("useBucketContext must be used within a BucketProvider");
  }
  return context;
};

export const BucketProvider = ({ children }: { children: ReactNode }) => {
  const [payment, setPayment] = useState<BucketContextType["payment"]>(null);
  const [step, setStep] = useState<BucketContextType["step"]>("product");
  return (
    <BucketContext.Provider
      value={{
        payment,
        step,
        setPayment,
        setStep,
      }}
    >
      {children}
    </BucketContext.Provider>
  );
};
