import { useRef, type MouseEventHandler } from "react";
import { useDropdown } from "../util";
import type {
  PrecipitationUnit,
  TempUnit,
  UnitSystem,
  WindUnit,
} from "../types";

interface AppHeaderProps {
  unitSystem: UnitSystem;
  tempUnit: TempUnit;
  windUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
}

function AppHeader({
  unitSystem,
  tempUnit,
  windUnit,
  precipitationUnit,
  onUnitSystemChange,
}: AppHeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  const [isDropdownShown, setIsDropdownShown] = useDropdown([
    dropdownRef,
    dropdownToggleRef,
  ]);

  return (
    <header className="relative mt-4 flex justify-between xl:mt-12">
      <img
        src="/src/assets/logo.svg"
        alt="Weather Now logo"
        className="w-[138px] xl:w-auto"
      />

      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-800 px-2.5 text-sm xl:h-11 xl:gap-2.5 xl:px-4 xl:text-base"
        onClick={() => {
          setIsDropdownShown(!isDropdownShown);
        }}
        ref={dropdownToggleRef}
      >
        <img
          src="/src/assets/icon-units.svg"
          aria-hidden="true"
          className="h-3.5 xl:h-auto"
        />
        Units
        <img
          src="/src/assets/icon-dropdown.svg"
          aria-hidden="true"
          className="h-1.5 xl:h-auto"
        />
      </button>

      {isDropdownShown && (
        <div
          className="absolute top-[54px] right-0 flex min-w-[214px] flex-col rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-base"
          ref={dropdownRef}
        >
          <button
            type="button"
            className="text-left"
            onClick={() => {
              onUnitSystemChange(
                unitSystem === "metric" ? "imperial" : "metric",
              );
            }}
          >
            Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
          </button>
        </div>
      )}
    </header>
  );
}

export default AppHeader;
