"use client";

import React from "react";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TittleSection = () => {
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
        <p className="text-3xl">Bleach</p>
        <div className="flex items-end space-x-1 text-xl">
          <p>17</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>5</p>
          <div className="pl-2">■■■□□ 8/10</div>
        </div>
        <Link href="/form">
          <Button className="border border-white rounded-lg py-8 px-4 text-xl hover:text-black hover:bg-white">
            Write a review
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="border border-white px-4 py-2 rounded-lg">
          <p>
            Bleach is an action-packed anime that immerses you in a world where
            the line between life and death is not clear at all. The film
            follows the journey of Ichigo Kurosaki, a high school student with
            the rare ability to see ghosts. His life changes dramatically when
            he meets a mysterious woman named Rukia, who introduces him to the
            Society of Souls, a hidden realm of powerful warriors and sinister
            spirits. As Ichigo becomes embroiled in battles, he discovers that
            his newfound powers carry great responsibility and even greater
            danger.\\Bleach is an action-packed anime that immerses you in a
            world where the line between life and death is not clear at all. The
            film follows the journey of Ichigo Kurosaki, a high school student
            with the rare ability to see ghosts. His life changes dramatically
            when he meets a mysterious woman named Rukia, who introduces him to
            the Society of Souls, a hidden realm of powerful warriors and
            sinister spirits. As Ichigo becomes embroiled in battles, he
            discovers that his newfound powers carry great responsibility and
            even greater danger.\\Bleach is an action-packed anime that immerses
            you in a world where the line between life and death is not clear at
            all. The film follows the journey of Ichigo Kurosaki, a high school
            student with the rare ability to see ghosts. His life changes
            dramatically when he meets a mysterious woman named Rukia, who
            introduces him to the Society of Souls, a hidden realm of powerful
            warriors and sinister spirits. As Ichigo becomes embroiled in
            battles, he discovers that his newfound powers carry great
            responsibility and even greater danger.
          </p>
        </div>
        <div className="flex justify-center border border-white px-4 py-4 rounded-lg">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/1sygUhb8Q2Y?si=jru29vQbrEtl8XFV"
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
