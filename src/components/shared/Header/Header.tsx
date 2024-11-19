"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Filters } from "@/app/(site)/(root)/_components/Filters/Filters";
import { useUser } from "@/lib/context/UserContext";

export const Header = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { user, logout } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="justify-between flex h-16 w-[100%] shrink-0 items-center px-4 md:px-6 bg-gray-900 text-white rounded-b-lg shadow-md">
      <Link href="/" className="text-2xl font-bold cursor-pointer">
        AnimeOnix
      </Link>
      <div className="absolute left-1/2 translate-x-[-50%] flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 px-4 py-2 rounded-lg text-white w-[400px]"
        />
      </div>
      <div className=" flex items-center gap-2">
        <Button className="border border-white rounded-lg px-2 py-2 ">
          Ua
        </Button>
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-2">
            <div className="relative h-[45px] w-[45px] rounded-full overflow-hidden bg-gray-200">
              <Link
                href={`/profile/${user.username}`}
                className="relative block w-full h-full"
              >
                <Image
                  src="/carousel/bleach.jpg"
                  alt="Bleach Image"
                  fill={true}
                  sizes="15vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Button>
              <Link
                href="/login"
                className="border border-white rounded-lg px-2 py-2 m-0"
              >
                Sign in
              </Link>
            </Button>
            <Button>
              <Link
                href="/register"
                className="border border-white rounded-lg px-2 py-2"
              >
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
