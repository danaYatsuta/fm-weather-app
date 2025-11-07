import { useRef, useState } from "react";
import { useDropdown } from "../util";

import type { GeocodingData, LocationInfo } from "../types";

import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";

import iconSearch from "../assets/icon-search.svg";

function AppSearchForm({
  onLocationInfoChange,
}: {
  onLocationInfoChange: (locationInfo: LocationInfo) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownShown, setIsDropdownShown] = useDropdown([dropdownRef]);

  const [response, setResponse] = useState<GeocodingData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (typeof name !== "string" || name.length <= 1) {
      return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?`;

    const params = new URLSearchParams([
      ["count", "4"],
      ["name", name],
    ]);

    try {
      const response = await fetch(url + params);

      if (!response.ok) {
        console.log(
          `Response failed, status: ${response.status} ${response.statusText}`,
        );
        return;
      }

      const result = await response.json();
      setResponse(result);
      setIsDropdownShown(true);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  const searchResultButtons = response?.results.map((result) => (
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
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[70px] right-0 left-0 z-10`}
        ref={dropdownRef}
      >
        <BaseCard>
          <div className="flex flex-col gap-0.5 p-2">{searchResultButtons}</div>
        </BaseCard>
      </div>
    </div>
  );
}

export default AppSearchForm;
