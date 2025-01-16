"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import TitleListItem from "../TitleListItem/titleListItem";
import { api } from "@/utils/api/api";

interface Title {
  id: number;
  name: string;
  description: string;
  reviews: number;
  image: string;
  slug: string;
}

interface TitlesResponse {
  titles: Title[];
  total: number;
}

interface Reaction {
  title_id: number;
  likes: number;
  dislikes: number;
  current_user_reaction: "like" | "dislike" | null;
}

const fetchTitles = async (page: number, limit: number) => {
  const response = await api.get<TitlesResponse>(
    `/titles?page=${page}&limit=${limit}`
  );
  return response.data;
};

const fetchReactions = async (titleIds: number[]) => {
  const response = await api.get<{ reactions: Reaction[] }>("/reaction/count", {
    params: { title_ids: titleIds },
    paramsSerializer: (params) =>
      params.title_ids.map((id: number) => `title_ids=${id}`).join("&"),
  });
  return response.data.reactions;
};

export const TitleList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data: titlesData } = useQuery<TitlesResponse>({
    queryKey: ["titles", page],
    queryFn: () => fetchTitles(page, limit),
    staleTime: 5000,
  });

  const titleIds = titlesData?.titles.map((t) => t.id) || [];

  const { data: reactionsData } = useQuery<Reaction[]>({
    queryKey: ["reactions", titleIds],
    queryFn: () => fetchReactions(titleIds),
    enabled: titleIds.length > 0,
  });

  const reactionMutation = useMutation({
    mutationFn: (variables: { titleId: number; type: "like" | "dislike" }) =>
      api.post("/reaction", {
        title_id: variables.titleId,
        type: variables.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", titleIds] });
    },
  });

  const handleReaction = (titleId: number, type: "like" | "dislike") => {
    reactionMutation.mutate({ titleId, type });
  };

  const totalPages = titlesData ? Math.ceil(titlesData.total / limit) : 0;

  return (
    <div className="w-full">
      {titlesData?.titles.map((title) => {
        const reaction = reactionsData?.find(
          (r) => r.title_id === title.id
        ) || {
          likes: 0,
          dislikes: 0,
          current_user_reaction: null,
        };

        return (
          <TitleListItem
            key={title.id}
            id={title.id}
            name={title.name}
            description={title.description}
            likes={reaction.likes}
            dislikes={reaction.dislikes}
            currentUserReaction={reaction.current_user_reaction}
            reviews={title.reviews}
            image={title.image}
            slug={title.slug}
            onLike={() => handleReaction(title.id, "like")}
            onDislike={() => handleReaction(title.id, "dislike")}
          />
        );
      })}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-gray-500"
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-full ${
              p === page
                ? "bg-white text-black"
                : "bg-gray-500 text-white hover:bg-white hover:text-black"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-gray-500"
        >
          →
        </button>
      </div>
    </div>
  );
};
