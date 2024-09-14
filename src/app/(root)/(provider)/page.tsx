import HomePageContent from "@/components/pages/HompageContent";
import { dataQueryOptions } from "@/queries/queryOptions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const revalidate = 60;

async function getHomepageData() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(dataQueryOptions.homepageData());

  return dehydrate(queryClient);
}

export default async function HomePage() {
  const dehydratedState = await getHomepageData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePageContent />
    </HydrationBoundary>
  );
}
