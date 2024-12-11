"use client";

import React, { useState, useRef, useEffect } from "react";
import { api } from "@/utils/api/api";
import { useRouter } from "next/navigation";

interface Title {
  id: number;
  name: string;
  slug: string;
}

export const HeaderSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Title[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await api.get(`/titles?name=${query}`);
        setSearchResults(response.data.titles);
        setDropdownVisible(true);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
      }
    } else {
      setSearchResults([]);
      setDropdownVisible(false);
    }
  };

  const handleResultClick = (slug: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setDropdownVisible(false);
    router.push(`/tittle/${slug}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        placeholder="Search Titles"
        className="bg-gray-800 px-4 py-2 rounded-lg text-white w-[200px] lg:w-[400px]"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setDropdownVisible(searchResults.length > 0)}
      />
      {isDropdownVisible && (
        <ul className="absolute left-0 right-0 bg-white text-black rounded-lg mt-2 shadow-lg">
          {searchResults.slice(0, 10).map((title) => (
            <li
              key={title.id}
              className="hover:bg-gray-200 border-b border-gray-300 last:border-0"
            >
              <div
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleResultClick(title.slug)}
              >
                {title.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
