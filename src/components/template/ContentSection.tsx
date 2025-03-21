import { DefaultContentType } from "@/types/Content.types";
import CardSlider from "../molecules/CardSlider";

type ContentSectionProps = {
  content: DefaultContentType[];
  header: string;
  userId: string;
};

function ContentSection({ content, header, userId }: ContentSectionProps) {
  return (
    <div className="w-full flex flex-col items-center py-10 gap-y-8">
      <h1 className="font-bold text-3xl">{header}</h1>
      {content && <CardSlider content={content} userId={userId} />}
    </div>
  );
}

export default ContentSection;
