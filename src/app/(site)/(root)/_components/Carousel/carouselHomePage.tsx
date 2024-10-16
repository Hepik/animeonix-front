"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
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

interface TitlesResponse {
  titles: Title[];
  total: number;
}

export const CarouselHomePage = () => {
  const limit = 10;
  const [description, setDescription] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDesctiption = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<TitlesResponse>(
          `/titles?limit=${limit}`
        );
        setDescription(response.data.titles);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesctiption();
  }, []);
  return (
    <div className="border-b pb-4 ">
      <Carousel>
        <CarouselContent className="ml-6">
          {description?.map((titles) => (
            <CarouselItem key={titles.id} className="md:basis-1/2 lg:basis-1/5">
              <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
                <Link
                  href={`/tittle/${titles.slug}`}
                  className="relative block w-full h-full"
                >
                  <Image
                    src={titles.image}
                    alt={titles.name}
                    priority
                    fill={true}
                    sizes="20vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <Link
                  href={`/tittle/${titles.slug}`}
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
                >
                  {titles.name}
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
