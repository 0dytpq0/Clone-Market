"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Customer, Payment } from "@/types/Payment.types";

interface BucketContextType {
  customer: Customer | null;
  payment: Payment | null;
  setCustomer: (customer: Customer) => void;
  setPayment: (data: Payment) => void;
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
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [payment, setPayment] = useState<Payment>(null);

  return (
    <BucketContext.Provider
      value={{
        customer,
        payment,
        setCustomer,
        setPayment,
      }}
    >
      {children}
    </BucketContext.Provider>
  );
};
