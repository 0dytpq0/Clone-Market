import { loginService, signupService } from "@/services/auth.service";
import {
  fetchHomepageData,
  fetchNewProductpageData,
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
  homepageData: () => ({
    queryKey: dataKeys.home,
    queryFn: fetchHomepageData,
  }),
  newProductpageData: () => ({
    queryKey: dataKeys.newProduct,
    queryFn: fetchNewProductpageData,
  }),
};
