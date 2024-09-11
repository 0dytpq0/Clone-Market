"use client";

import Header from "@/components/atom/Header";
import BannerSlider from "@/components/molecules/BannerSlider";
import { apiFetch } from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { data } = useQuery({
    queryKey: ["main"],
    queryFn: async () => {
      const response = await apiFetch("/api/main", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const banners = response.slice(2, 6);

      return { banners };
    },
  });
  console.log("data", data);
  return (
    <div>
      <Header />
      <BannerSlider banners={data?.banners} />
    </div>
  );
}

export default HomePage;
