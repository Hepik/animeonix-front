"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewsSectionItem = () => {
  return (
    <div className="flex flex-row py-2 mx-2 bg-gray-700 border border-white rounded-lg text-white px-2 space-x-2">
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
          Hepik
        </Link>
      </div>
      <div className="w-full px-2 line-clamp-6 text-m max-h-[160px]">
        Bleach is an action-packed anime that immerses you in a world where the
        line between life and death is not clear at all. The film follows the
        journey of Ichigo Kurosaki, a high school student with the rare ability
        to see ghosts. His life changes dramatically when he meets a mysterious
        woman named Rukia, who introduces him to the Society of Souls, a hidden
        realm of powerful warriors and sinister spirits. As Ichigo becomes
        embroiled in battles, he discovers that his newfound powers carry great
        responsibility and even greater danger.//Bleach is an action-packed
        anime that immerses you in a world where the line between life and death
        is not clear at all. The film follows the journey of Ichigo Kurosaki, a
        high school student with the rare ability to see ghosts. His life
        changes dramatically when he meets a mysterious woman named Rukia, who
        introduces him to the Society of Souls, a hidden realm of powerful
        warriors and sinister spirits. As Ichigo becomes embroiled in battles,
        he discovers that his newfound powers carry great responsibility and
        even greater danger.
      </div>
      <div className="flex flex-col items-center space-y-1 w-[200px] pt-4 pb-2">
        <div className="flex space-x-1 text-m">
          <p>17</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>5</p>
        </div>
        <div>■■■□□ 8/10</div>
        <Link href="/review">
          <Button className="border border-white rounded-lg py-8 px-4 text-xl hover:text-black hover:bg-white">
            Read more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewsSectionItem;
