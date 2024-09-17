import { DefaultContentType } from "@/types/Content.types";

function extractPrice(spanText: string) {
  return parseInt(spanText.replace(/[^0-9]/g, ""), 10);
}

export default function sortByPrice(data: DefaultContentType[], order = "asc") {
  return data.sort((a, b) => {
    const priceA = extractPrice(a.spanTexts[6]);
    const priceB = extractPrice(b.spanTexts[6]);

    if (order === "asc") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
}
