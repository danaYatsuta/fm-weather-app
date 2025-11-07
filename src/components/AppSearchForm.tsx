import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDropdown } from "../util";
import { useDebounce } from "@uidotdev/usehooks";

import type { GeocodingData, LocationInfo } from "../types";

import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";

import iconSearch from "../assets/icon-search.svg";
import iconLoading from "../assets/icon-loading.svg";
import iconError from "../assets/icon-error.svg";

function AppSearchForm({
  onLocationInfoChange,
}: {
  onLocationInfoChange: (locationInfo: LocationInfo) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownShown, setIsDropdownShown] = useDropdown([dropdownRef]);

  const url = `https://geocoding-api.open-meteo.com/v1/search?`;

  const params = new URLSearchParams([
    ["count", "10"],
    ["name", debouncedSearchTerm],
  ]);

  const {
    data: geocodingData,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["geocodingData", debouncedSearchTerm],
    queryFn: async (): Promise<GeocodingData> => {
      setIsDropdownShown(true);

      const response = await fetch(url + params);

      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      const data: GeocodingData = await response.json();

      if (data.results) {
        data.results = data.results.filter((result) =>
          result.feature_code.startsWith("PPL"),
        );

        data.results.splice(5);
      }

      return data;
    },
    enabled: debouncedSearchTerm.length >= 2,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchTerm.length >= 2) refetch();
  }

  const searchResultButtons = geocodingData?.results?.map((result) => (
    <DropdownButton
      border={true}
      onButtonClick={() => {
        const { name, country, timezone, latitude, longitude } = result;
        onLocationInfoChange({ name, country, timezone, latitude, longitude });
        setIsDropdownShown(false);
      }}
      key={result.id}
    >
      <span className="flex items-center justify-between">
        {result.name}
        <span className="text-sm text-neutral-300">
          {result.country}, {result.admin1}
        </span>
      </span>
    </DropdownButton>
  ));

  let content: React.ReactNode = (
    <p className="flex h-10 items-center gap-3 px-2">
      <img src={iconLoading} alt="" className="animate-spin" />
      Search in progress
    </p>
  );

  if (isSuccess) {
    content = searchResultButtons || (
      <p className="flex h-10 items-center gap-3 px-2">
        <img src={iconError} alt="" />
        No results.
      </p>
    );
  }

  return (
    <div className="relative col-span-2 mt-12 justify-self-center xl:mt-16">
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 text-xl xl:mb-12 xl:flex-row xl:justify-center xl:gap-4"
      >
        <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6 outline-offset-[3px] hover:bg-neutral-700 has-focus:outline-2 xl:w-[526px]">
          <img src={iconSearch} alt="" />

          <input
            name="name"
            type="text"
            placeholder="Search for a place..."
            aria-label="Search for a place"
            className="h-full w-full outline-none placeholder:text-neutral-200"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </label>

        <button
          type="submit"
          className="h-14 rounded-xl bg-blue-500 outline-blue-500 hover:bg-blue-700 hover:outline-blue-700 xl:px-6"
        >
          Search
        </button>
      </form>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[68px] right-0 left-0 z-10`}
        ref={dropdownRef}
      >
        <BaseCard>
          <div className="flex flex-col gap-0.5 p-2">{content}</div>
        </BaseCard>
      </div>
    </div>
  );
}

export default AppSearchForm;
