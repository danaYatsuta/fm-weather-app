import { useRef, useState } from "react";
import BaseDropdown from "./BaseDropdown";
import BaseDropdownButton from "./BaseDropdownButton";
import type { GeocodingResponse } from "../types";
import { useDropdown } from "../util";

function AppSearchForm({
  onLocationChange,
}: {
  onLocationChange: (latitide: number, longitude: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownShown, setIsDropdownShown] = useDropdown([ref]);
  const [response, setResponse] = useState<GeocodingResponse | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (typeof name !== "string" || name.length <= 1) {
      return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?count=4&name=${name}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        setResponse(result);
        setIsDropdownShown(true);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  const dropdownButtons = response?.results.map((result) => (
    <BaseDropdownButton
      border={true}
      onButtonClick={() => {
        onLocationChange(result.latitude, result.longitude);
        setIsDropdownShown(false);
      }}
      key={result.id}
    >
      <span className="flex items-center justify-between">
        {result.name}{" "}
        <span className="text-sm text-neutral-300">
          {result.country}, {result.admin1}
        </span>
      </span>
    </BaseDropdownButton>
  ));

  return (
    <div className="relative col-span-2 mt-12 justify-self-center xl:mt-16">
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 text-xl xl:mb-12 xl:flex-row xl:justify-center xl:gap-4"
      >
        <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6 outline-offset-[3px] hover:bg-neutral-700 has-focus:outline-2 xl:w-[526px]">
          <img src="/icon-search.svg" alt="" />

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
          className="h-14 rounded-xl bg-blue-500 outline-offset-[3px] outline-blue-500 hover:bg-blue-700 hover:outline-blue-700 focus:outline-2 xl:px-6"
        >
          Search
        </button>
      </form>

      {isDropdownShown && (
        <BaseDropdown dropdownType="searchDropdown" ref={ref}>
          {dropdownButtons}
        </BaseDropdown>
      )}
    </div>
  );
}

export default AppSearchForm;
