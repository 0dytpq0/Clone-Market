import NewProductPageContent from "@/components/pages/NewProductPageContent";
import { dataQueryOptions } from "@/queries/queryOptions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

async function prefetchNewProductPageData() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(dataQueryOptions.fetchNewProductPageData());

  return dehydrate(queryClient);
}

export default async function NewProductPage() {
  const dehydratedState = await prefetchNewProductPageData();

  return (
    <div>
      <h1 className="w-full flex items-center justify-center text-3xl font-semibold py-5 ">
        베스트
      </h1>
      <HydrationBoundary state={dehydratedState}>
        <NewProductPageContent />
      </HydrationBoundary>
    </div>
  );
}
