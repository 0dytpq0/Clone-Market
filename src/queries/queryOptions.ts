import { getUserInfo, login, logout, signup } from "@/services/auth.service";
import {
  appendBucket,
  fetchBucketPageData,
  fetchHomePageData,
  fetchNewProductPageData,
  patchBucket,
  postPayment,
  removeBucket,
} from "@/services/data.service";
import { authKeys, dataKeys, paymentKeys } from "./queryKeys";
import { DefaultContentType } from "@/types/Content.types";
import { QueryFunctionContext } from "@tanstack/react-query";
import { User } from "@/types/User.types";

export const authMutationOptions = {
  signup: () => ({
    mutationKey: authKeys.signup,
    mutationFn: signup,
  }),

  login: () => ({
    mutationKey: authKeys.login,
    mutationFn: login,
  }),
  logout: () => ({
    mutationKey: authKeys.logout,
    mutationFn: logout,
  }),
};
export const authQueryOptions = {
  getUserInfo: () => ({
    queryKey: authKeys.userInfo,
    queryFn: getUserInfo,
  }),
};
export const dataQueryOptions = {
  fetchHomePageData: () => ({
    queryKey: dataKeys.home,
    queryFn: fetchHomePageData,
  }),
  fetchNewProductPageData: () => ({
    queryKey: ["data", "newProduct"],
    queryFn: async ({ pageParam }: QueryFunctionContext) =>
      fetchNewProductPageData(pageParam as number),
    getNextPageParam: (
      lastPage: {
        data: DefaultContentType[];
        totalPages: number;
        hasNextPage: boolean;
      },
      allPages: Array<{
        data: DefaultContentType[];
        totalPages: number;
        hasNextPage: boolean;
      }>
    ): number | undefined => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },

    initialPageParam: 1,
  }),
  fetchBucketPageData: (user: User) => ({
    queryKey: [dataKeys.bucket, user],
    queryFn: () => fetchBucketPageData(user),
    retry: 3,
  }),
};
export const dataMutationOptions = {
  appendBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: appendBucket,
  }),

  removeBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: removeBucket,
  }),
  patchBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: patchBucket,
  }),
};
export const paymentMutationOptions = {
  appendPayment: () => ({
    mutationKey: paymentKeys.append,
    mutationFn: postPayment,
  }),
};
