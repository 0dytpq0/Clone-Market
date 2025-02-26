import NewProductPageContent from "@/components/pages/NewProductPageContent";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { dataQueryOptions } from "@/queries/queryOptions";

async function prefetchNewProductPageData() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    ...dataQueryOptions.fetchNewProductPageData(),
  });

  return dehydrate(queryClient);
}

export default async function NewProductPage() {
  const dehydratedState = await prefetchNewProductPageData();

  return (
    <div>
      <h1 className="w-full flex items-center justify-center text-3xl font-semibold py-10">
        신상품
      </h1>
      {/* ✅ 서버에서 첫 번째 데이터 미리 불러와서 Hydration */}
      <HydrationBoundary state={dehydratedState}>
        <NewProductPageContent />
      </HydrationBoundary>
    </div>
  );
}
