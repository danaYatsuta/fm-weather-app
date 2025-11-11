import { useClickAway, useDebounce, useFocusWithin, useRequest } from "ahooks";
import { useRef, useState } from "react";

import type { GeocodingData } from "../types/data";
import type { LocationInfo } from "../types/util";

import iconError from "../assets/icon-error.svg";
import iconLoading from "../assets/icon-loading.svg";
import iconSearch from "../assets/icon-search.svg";
import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";

const url = `https://geocoding-api.open-meteo.com/v1/search?`;

export default function AppSearchForm({
  onLocationInfoChange,
}: {
  onLocationInfoChange: (locationInfo: LocationInfo) => void;
}) {
  /* ---------------------------------- State --------------------------------- */

  const [searchTerm, setSearchTerm] = useState("");

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  /* ------------------------------ Derived State ----------------------------- */

  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 300 });

  const params = new URLSearchParams([
    ["count", "10"],
    ["name", debouncedSearchTerm],
  ]);

  /* ---------------------------------- Hooks --------------------------------- */

  const searchBarRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstSearchResultRef = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setIsDropdownShown(false);
  }, [searchBarRef, submitButtonRef, dropdownRef]);

  useFocusWithin(searchBarRef, {
    onFocus: () => {
      if (debouncedSearchTerm.length >= 2) setIsDropdownShown(true);
    },
  });

  const {
    data: geocodingData,
    loading,
    run,
  } = useRequest(
    async (): Promise<GeocodingData> => {
      setIsDropdownShown(true);

      const response = await fetch(url + params.toString());

      if (!response.ok)
        throw new Error(`${response.status.toString()} ${response.statusText}`);

      const data = (await response.json()) as GeocodingData;

      if (data.results) {
        data.results = data.results.filter((result) =>
          result.feature_code.startsWith("PPL"),
        );
        data.results.splice(5);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      return data;
    },
    {
      cacheKey: "geocodingData" + JSON.stringify(debouncedSearchTerm),
      ready: debouncedSearchTerm.length >= 2,
      refreshDeps: [debouncedSearchTerm],
      staleTime: 5 * 60 * 1000,
    },
  );

  /* -------------------------------- Handlers -------------------------------- */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (debouncedSearchTerm.length < 2) return;

    run();
    setIsDropdownShown(true);
    firstSearchResultRef.current?.focus();
  }

  /* --------------------------------- Markup --------------------------------- */

  const searchResultButtons = geocodingData?.results?.map((result, index) => (
    <DropdownButton
      border={true}
      key={result.id}
      onButtonClick={() => {
        const { country, latitude, longitude, name, timezone } = result;
        onLocationInfoChange({ country, latitude, longitude, name, timezone });
        setIsDropdownShown(false);
      }}
      ref={index === 0 ? firstSearchResultRef : undefined}
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
      <img
        alt=""
        className="animate-spin motion-reduce:animate-none"
        src={iconLoading}
      />
      Search in progress
    </p>
  );

  if (!loading) {
    content = searchResultButtons ?? (
      <p className="flex h-10 items-center gap-3 px-2">
        <img alt="" src={iconError} />
        No results
      </p>
    );
  }

  return (
    <div className="relative mt-12 self-center xl:mt-16">
      <search>
        <form
          className="flex flex-col gap-3 text-xl xl:flex-row xl:justify-center xl:gap-4"
          onSubmit={handleSubmit}
        >
          <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6 outline-offset-[3px] hover:bg-neutral-700 has-focus:outline-2 xl:w-[526px]">
            <img alt="" src={iconSearch} />

            <input
              autoComplete="off"
              className="h-full w-full outline-none placeholder:text-neutral-200"
              name="name"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search for a place..."
              ref={searchBarRef}
              type="search"
              value={searchTerm}
            />
          </label>

          <button
            className="h-14 rounded-xl bg-blue-500 outline-blue-500 hover:bg-blue-700 hover:outline-blue-700 xl:px-6"
            ref={submitButtonRef}
            type="submit"
          >
            Search
          </button>
        </form>
      </search>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[68px] right-0 left-0 z-10`}
        ref={dropdownRef}
      >
        <BaseCard>
          <div className="flex flex-col gap-0.5 p-2" role="listbox">
            {content}
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
