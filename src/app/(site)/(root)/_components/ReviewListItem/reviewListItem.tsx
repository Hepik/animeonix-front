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
}

const ReviewListItem: React.FC<TitleProps> = ({
  id,
  name,
  description,
  likes,
  dislikes,
  reviews,
}) => {
  return (
    <div className="bg-gray-700 rounded-lg text-white border shadow-sm px-2 pb-2 w-[1050px] mb-4">
      <Link href="#" className="text-xl hover:text-blue-500">
        {name}
      </Link>
      <div className="flex justify-between items-start">
        <div className="flex">
          <div className="relative h-[150px] w-[150px] rounded-lg overflow-hidden bg-gray-200">
            <Link href="/tittle" className="relative block w-full h-full">
              <Image
                src="/carousel/bleach.jpg"
                alt="Bleach Image"
                fill={true}
                sizes="15vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <div className="ml-4 w-[750px] max-h-[150px]">
            <p className="text-m line-clamp-5">{description}</p>
            <Link href="#" className="text-blue-500">
              Read more...
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex items-center space-x-1">
            <div className="text-sm">{likes}</div>
            <ThumbsUp />
            <p>/</p>
            <ThumbsDown />
            <div className="text-sm">{dislikes}</div>
          </div>
          <div className="flex">
            3.5 <Star />
          </div>
          <div className="text-sm">reviews: {reviews}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListItem;
