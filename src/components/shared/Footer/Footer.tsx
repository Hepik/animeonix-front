"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="justify-between flex h-16 w-[100%] shrink-0 items-center md:px-6 bg-gray-900 text-white rounded-t-lg shadow-md">
      <Link href="/" className="text-2xl font-bold cursor-pointer">
        AnimeOnix
      </Link>
      <p className="flex items-center space-x-2">
        Created by
        <a
          href="https://www.linkedin.com/in/vadym-vovk-a4b07a306/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-7 h-7 ml-2">
            <Image
              src="/linkedin.jpg"
              alt="LinkedIn Logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </a>
      </p>
    </footer>
  );
};
