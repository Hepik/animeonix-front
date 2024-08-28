"use client";

import React, { useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

const genresOptions = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "romance", label: "Romance" },
];

const yearsOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
];

type OptionType = { value: string; label: string };

export const Filters = () => {
  const [selectedGenres, setSelectedGenres] = useState<MultiValue<OptionType>>(
    []
  );
  const [selectedYear, setSelectedYear] =
    useState<SingleValue<OptionType> | null>(null);

  const handleGenreChange = (
    selectedOptions: MultiValue<OptionType> | null
  ) => {
    setSelectedGenres(selectedOptions || []);
  };

  const handleYearChange = (selectedOption: SingleValue<OptionType> | null) => {
    setSelectedYear(selectedOption);
  };

  const handleGenreRemove = (genreToRemove: OptionType) => {
    setSelectedGenres(
      selectedGenres.filter((genre) => genre.value !== genreToRemove.value)
    );
  };

  const handleSearch = () => {
    console.log("Selected genres:", selectedGenres);
    console.log("Selected year:", selectedYear);
  };

  return (
    <div className="flex flex-col w-full bg-gray-700 text-white border rounded-lg p-4 space-y-4">
      <div>
        <Select
          isMulti
          options={genresOptions}
          value={selectedGenres}
          onChange={handleGenreChange}
          placeholder="Select genres..."
          className="text-black"
          controlShouldRenderValue={false}
          isClearable={false}
        />
      </div>
      <div>
        <Select
          options={yearsOptions}
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Select year..."
          className="text-black"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedGenres.map((genre) => (
          <div
            key={genre.value}
            className="flex items-center bg-gray-500 px-2 py-1 rounded-full"
          >
            {genre.label}
            <button
              className="ml-2 text-white"
              onClick={() => handleGenreRemove(genre)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="w-[100px] bg-gray-700 border hover:bg-white hover:text-black text-white py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};
