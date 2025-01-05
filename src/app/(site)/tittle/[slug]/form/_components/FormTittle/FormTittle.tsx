"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "../../page";

interface ReviewSectionProps {
  data: Title | null;
}

const FormTittle: React.FC<ReviewSectionProps> = ({ data: titleData }) => {
  if (!titleData) return <div>Loading</div>;
  return (
    <div className="flex text-white justify-center">
      <div className="flex flex-col items-center w-full border-b px-4">
        <div className="relative h-[200px] w-[200px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link href="/#" className="relative block w-full h-full">
            <Image
              src={titleData.image}
              alt="Bleach Image"
              priority
              fill={true}
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
          {titleData.name}
        </Link>
      </div>
    </div>
  );
};

export default FormTittle;
