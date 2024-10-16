"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReviewListItem from "../ReviewListItem/reviewListItem";
import { api } from "@/utils/api/api";

interface Title {
  id: number;
  name: string;
  description: string;
  trailer: string;
  likes: number;
  dislikes: number;
  reviews: number;
  image: string;
  slug: string;
}

interface TitlesResponse {
  titles: Title[];
  total: number;
}

const fetchTitles = async (page: number, limit: number) => {
  const response = await api.get<TitlesResponse>(
    `/titles?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const ReviewList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data } = useQuery<TitlesResponse>({
    queryKey: ["titles", page],
    queryFn: () => fetchTitles(page, limit),
    placeholderData: undefined,
    staleTime: 5000,
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page > 4 && page < totalPages - 3) {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      } else {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="max-w-[1200px]">
      {data?.titles.map((titles) => (
        <div key={titles.id} className="flex items-center space-x-2">
          <ReviewListItem {...titles} />
        </div>
      ))}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-black rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-gray-500"
        >
          ←
        </button>

        {generatePageNumbers().map((pageNum, index) =>
          typeof pageNum === "number" ? (
            <button
              key={index}
              onClick={() => setPage(pageNum)}
              disabled={pageNum === page}
              className={`w-10 h-10 rounded-full ${
                pageNum === page
                  ? "bg-white text-black"
                  : "bg-gray-500 text-black hover:bg-white"
              }`}
            >
              {pageNum}
            </button>
          ) : (
            <span key={index} className="px-2 py-2 text-gray-500">
              {pageNum}
            </span>
          )
        )}

        <button
          onClick={() => setPage((old) => (old < totalPages ? old + 1 : old))}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-black rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-gray-500"
        >
          →
        </button>
      </div>
    </div>
  );
};
