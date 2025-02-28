import { getUserInfo, login, logout, signup } from "@/services/auth.service";
import {
  appendBucketService,
  fetchBucketpageData,
  fetchHomePageData,
  fetchNewProductPageData,
  patchBucketService,
  removeBucketService,
} from "@/services/data.service";
import { authKeys, dataKeys } from "./queryKeys";
import { DefaultContentType } from "@/types/Content.types";
import { QueryFunctionContext } from "@tanstack/react-query";

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
  appendBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: appendBucketService,
  }),
  fetchBucketPageData: () => ({
    queryKey: dataKeys.bucket,
    queryFn: fetchBucketpageData,
  }),
  removeBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: removeBucketService,
  }),
  patchBucketData: () => ({
    mutationKey: dataKeys.bucket,
    mutationFn: patchBucketService,
  }),
};
