"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewProps {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  slug: string;
}

const ReviewsSectionItem: React.FC<ReviewProps> = ({
  id,
  content,
  likes,
  dislikes,
  slug,
}) => {
  return (
    <div className="flex flex-row max-[580px]:flex-col max-[580px]:items-center w-full py-2 bg-gray-700 border border-white rounded-lg text-white px-2 space-x-2">
      <div className="flex flex-col max-w-[120px] items-center space-y-2 px-2  pt-2">
        <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden bg-gray-200">
          <Link href="/#" className="relative block w-full h-full">
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
        <Link
          href="#"
          className="truncate max-w-full text-center hover:text-blue-500"
        >
          {"user: " + id}
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="w-full px-2 line-clamp-6 text-m max-h-[160px]  break-words"
      ></div>
      <div className="flex flex-col items-center space-y-1 w-[200px] pt-4 pb-2">
        <div className="flex space-x-1 text-m">
          <p>{likes}</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>{dislikes}</p>
        </div>
        <div>■■■□□ {((likes * 10) / (likes + dislikes)).toFixed(2)}/10</div>
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
