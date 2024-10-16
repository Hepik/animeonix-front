"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/utils/api/api";

interface Title {
  id: number;
  name: string;
  description: string;
  trailer: string;
  likes: number;
  dislikes: number;
  reviews: number;
  image: string;
  slug: string;
}

const TittleSection = ({ slug }: { slug: string }) => {
  const [title, setTitle] = useState<Title | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTitle = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const response = await api.get<Title>(`/titles/${slug}`);
        setTitle(response.data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitle();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!title) {
    return <div>Title not found</div>;
  }

  return (
    <div className="flex text-white gap-4">
      <div className="flex flex-col max-w-[370px] w-full max-h-[580px] items-center border rounded-lg space-y-2 py-2 px-4">
        <div className="relative h-[400px] w-[350px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link
            href={`/tittle/${slug}`}
            className="relative block w-full h-full"
          >
            <Image
              src={title.image}
              alt={title.name}
              fill={true}
              sizes="20vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <p className="text-3xl text-center">{title.name}</p>
        <div className="flex items-end space-x-1 text-xl">
          <p>{title.likes}</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>{title.dislikes}</p>
          <div className="pl-2">
            ■■■□□{" "}
            {((title.likes * 10) / (title.likes + title.dislikes)).toFixed(2)}
            /10
          </div>
        </div>
        <Link href={`/tittle/${slug}/form`}>
          <Button className="border border-white rounded-lg py-8 px-4 text-xl hover:text-black hover:bg-white">
            Write a review
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="border border-white px-4 py-2 rounded-lg">
          <p>{title.description}</p>
        </div>
        <div className="flex justify-center border border-white px-4 py-4 rounded-lg">
          <iframe
            width="560"
            height="315"
            src={title.trailer}
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
