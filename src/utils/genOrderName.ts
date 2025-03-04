import { Bucket } from "@/types/Content.types";

export const genOrderName = (bucketData: Bucket) => {
  if(!bucketData) throw new Error()
  return (
    bucketData?.bucket[0].h3Texts[0] + ` 외 ${bucketData?.bucket.length}개` 
  );
};
