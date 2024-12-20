"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api/api";

interface ReviewProps {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  slug: string;
  user_id: number;
  currentUserReaction?: "like" | "dislike" | null;
  onLike: () => void;
  onDislike: () => void;
}

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface Users {
  users: User[];
}

const ReviewsSectionItem: React.FC<ReviewProps> = ({
  id,
  content,
  likes,
  dislikes,
  slug,
  user_id,
  currentUserReaction,
  onLike,
  onDislike,
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user_id) return;
      try {
        setIsLoading(true);
        const response = await api.get<Users>(`/users/?id=${user_id}`);
        setUserInfo(response.data.users[0]);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-row max-[580px]:flex-col max-[580px]:items-center w-full py-2 bg-gray-700 border border-white rounded-lg text-white px-2 space-x-2">
      <div className="flex flex-col max-w-[120px] items-center space-y-2 px-2  pt-2">
        <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden bg-gray-200">
          <Link
            href={`/profile/${userInfo.username}`}
            className="relative block w-full h-full"
          >
            <Image
              src={userInfo.avatar}
              alt="User avatar"
              fill={true}
              sizes="15vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <Link
          href={`/profile/${userInfo.username}`}
          className="truncate max-w-full text-center hover:text-blue-500"
        >
          {userInfo.username}
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="w-full px-2 line-clamp-6 text-m max-h-[160px]  break-words"
      ></div>
      <div className="flex flex-col items-center space-y-1 w-[200px] pt-4 pb-2">
        <div className="flex space-x-1 text-m">
          <p>{likes}</p>
          <ThumbsUp
            onClick={onLike}
            className={`cursor-pointer ${
              currentUserReaction === "like" ? "text-green-500" : ""
            }`}
          />
          <p>/</p>
          <ThumbsDown
            onClick={onDislike}
            className={`cursor-pointer ${
              currentUserReaction === "dislike" ? "text-red-500" : ""
            }`}
          />
          <p>{dislikes}</p>
        </div>
        <div className="flex">
          {likes + dislikes > 0
            ? Number.isInteger((likes * 10) / (likes + dislikes))
              ? ((likes * 10) / (likes + dislikes)).toFixed(0)
              : ((likes * 10) / (likes + dislikes)).toFixed(2)
            : "0"}
          /10
          <Star className="text-amber-300" />
        </div>
        <Link href={`/tittle/${slug}/review/${id}`}>
          <Button className="border border-white max-[580px]:text-base max-[580px]:py-6 rounded-lg py-8 px-4 text-xl hover:text-black hover:bg-white">
            Read more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewsSectionItem;
