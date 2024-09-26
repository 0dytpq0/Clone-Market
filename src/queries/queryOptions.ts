import { loginService, signupService } from "@/services/auth.service";
import {
  appendBucketService,
  fetchBucketpageData,
  fetchHomePageData,
  fetchNewProductPageData,
  patchBucketService,
  removeBucketService,
} from "@/services/data.service";
import { authKeys, dataKeys } from "./queryKeys";

export const authMutationOptions = {
  signup: () => ({
    mutationKey: authKeys.signup,
    mutationFn: signupService,
  }),

  login: () => ({
    mutationKey: authKeys.login,
    mutationFn: loginService,
  }),
};

export const dataQueryOptions = {
  fetchHomePageData: () => ({
    queryKey: dataKeys.home,
    queryFn: fetchHomePageData,
  }),
  fetchNewProductPageData: () => ({
    queryKey: dataKeys.newProduct,
    queryFn: fetchNewProductPageData,
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
