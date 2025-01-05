"use client";

import Image from "next/image";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import Link from "next/link";

interface TitleProps {
  id: number;
  name: string;
  description: string;
  likes: number;
  dislikes: number;
  reviews: number;
  image: string;
  slug: string;
  currentUserReaction: "like" | "dislike" | null;
  onLike: () => void;
  onDislike: () => void;
}

const TitleListItem: React.FC<TitleProps> = ({
  id,
  name,
  description,
  likes,
  dislikes,
  reviews,
  image,
  slug,
  currentUserReaction,
  onLike,
  onDislike,
}) => {
  return (
    <div className="bg-gray-700 rounded-lg text-white border shadow-sm px-2 pb-2 w-full mb-4">
      <div className="flex justify-between">
        <Link href={`/tittle/${slug}`} className="text-xl hover:text-blue-500">
          {name}
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex max-sm:flex-col">
          <div className="relative min-h-[150px] min-w-[150px] max-sm:h-[150px] max-sm:w-[150px] max-sm:mx-auto rounded-lg overflow-hidden bg-gray-200">
            <Link
              href={`/tittle/${slug}`}
              className="relative block w-full h-full"
            >
              <Image
                src={image}
                alt={`${name} Image`}
                fill={true}
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <div className="ml-4 max-w-[1400px] mr-8 max-h-[150px]">
            <p className="text-m line-clamp-5">{description}</p>
            <div className="flex justify-between">
              <Link href={`/tittle/${slug}`} className="text-blue-500">
                Read more...
              </Link>
              <div className="flex md:hidden items-end text-xs space-x-1">
                <div className="text-sm">{likes}</div>
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
                <div className="text-sm">{dislikes}</div>
                <div className="text-sm pl-1 max-sm:hidden">
                  reviews: {reviews}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-1">
            <div className="text-sm">{likes}</div>
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
            <div className="text-sm">{dislikes}</div>
          </div>
          <div className="flex gap-1">
            {likes + dislikes > 0
              ? Number.isInteger((likes * 10) / (likes + dislikes))
                ? ((likes * 10) / (likes + dislikes)).toFixed(0)
                : ((likes * 10) / (likes + dislikes)).toFixed(1)
              : "0"}
            /10
            <Star className="text-amber-300" />
          </div>
          <div className="text-sm">reviews: {reviews}</div>
        </div>
      </div>
    </div>
  );
};

export default TitleListItem;
