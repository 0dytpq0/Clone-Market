"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Customer, Payment } from "@/types/Payment.types";

interface BucketContextType {
  customerData: Customer | null;
  checkoutData: Payment | null;
  setCustomer: (customer: Customer) => void;
  setCheckoutData: (data: Payment) => void;
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
  const [customerData, setCustomer] = useState<Customer | null>(null);
  const [checkoutData, setCheckoutData] = useState<Payment | null>(null);

  return (
    <BucketContext.Provider
      value={{ customerData, checkoutData, setCustomer, setCheckoutData }}
    >
      {children}
    </BucketContext.Provider>
  );
};
