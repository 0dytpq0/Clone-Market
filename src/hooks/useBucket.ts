import { dataKeys } from "@/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataMutationOptions } from "../queries/queryOptions";

export const useBucket = () => {
  const queryClient = useQueryClient();
  const append = useMutation({
    ...dataMutationOptions.appendBucketData(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dataKeys.bucket }),
  });
  const remove = useMutation({
    ...dataMutationOptions.removeBucketData(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dataKeys.bucket }),
  });

  const patch = useMutation({
    ...dataMutationOptions.patchBucketData(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: dataKeys.bucket }),
  });
  return { append, remove, patch };
};
