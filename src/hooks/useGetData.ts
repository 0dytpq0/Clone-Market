import { dataQueryOptions } from "@/queries/queryOptions";
import { Bucket, DefaultContentType } from "@/types/Content.types";
import { HomePageData } from "@/types/Data.types";
import { User } from "@/types/User.types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetData = (user: User | null) => {
  const getHomePageData = useQuery<HomePageData>({
    ...dataQueryOptions.fetchHomePageData(),
  });

  const getNewProductPageData = useInfiniteQuery<
    { data: DefaultContentType[]; totalPages: number; hasNextPage: boolean }, // 반환 데이터 타입
    Error
  >({
    ...dataQueryOptions.fetchNewProductPageData(),
  });
  const getBucketPageData = useQuery<Bucket>({
    ...dataQueryOptions.fetchBucketPageData(user!),
  });

  return { getHomePageData, getNewProductPageData, getBucketPageData };
};
