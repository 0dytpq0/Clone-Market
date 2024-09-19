// services/dataService.ts

import { DefaultContentType } from "@/types/Content.types";
import { apiFetch } from "@/utils/apiFetch";

export const fetchHomePageData = async () => {
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

export const fetchNewProductPageData = async () => {
  const response = await apiFetch("/api/newProduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const appendBucketService = async (data: DefaultContentType) => {
  const response = await apiFetch("/api/bucket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  return response;
};

export const fetchBucketpageData = async () => {
  const response = await apiFetch("/api/bucket", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const removeBucketService = async (id: string) => {
  const response = await apiFetch("/api/bucket", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
};
