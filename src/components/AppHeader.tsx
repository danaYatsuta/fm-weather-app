import { useRef } from "react";
import { useDropdown } from "../util";
import type {
  PrecipitationUnit,
  TempUnit,
  UnitSystem,
  WindUnit,
} from "../types";
import UnitRadioInput from "./UnitRadioInput";
import BaseDropdown from "./BaseDropdown";
import BaseDropdownButton from "./BaseDropdownButton";

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
        className="flex h-8 items-center gap-1.5 rounded-lg bg-neutral-800 px-2.5 text-sm outline-offset-[3px] hover:bg-neutral-700 focus:outline-2 xl:h-11 xl:gap-2.5 xl:px-4 xl:text-base"
        onClick={() => {
          setIsDropdownShown(!isDropdownShown);
        }}
        ref={dropdownToggleRef}
      >
        <img src="/icon-units.svg" alt="" className="h-3.5 xl:h-auto" />
        Units
        <img src="/icon-dropdown.svg" alt="" className="h-1.5 xl:h-auto" />
      </button>

      {isDropdownShown && (
        <BaseDropdown dropdownType="unitDropdown" ref={dropdownRef}>
          <BaseDropdownButton
            onButtonClick={() => {
              onUnitSystemChange(
                unitSystem === "metric" ? "imperial" : "metric",
              );
            }}
          >
            Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
          </BaseDropdownButton>

          <div className="mt-1 divide-y divide-neutral-600">
            <UnitRadioInput<TempUnit>
              legend="Temperature"
              name="tempUnit"
              options={[
                { label: "Celsius (°C)", value: "celsius" },
                { label: "Fahrenheit (°F)", value: "fahrenheit" },
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
        </BaseDropdown>
      )}
    </header>
  );
}

export default AppHeader;
