import { BucketContentType, DefaultContentType } from "@/types/Content.types";

function mergeBucketProducts(
  products: DefaultContentType[]
): BucketContentType[] {
  const productMap = new Map<string, BucketContentType>();

  products.forEach((product) => {
    const existingProduct = productMap.get(product.id);

    if (existingProduct) {
      existingProduct.order += 1;
    } else {
      productMap.set(product.id, { ...product, order: 1 });
    }
  });

  return Array.from(productMap.values());
}

export default mergeBucketProducts;
