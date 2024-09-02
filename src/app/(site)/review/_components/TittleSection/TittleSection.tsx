"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const TittleSection = () => {
  return (
    <div className="flex text-white gap-4 justify-center">
      <div className="flex flex-col max-w-[370px] w-full max-h-[580px] items-center border rounded-lg space-y-2 py-2 px-4">
        <div className="relative h-[400px] w-[350px] rounded-lg overflow-hidden bg-gray-200 ">
          <a href="#">
            <Image
              src="/carousel/bleach.jpg"
              alt="Bleach Image"
              layout="fill"
              objectFit="cover"
            />
          </a>
        </div>
        <Link
          href="#"
          className="truncate max-w-full text-center text-3xl hover:text-blue-500"
        >
          Bleach
        </Link>
        <div className="flex items-end space-x-1 text-xl">
          <p>17</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>5</p>
          <div className="pl-2">■■■□□ 8/10</div>
        </div>
      </div>
    </div>
  );
};

export default TittleSection;
