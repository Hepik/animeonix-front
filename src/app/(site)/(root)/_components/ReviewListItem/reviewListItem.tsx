"use client";

import Image from "next/image";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import Link from "next/link";

export const ReviewListItem = () => {
  return (
    <div className="bg-gray-700 rounded-lg text-white border shadow-sm px-2 pb-2 w-[1050px] mb-4">
      <a href="#" className="text-xl hover:text-blue-500">
        Bleach
      </a>
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
            <p className="text-m line-clamp-5">
              Bleach is an action-packed anime that immerses you in a world
              where the line between life and death is not clear at all. The
              film follows the journey of Ichigo Kurosaki, a high school student
              with the rare ability to see ghosts. His life changes dramatically
              when he meets a mysterious woman named Rukia, who introduces him
              to the Society of Souls, a hidden realm of powerful warriors and
              sinister spirits. As Ichigo becomes embroiled in battles, he
              discovers that his newfound powers carry great responsibility and
              even greater danger.
            </p>
            <a href="#" className="text-blue-500">
              Read more...
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex items-center space-x-1">
            <div className="text-sm">17</div>
            <ThumbsUp />
            <p>/</p>
            <ThumbsDown />
            <div className="text-sm">5</div>
          </div>
          <div className="flex">
            3.5 <Star />
          </div>
          <div className="text-sm">5 reviews</div>
        </div>
      </div>
    </div>
  );
};
