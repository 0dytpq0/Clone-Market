import { dataQueryOptions } from "@/queries/queryOptions";
import { HomePageData } from "@/types/Data.types";
import { useQuery } from "@tanstack/react-query";

export const useGetData = () => {
  const getHomepageData = useQuery<HomePageData>(
    dataQueryOptions.homepageData()
  );

  const getNewProductpageData = useQuery(dataQueryOptions.newProductpageData());

  return { getHomepageData,getNewProductpageData };
};
