"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Review } from "../../[review_id]/page";

interface ReviewSectionProps {
  review: Review | null;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ review }) => {
  if (!review) return <div>Loading</div>;
  return (
    <div className="flex flex-col gap-2 text-white">
      <div className="flex flex-row items-center space-x-2">
        <div className="relative h-[70px] w-[70px] rounded-full overflow-hidden bg-gray-200 mb-2">
          <Link href="/#" className="relative block w-full h-full">
            <Image
              src="/user.jpg"
              alt="User Image"
              fill={true}
              sizes="20vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <Link
          href="#"
          className="truncate max-w-full text-center text-xl hover:text-blue-500"
        >
          Hepik
        </Link>
      </div>
      <div className="flex flex-col pl-2 bg-white text-black rounded-lg p-2">
        <div
          dangerouslySetInnerHTML={{ __html: review.content }}
          className="whitespace-pre-wrap break-words"
        ></div>
      </div>
      <div className="flex justify-end space-x-1 text-base sm:text-xl">
        <p>{review.likes}</p>
        <ThumbsUp />
        <p>/</p>
        <ThumbsDown />
        <p>{review.dislikes}</p>
        <div className="pl-2">
          ■■■□□{" "}
          {((review.likes * 10) / (review.likes + review.dislikes)).toFixed(2)}
          /10
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
