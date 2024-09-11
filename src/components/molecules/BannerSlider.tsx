"use client";

import { DefaultContentType } from "@/types/Content.types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type BannerSliderProps = {
  banners: DefaultContentType[];
};

function BannerSlider({ banners }: BannerSliderProps) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="relative h-full max-h-[370px] w-full aspect-video mb-20"
      >
        {banners &&
          banners?.map((banner, idx) => {
            return (
              <SwiperSlide key={banner.id} className="">
                <Image
                  alt="banner"
                  src={banner.images[0] ?? "/"}
                  fill
                  priority={true}
                  className="object-cover"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

export default BannerSlider;
