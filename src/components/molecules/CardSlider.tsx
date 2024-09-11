import { DefaultContentType } from "@/types/Content.types";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ContentCard from "./ContentCard";

function CardSlider({ content }: { content: DefaultContentType[] }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      className="w-full h-[500px]"
      navigation={true}
      modules={[Navigation]}
    >
      {content?.map((content) => {
        if (!content.h3Texts[0]) return;
        return (
          <SwiperSlide key={content.id} className="relative">
            <ContentCard content={content} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CardSlider;
