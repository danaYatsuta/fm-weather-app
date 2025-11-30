import { useFocusWithin, useRequest } from "ahooks";
import { useRef, useState } from "react";

import type { GeocodingData, GeocodingDataResult } from "../types/data";
import type { LocationInfo } from "../types/util";

import iconError from "../assets/icon-error.svg";
import iconLoading from "../assets/icon-loading.svg";
import iconSearch from "../assets/icon-search.svg";
import { useClickAwayAndEsc } from "../util";
import BaseDropdown from "./BaseDropdown";
import DropdownButton, { type DropdownButtonRef } from "./DropdownButton";

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

  const params = new URLSearchParams([
    ["count", "10"],
    ["name", searchTerm],
  ]);

  /* ---------------------------------- Hooks --------------------------------- */

  const searchBarRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAwayAndEsc(() => {
    setIsDropdownShown(false);
  }, [searchBarRef, dropdownRef]);

  useFocusWithin(searchBarRef, {
    onFocus: () => {
      if (searchTerm.length >= 2) setIsDropdownShown(true);
    },
  });

  const {
    data: geocodingData,
    error,
    loading,
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

      if (import.meta.env.DEV)
        await new Promise((resolve) => setTimeout(resolve, 500));

      return data;
    },
    {
      cacheKey: "geocodingData" + searchTerm,
      debounceWait: 300,
      ready: searchTerm.length >= 2,
      refreshDeps: [searchTerm],
      staleTime: 5 * 60 * 1000,
    },
  );

  /* -------------------------------- Handlers -------------------------------- */

  const searchResultButtonRefs: (DropdownButtonRef | undefined)[] = [];

  function handleSearchResultKeyDown(e: React.KeyboardEvent, index: number) {
    switch (e.key) {
      case "ArrowDown": {
        if (index === searchResultButtonRefs.length - 1) return;

        searchResultButtonRefs[index + 1]?.focus();
        return;
      }

      case "ArrowUp": {
        if (index === 0) return;

        searchResultButtonRefs[index - 1]?.focus();
        return;
      }
    }
  }

  function handleSearchResultClick(result: GeocodingDataResult) {
    const { country, latitude, longitude, name, timezone } = result;
    onLocationInfoChange({
      country,
      latitude,
      longitude,
      name,
      timezone,
    });
    setIsDropdownShown(false);
  }

  /* --------------------------------- Markup --------------------------------- */

  const searchResultButtons = geocodingData?.results?.map((result, index) => (
    <li key={result.id}>
      <DropdownButton
        border={true}
        onClick={() => {
          handleSearchResultClick(result);
        }}
        onKeyDown={(e) => {
          handleSearchResultKeyDown(e, index);
        }}
        ref={(node) => {
          if (node) searchResultButtonRefs.push(node);
        }}
      >
        <span className="flex items-center justify-between">
          {result.name}
          <span className="text-sm text-neutral-300">
            {result.country}, {result.admin1}
          </span>
        </span>
      </DropdownButton>
    </li>
  ));

  let content: React.ReactNode = (
    <li className="flex h-10 items-center gap-3 px-2">
      <img
        alt=""
        className="animate-spin motion-reduce:animate-none"
        src={iconLoading}
      />
      Search in progress
    </li>
  );

  if (error) {
    content = (
      <li className="flex h-10 items-center gap-3 px-2">
        <img alt="" src={iconError} />
        Error occured when searching; please try again later
      </li>
    );
  } else if (!loading) {
    content = searchResultButtons ?? (
      <li className="flex h-10 items-center gap-3 px-2">
        <img alt="" src={iconError} />
        No results
      </li>
    );
  }

  return (
    <search className="relative mt-12 xl:mt-16 xl:self-center">
      <label className="flex h-14 cursor-text items-center gap-4 rounded-xl bg-neutral-800 px-6 outline-offset-3 hover:bg-neutral-700 has-focus-visible:outline-2 xl:w-2xl">
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

      <p aria-atomic="true" aria-live="polite" className="sr-only">
        {loading ? "" : `Loaded search results`}
      </p>

      <BaseDropdown
        isShown={isDropdownShown}
        position={{ left: "0", right: "0", top: "4.25rem" }}
        ref={dropdownRef}
      >
        <ul
          aria-busy={loading}
          aria-label="Search results"
          className="flex flex-col gap-0.5 p-2"
        >
          {content}
        </ul>
      </BaseDropdown>
    </search>
  );
}
