import { dataQueryOptions } from "@/queries/queryOptions";
import { BucketContentType, DefaultContentType } from "@/types/Content.types";
import { HomePageData } from "@/types/Data.types";
import { useQuery } from "@tanstack/react-query";

export const useGetData = () => {
  const getHomePageData = useQuery<HomePageData>(
    dataQueryOptions.fetchHomePageData()
  );

  const getNewProductPageData = useQuery<DefaultContentType[]>(
    dataQueryOptions.fetchNewProductPageData()
  );

  const getBucketPageData = useQuery<BucketContentType[]>(
    dataQueryOptions.fetchBucketPageData()
  );

  return { getHomePageData, getNewProductPageData, getBucketPageData };
};
