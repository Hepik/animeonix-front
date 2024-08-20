"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../ui/ThemeToggle";

export const Header = () => {
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
      </div>
    </header>
  );
};
