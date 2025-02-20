"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ReviewsSectionItem from "../ReviewsSectionItem/ReviewsSectionItem";
import { api } from "@/utils/api/api";
import { Title } from "../../[slug]/page";

interface ReviewSectionProps {
  data: Title | null;
}

interface Review {
  id: number;
  content: string;
  title_id: number;
  user_id: number;
}

interface ReviewsResponse {
  reviews: Review[];
  total: number;
}

interface Reaction {
  review_id: number;
  likes: number;
  dislikes: number;
  current_user_reaction: "like" | "dislike" | null;
}

const fetchReviews = async (
  page: number,
  limit: number,
  title_id: number | undefined
) => {
  const response = await api.get<ReviewsResponse>(
    `/reviews?page=${page}&limit=${limit}&title_id=${title_id}`
  );
  return response.data;
};

const fetchReactions = async (reviewIds: number[]) => {
  const response = await api.get<{ reactions: Reaction[] }>("/reaction/count", {
    params: {
      review_ids: reviewIds,
    },
    paramsSerializer: (params) =>
      params.review_ids.map((id: number) => `review_ids=${id}`).join("&"),
  });
  return response.data.reactions;
};

const ReviewsSection: React.FC<ReviewSectionProps> = ({ data: titleData }) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data } = useQuery<ReviewsResponse>({
    queryKey: ["reviews", page, titleData?.id],
    queryFn: () => fetchReviews(page, limit, titleData?.id),
    placeholderData: undefined,
    staleTime: 5000,
  });

  const reviewIds = data?.reviews.map((r) => r.id) || [];

  const { data: reactionsData } = useQuery<Reaction[]>({
    queryKey: ["reactions", reviewIds],
    queryFn: () => fetchReactions(reviewIds),
    enabled: reviewIds.length > 0,
  });

  const reactionMutation = useMutation({
    mutationFn: (variables: { reviewId: number; type: "like" | "dislike" }) =>
      api.post("/reaction", {
        review_id: variables.reviewId,
        type: variables.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", reviewIds] });
    },
  });

  const handleReaction = (reviewId: number, type: "like" | "dislike") => {
    reactionMutation.mutate({ reviewId, type });
  };

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
    <div className="flex flex-col py-2">
      <p className="text-white pl-4 pb-2 text-xl">
        Reviews: {data?.total || 0}
      </p>
      <div className="space-y-4">
        {data?.reviews.map((review) => {
          const reaction = reactionsData?.find(
            (r) => r.review_id === review.id
          ) || {
            likes: 0,
            dislikes: 0,
            current_user_reaction: null,
          };

          return (
            <div key={review.id} className="flex items-center space-x-2">
              <ReviewsSectionItem
                {...review}
                slug={titleData?.slug || ""}
                likes={reaction.likes}
                dislikes={reaction.dislikes}
                currentUserReaction={reaction.current_user_reaction}
                onLike={() => handleReaction(review.id, "like")}
                onDislike={() => handleReaction(review.id, "dislike")}
              />
            </div>
          );
        })}
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
    </div>
  );
};

export default ReviewsSection;
