// services/dataService.ts

import { apiFetch } from "@/utils/apiFetch";

export const fetchHomepageData = async () => {
  const response = await apiFetch("/api/main", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const banners = response.slice(2, 5);
  const beauty = response.slice(7, 13);
  const best = response.slice(14);

  return { banners, beauty, best };
};

export const fetchNewProductpageData = async () => {
  const response = await apiFetch("/api/newProduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
