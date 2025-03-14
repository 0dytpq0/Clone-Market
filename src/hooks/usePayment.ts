import { paymentMutationOptions } from "@/queries/queryOptions";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  const append = useMutation({ ...paymentMutationOptions.appendPayment() });

  return { append };
};
