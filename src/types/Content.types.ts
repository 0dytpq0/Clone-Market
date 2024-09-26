export type DefaultContentType = {
  h1Texts: string[];
  h2Texts: string[];
  h3Texts: string[];
  id: string;
  images: string[];
  pTexts: string[];
  spanTexts: string[];
};

export type BucketContentType = DefaultContentType & { order: number };
