"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/utils/api/api";

interface Description {
  id: number;
  name: string;
  description: string;
  trailer: string;
  likes: number;
  dislikes: number;
  reviews: number;
}
interface TitlesResponse {
  titles: Description[];
  total: number;
}

const TittleSection = () => {
  const [description, setDescription] = useState<Description[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDesctiption = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<TitlesResponse>("/titles");
        setDescription(response.data.titles);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesctiption();
  }, []);

  const firstDescription = description[0];

  return (
    <div className="flex text-white gap-4">
      <div className="flex flex-col max-w-[370px] w-full max-h-[580px] items-center border rounded-lg space-y-2 py-2 px-4">
        <div className="relative h-[400px] w-[350px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link href="/#" className="relative block w-full h-full">
            <Image
              src="/carousel/bleach.jpg"
              alt="Bleach Image"
              fill={true}
              sizes="20vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <p className="text-3xl" key={firstDescription?.id}>
          {firstDescription?.name}
        </p>
        <div className="flex items-end space-x-1 text-xl">
          <p key={firstDescription?.id}>{firstDescription?.likes}</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p key={firstDescription?.id}>{firstDescription?.dislikes}</p>
          <div className="pl-2">
            ■■■□□{" "}
            {(
              (firstDescription?.likes * 10) /
              (firstDescription?.likes + firstDescription?.dislikes)
            ).toFixed(2)}
            /10
          </div>
        </div>
        <Link href="/form">
          <Button className="border border-white rounded-lg py-8 px-4 text-xl hover:text-black hover:bg-white">
            Write a review
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="border border-white px-4 py-2 rounded-lg">
          <p key={firstDescription?.id}>{firstDescription?.description}</p>
        </div>
        <div className="flex justify-center border border-white px-4 py-4 rounded-lg">
          <iframe
            width="560"
            height="315"
            key={firstDescription?.id}
            src={firstDescription?.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TittleSection;
