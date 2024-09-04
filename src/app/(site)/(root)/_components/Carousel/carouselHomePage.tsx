"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export const CarouselHomePage = () => {
  return (
    <div className="border-b pb-4 ">
      <Carousel>
        <CarouselContent className="ml-6">
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="/tittle" className="relative block w-full h-full">
                <Image
                  src="/carousel/bleach.jpg"
                  alt="Bleach Image"
                  priority
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Bleach
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="/#" className="relative block w-full h-full">
                <Image
                  src="/carousel/jojo.jpg"
                  alt="JoJo Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                JoJo&apos;s Bizarre Adventure
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/onepiece.jpg"
                  alt="One Piece Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                One Piece
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/aot.jpg"
                  alt="Attack on Titan Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Attack on Titan
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/deathnote.jpg"
                  alt="Death Note Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Death Note
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/Fullmetal_Alchemist_Brotherhood.jpg"
                  alt="Fullmetal_Alchemist_Brotherhood Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Fullmetal Alchemist: Brotherhood
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/jujutsu_kaisen.jpg"
                  alt="Jujutsu Kaisen Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Jujutsu Kaisen
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/demon_slayer.jpg"
                  alt="Demon Slayer Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Demon Slayer
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/black_clover.jpg"
                  alt="Black Clover Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <Link
                href="#"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Black Clover
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/5">
            <div className="relative h-[200px] w-[200px] bg-white text-black rounded-lg overflow-hidden">
              <Link href="#" className="relative block w-full h-full">
                <Image
                  src="/carousel/hunterxhunter.jpg"
                  alt="Hunter x Hunter Image"
                  fill={true}
                  sizes="20vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 px-2 text-ellipsis whitespace-nowrap overflow-hidden">
                  Hunter x Hunter
                </div>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
