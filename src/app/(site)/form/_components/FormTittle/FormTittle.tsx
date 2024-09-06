"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FormTittle = () => {
  return (
    <div className="flex text-white justify-center">
      <div className="flex flex-col items-center w-full border-b px-4">
        <div className="relative h-[200px] w-[200px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link href="/#" className="relative block w-full h-full">
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
        </div>
        <Link
          href="#"
          className="truncate max-w-full text-center text-xl hover:text-blue-500"
        >
          Bleach
        </Link>
      </div>
    </div>
  );
};

export default FormTittle;
