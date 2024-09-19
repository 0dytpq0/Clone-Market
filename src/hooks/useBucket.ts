// src/hooks/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import { dataQueryOptions } from "../queries/queryOptions";

export const useBucket = () => {
  const append = useMutation(dataQueryOptions.appendBucketData());
  const remove = useMutation(dataQueryOptions.removeBucketData());
  return { append, remove };
};
