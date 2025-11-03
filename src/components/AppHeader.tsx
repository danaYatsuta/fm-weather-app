import { useRef } from "react";
import { useDropdown } from "../util";
import type {
  PrecipitationUnit,
  TempUnit,
  UnitSystem,
  WindUnit,
} from "../types";
import UnitRadioInput from "./UnitRadioInput";

interface AppHeaderProps {
  unitSystem: UnitSystem;
  tempUnit: TempUnit;
  windUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
  onTempUnitChange: (value: TempUnit) => void;
  onWindUnitChange: (value: WindUnit) => void;
  onPrecipitationUnitChange: (value: PrecipitationUnit) => void;
}

function AppHeader({
  unitSystem,
  tempUnit,
  windUnit,
  precipitationUnit,
  onUnitSystemChange,
  onTempUnitChange,
  onWindUnitChange,
  onPrecipitationUnitChange,
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
        src="/logo.svg"
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
          src="/icon-units.svg"
          aria-hidden="true"
          className="h-3.5 xl:h-auto"
        />
        Units
        <img
          src="/icon-dropdown.svg"
          aria-hidden="true"
          className="h-1.5 xl:h-auto"
        />
      </button>

      {isDropdownShown && (
        <div
          className="absolute top-[54px] right-0 z-10 flex min-w-[214px] flex-col rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-base"
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

          <UnitRadioInput<TempUnit>
            legend="Temperature"
            name="tempUnit"
            options={[
              { label: "Celsius (C°)", value: "celsius" },
              { label: "Fahrenheit (F°)", value: "fahrenheit" },
            ]}
            value={tempUnit}
            onValueChange={onTempUnitChange}
          />

          <UnitRadioInput<WindUnit>
            legend="Wind Speed"
            name="windUnit"
            options={[
              { label: "km/h", value: "kmh" },
              { label: "mph", value: "mph" },
            ]}
            value={windUnit}
            onValueChange={onWindUnitChange}
          />

          <UnitRadioInput<PrecipitationUnit>
            legend="Precipitation"
            name="precipitationUnit"
            options={[
              { label: "Millimeters (mm)", value: "mm" },
              { label: "Inches (in)", value: "inch" },
            ]}
            value={precipitationUnit}
            onValueChange={onPrecipitationUnitChange}
          />
        </div>
      )}
    </header>
  );
}

export default AppHeader;
