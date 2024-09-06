"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const TittleSection = () => {
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
        <p className="text-xl font-bold">
          Bleach is a captivating anime that masterfully blends action,
          supernatural elements, and deep character development, all set in a
          richly detailed world where the boundaries between life and death are
          constantly blurred.
        </p>
        <div className="whitespace-pre-wrap">
          {`Bleach stands as one of the most iconic anime series of its time, thanks to its compelling narrative, vibrant characters, and intricate world-building. The story revolves around Ichigo Kurosaki, a seemingly ordinary high school student who possesses the extraordinary ability to see ghosts. This unusual gift sets the stage for his life-altering encounter with Rukia Kuchiki, a Soul Reaper from the mysterious Soul Society. Rukia introduces Ichigo to a hidden world where Soul Reapers fight against malevolent spirits known as Hollows, maintaining the balance between the living world and the afterlife.

What makes Bleach truly special is its ability to weave together intense action sequences with moments of introspection and emotional depth. Ichigo's journey from a reluctant hero to a formidable Soul Reaper is both thrilling and deeply personal. He is driven by a strong sense of responsibility and an unwavering desire to protect those he cares about, making him a relatable and inspiring protagonist. The series delves into his struggles with his newfound powers, the weight of his duties, and the complex relationships he forms along the way.

The world of Bleach is richly detailed, with a vast array of characters, each with their own backstories and motivations. The Soul Society, in particular, is a fascinating realm, characterized by its rigid hierarchy, ancient traditions, and powerful warriors. The anime does an excellent job of exploring the different facets of this world, from the inner workings of the Soul Reapers to the haunting beauty of the afterlife.

One of the standout aspects of Bleach is its approach to battles. Unlike many other action-oriented anime, Bleach focuses not just on physical combat but also on the psychological and emotional aspects of fighting. Each battle is not merely a clash of swords but a test of will, strategy, and moral resolve. The combatants often confront their own fears, doubts, and past traumas during these encounters, adding a layer of complexity to the action. This makes the battles in Bleach not only visually spectacular but also emotionally resonant.

Another strength of Bleach is its diverse cast of characters. From the stoic and honorable Rukia to the enigmatic and powerful captain of the Soul Society, each character brings something unique to the table. The series takes the time to explore their backgrounds, motivations, and growth, making them more than just side characters. The relationships between these characters are also a highlight, with bonds of friendship, rivalry, and loyalty playing a crucial role in the narrative.

The themes of Bleach are equally compelling. The anime explores the concepts of life, death, and the afterlife, challenging the characters and viewers to ponder what it means to live a meaningful life. It delves into the nature of power, the responsibilities that come with it, and the consequences of its misuse. The series also touches on the idea of identity, as Ichigo grapples with his dual existence as a human and a Soul Reaper, and other characters confront their own internal conflicts.

Visually, Bleach is stunning, with fluid animation, dynamic fight scenes, and a distinctive art style that brings the world and characters to life. The use of color and lighting, particularly in the depiction of the Soul Society and the eerie Hueco Mundo, adds to the overall atmosphere of the series. The soundtrack is another highlight, featuring a mix of haunting melodies and adrenaline-pumping tracks that perfectly complement the action and drama on screen.

However, Bleach is not without its flaws. The series suffers from pacing issues, particularly in the latter half, where filler arcs and prolonged battles can detract from the overall narrative. Some viewers may also find the sheer number of characters and plotlines overwhelming. Despite these shortcomings, Bleach remains a beloved anime, thanks to its strong characters, engaging story, and the emotional depth it brings to the action genre.

In conclusion, Bleach is more than just an action-packed anime; it is a journey into a world where the lines between good and evil, life and death, are constantly shifting. Its combination of thrilling battles, complex characters, and thought-provoking themes makes it a standout series that continues to resonate with audiences long after its final episode. Whether you're a long-time anime fan or new to the genre, Bleach offers an experience that is both exhilarating and deeply moving.`}
        </div>
      </div>
      <div className="flex justify-end space-x-1 text-xl">
        <p>4</p>
        <ThumbsUp />
        <p>/</p>
        <ThumbsDown />
        <p>1</p>
        <div className="pl-2">■■■□□ 8/10</div>
      </div>
    </div>
  );
};

export default TittleSection;
