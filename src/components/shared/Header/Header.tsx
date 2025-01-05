"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../ui/sheet";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
import { HeaderSearch } from "@/components/shared/HeaderSearch/HeaderSearch";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const Header = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/titles?search=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="relative z-50 justify-between flex h-16 w-[100%] shrink-0 items-center px-4 md:px-6 bg-gray-900 text-white rounded-b-lg shadow-md">
      <Link href="/" className="text-xl md:text-2xl font-bold cursor-pointer">
        AnimeOnix
      </Link>
      <div className="hidden absolute left-1/2 translate-x-[-50%] md:flex justify-center">
        <HeaderSearch />
      </div>
      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-2">
            {user.role === "admin" && (
              <div className="space-x-2">
                <Button className="border border-white rounded-lg m-0">
                  <Link href="/admin/titles" className="px-2 py-1">
                    Titles
                  </Link>
                </Button>
                <Button className="border border-white rounded-lg m-0">
                  <Link href="/users" className="px-2 py-1">
                    Users
                  </Link>
                </Button>
              </div>
            )}
            <div className="relative h-[45px] w-[45px] rounded-full overflow-hidden bg-gray-200">
              <Link
                href={`/profile/${user.username}`}
                className="relative block w-full h-full"
              >
                <Image
                  src={user.avatar}
                  alt="Profile Image"
                  fill={true}
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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="md:hidden bg-gray-900 border border-white rounded-lg px-2 py-2"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-gray-900 text-white w-[80%]"
          onEscapeKeyDown={() => setIsOpen(false)}
          onPointerDownOutside={() => setIsOpen(false)}
        >
          <div className="grid gap-2 py-6">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="relative h-[45px] w-[45px] rounded-full overflow-hidden bg-gray-200">
                      <Link
                        href={`/profile/${user.username}`}
                        className="relative block w-full h-full"
                      >
                        <Image
                          src={user.avatar}
                          alt="Profile image"
                          fill={true}
                          style={{
                            objectFit: "cover",
                          }}
                          onClick={() => setIsOpen(false)}
                        />
                      </Link>
                    </div>
                    <SheetClose asChild>
                      <Link
                        href={`/profile/${user.username}`}
                        className="text-white max-w-[150px] truncate cursor-pointer"
                      >
                        {user.username}
                      </Link>
                    </SheetClose>
                  </div>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </div>
                <div className="flex">
                  {user.role === "admin" && (
                    <div
                      className="flex w-full space-x-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="border border-white rounded-lg px-2 py-2 w-full">
                        <Link href="/admin/titles">Titles</Link>
                      </Button>
                      <Button className="border border-white rounded-lg px-2 py-2 w-full">
                        <Link href="/users">Users</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button className="border border-white rounded-lg px-2 py-2 m-0 w-full">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button className="border border-white rounded-lg px-2 py-2 w-full">
                  <Link href="/register">Sign Up</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
            <HeaderSearch onChange={() => setIsOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
