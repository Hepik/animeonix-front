"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Title } from "../../[review_id]/page";
import { api } from "@/utils/api/api";

interface TitleSectionProps {
  title: Title | null;
}

interface Reaction {
  title_id: number;
  likes: number;
  dislikes: number;
  current_user_reaction: "like" | "dislike" | null;
}

const fetchReactions = async (titleIds: number[]): Promise<Reaction[]> => {
  const response = await api.get<{ reactions: Reaction[] }>("/reaction/count", {
    params: { title_ids: titleIds },
    paramsSerializer: (params) =>
      params.title_ids.map((id: number) => `title_ids=${id}`).join("&"),
  });
  return response.data.reactions;
};

const TittleSection: React.FC<TitleSectionProps> = ({ title }) => {
  const queryClient = useQueryClient();

  const { data: reactionsData } = useQuery<Reaction[]>({
    queryKey: ["reactions_title", title?.id],
    queryFn: () => fetchReactions(title?.id ? [title.id] : []),
    enabled: !!title?.id,
  });

  const reactionMutation = useMutation({
    mutationFn: async (variables: {
      titleId: number;
      type: "like" | "dislike";
    }) =>
      api.post("/reaction", {
        title_id: variables.titleId,
        type: variables.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reactions_title", title?.id],
      });
    },
  });

  const handleReaction = (type: "like" | "dislike") => {
    if (title) {
      reactionMutation.mutate({ titleId: title.id, type });
    }
  };

  if (!title) return <div>Loading</div>;
  return (
    <div className="flex text-white gap-4 justify-center">
      <div className="flex flex-col max-w-[280px] sm:max-w-[370px] w-full max-h-[580px] items-center border rounded-lg space-y-2 py-2 px-4">
        <div className="relative h-[290px] sm:h-[400px] w-[240px] sm:w-[350px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link href="/#" className="relative block w-full h-full">
            <Image
              src={title.image}
              alt="Bleach Image"
              priority
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <Link
          href="#"
          className="truncate max-w-full text-center text-3xl hover:text-blue-500"
        >
          {title.name}
        </Link>
        <div className="flex items-end space-x-1 text-base sm:text-xl">
          <p>{reactionsData?.[0]?.likes || 0}</p>
          <ThumbsUp
            onClick={() => handleReaction("like")}
            className={`cursor-pointer ${
              reactionsData?.[0]?.current_user_reaction === "like"
                ? "text-green-500"
                : ""
            }`}
          />

          <p>/</p>
          <ThumbsDown
            onClick={() => handleReaction("dislike")}
            className={`cursor-pointer ${
              reactionsData?.[0]?.current_user_reaction === "dislike"
                ? "text-red-500"
                : ""
            }`}
          />
          <p>{reactionsData?.[0]?.dislikes || 0}</p>
          <div className="flex pl-2">
            {reactionsData &&
            reactionsData[0]?.likes + reactionsData[0]?.dislikes > 0
              ? Number.isInteger(
                  (reactionsData[0]?.likes * 10) /
                    (reactionsData[0]?.likes + reactionsData[0]?.dislikes)
                )
                ? (
                    (reactionsData[0]?.likes * 10) /
                    (reactionsData[0]?.likes + reactionsData[0]?.dislikes)
                  ).toFixed(0)
                : (
                    (reactionsData[0]?.likes * 10) /
                    (reactionsData[0]?.likes + reactionsData[0]?.dislikes)
                  ).toFixed(1)
              : "0"}
            /10
            <Star className="text-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TittleSection;
