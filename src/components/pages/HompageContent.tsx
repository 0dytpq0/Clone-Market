"use client";
import Header from "@/components/atom/Header";
import BannerSlider from "@/components/molecules/BannerSlider";
import ContentSection from "@/components/template/ContentSection";
import { useGetData } from "@/hooks/useGetData";

const HomePageContent = () => {
  const { getHomepageData } = useGetData();

  if (getHomepageData.isLoading) {
    return <div>Loading...</div>;
  }

  const data = getHomepageData.data;

  return (
    <div>
      <Header />
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
