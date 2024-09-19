import { dataKeys } from "@/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataQueryOptions } from "../queries/queryOptions";

export const useBucket = () => {
  const queryClient = useQueryClient();
  const append = useMutation({
    mutationFn: dataQueryOptions.appendBucketData().mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dataKeys.bucket }),
  });
  const remove = useMutation({
    mutationFn: dataQueryOptions.removeBucketData().mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dataKeys.bucket }),
  });
  return { append, remove };
};
