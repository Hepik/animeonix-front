"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

const url_linkedin = process.env.NEXT_PUBLIC_API_URL + "/static/linkedin.jpg";
// const url_github = process.env.NEXT_PUBLIC_API_URL + "/static/github.jpg";
const url_github = "/github.jpg";

export const Footer = () => {
  return (
    <footer className="justify-between flex h-16 w-[100%] shrink-0 items-center px-6 bg-gray-900 text-white rounded-t-lg shadow-md">
      <Link href="/" className="text-xl md:text-2xl font-bold cursor-pointer">
        AnimeOnix
      </Link>
      <div className="flex items-center space-x-2">
        Created by
        <Link
          href="https://www.linkedin.com/in/vadym-vovk-a4b07a306/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-7 h-7 ml-2">
            <Image
              src={url_linkedin}
              alt="LinkedIn Logo"
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </Link>
        <Link
          href="https://github.com/Hepik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-7 h-7 ml-2">
            <Image
              src={url_github}
              alt="Github Logo"
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </Link>
      </div>
    </footer>
  );
};
