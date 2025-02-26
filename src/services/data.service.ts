// services/dataService.ts

import { BucketContentType, DefaultContentType } from "@/types/Content.types";
import { apiFetch } from "@/utils/apiFetch";
import { QueryFunctionContext } from "@tanstack/react-query";

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

export const fetchNewProductPageData = async (pageParam: number): Promise<{
  data: DefaultContentType[];
  totalPages: number;
  hasNextPage: boolean;
}> => {
  const response = await apiFetch(`/api/newProduct?page=${pageParam}&limit=8`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }

  return response; // 반드시 `{ data, totalPages, hasNextPage }` 형태 반환
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

export const removeBucketService = async (ids: string[]) => {
  const response = await apiFetch("/api/bucket", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
  return response;
};

export const patchBucketService = async (data: BucketContentType) => {
  console.log("data", data);
  const response = await apiFetch("/api/bucket", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  return response;
};
