import { dataQueryOptions } from "@/queries/queryOptions";
import { HomePageData } from "@/types/Data.types";
import { useQuery } from "@tanstack/react-query";

export const useGetData = () => {
  const getHomePageData = useQuery<HomePageData>(
    dataQueryOptions.fetchHomePageData()
  );

  const getNewProductPageData = useQuery(
    dataQueryOptions.fetchNewProductPageData()
  );

  const getBucketPageData = useQuery(dataQueryOptions.fetchBucketPageData());

  return { getHomePageData, getNewProductPageData, getBucketPageData };
};
