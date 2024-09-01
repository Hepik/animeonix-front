"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const CarouselHomePage = () => {
  return (
    <div className="border-b pb-4 ">
      <Carousel>
        <CarouselContent className="ml-6">
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="/tittle">
                <Image
                  src="/carousel/bleach.jpg"
                  alt="Bleach Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Bleach
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/jojo.jpg"
                  alt="JoJo Image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                JoJo&apos;s Bizarre Adventure
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/onepiece.jpg"
                  alt="One Piece Image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                One Piece
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/aot.jpg"
                  alt="Attack on Titan Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Attack on Titan
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/deathnote.jpg"
                  alt="Death Note Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Death Note
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/Fullmetal_Alchemist_Brotherhood.jpg"
                  alt="Fullmetal_Alchemist_Brotherhood Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Fullmetal Alchemist: Brotherhood
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/jujutsu_kaisen.jpg"
                  alt="Jujutsu Kaisen Image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Jujutsu Kaisen
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/demon_slayer.jpg"
                  alt="Demon Slayer Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Demon Slayer
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/black_clover.jpg"
                  alt="Black Clover Image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Black Clover
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <a href="#">
                <Image
                  src="/carousel/hunterxhunter.jpg"
                  alt="Hunter x Hunter Image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </a>
              <a
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Hunter x Hunter
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
