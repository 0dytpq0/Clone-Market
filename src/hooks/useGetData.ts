import { dataQueryOptions } from "@/queries/queryOptions";
import { BucketContentType, DefaultContentType } from "@/types/Content.types";
import { HomePageData } from "@/types/Data.types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetData = () => {
  const getHomePageData = useQuery<HomePageData>(
    dataQueryOptions.fetchHomePageData()
  );

  const getNewProductPageData = useInfiniteQuery<
    { data: DefaultContentType[]; totalPages: number; hasNextPage: boolean }, // 반환 데이터 타입
    Error
  >({
    ...dataQueryOptions.fetchNewProductPageData(),
  });
  const getBucketPageData = useQuery<BucketContentType[]>(
    dataQueryOptions.fetchBucketPageData()
  );

  return { getHomePageData, getNewProductPageData, getBucketPageData };
};
