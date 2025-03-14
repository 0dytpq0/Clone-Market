"use client";
import BannerSlider from "@/components/molecules/BannerSlider";
import ContentSection from "@/components/template/ContentSection";
import { useGetData } from "@/hooks/useGetData";
import Loading from "../atom/Loading";
import { useAuth } from "@/hooks/useAuth";

const HomePageContent = () => {
  const { getHomePageData } = useGetData(null);

  if (getHomePageData.isLoading) {
    return <Loading />;
  }

  const data = getHomePageData.data;

  return (
    <div>
      {data?.banners && <BannerSlider banners={data.banners} />}
      {data?.beauty && (
        <ContentSection content={data.beauty} header="따끈따끈한 신상품!!" />
      )}
      {data?.best && (
        <ContentSection content={data.best} header="모두가 찾는 베스트 셀러!" />
      )}
    </div>
  );
};

export default HomePageContent;
