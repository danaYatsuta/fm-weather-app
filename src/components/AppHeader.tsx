import { useRef, useState } from "react";

import type {
  PrecipitationUnit,
  TemperatureUnit,
  UnitInfo,
  UnitSystem,
  WindSpeedUnit,
} from "../types";

import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";
import UnitRadioInput from "./UnitRadioInput";

import iconDropdown from "../assets/icon-dropdown.svg";
import iconUnits from "../assets/icon-units.svg";
import logo from "../assets/logo.svg";
import { useClickAway } from "ahooks";

interface AppHeaderProps {
  unitSystem: UnitSystem;
  unitInfo: UnitInfo;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
  onUnitInfoChange: (unitInfo: UnitInfo) => void;
}

function AppHeader({
  unitSystem,
  unitInfo,
  onUnitSystemChange,
  onUnitInfoChange,
}: AppHeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useClickAway(() => {
    setIsDropdownShown(false);
  }, [dropdownRef, dropdownToggleRef]);

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    onUnitInfoChange({
      ...unitInfo,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <header className="relative mt-4 flex justify-between xl:mt-12">
      <a href="/">
        <img src={logo} alt="Weather Now" className="w-[138px] xl:w-auto" />
      </a>

      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-neutral-800 px-2.5 text-sm hover:bg-neutral-700 xl:h-11 xl:gap-2.5 xl:px-4 xl:text-base"
        onClick={() => {
          setIsDropdownShown(!isDropdownShown);
        }}
        ref={dropdownToggleRef}
      >
        <img src={iconUnits} alt="" className="h-3.5 xl:h-auto" />
        Units
        <img src={iconDropdown} alt="" className="h-1.5 xl:h-auto" />
      </button>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[54px] right-0 z-10`}
        ref={dropdownRef}
      >
        <BaseCard>
          <div
            role="toolbar"
            aria-orientation="vertical"
            className="min-w-[214px] px-2 py-1"
          >
            <DropdownButton
              fullWidth={true}
              onButtonClick={() => {
                onUnitSystemChange(
                  unitSystem === "metric" ? "imperial" : "metric",
                );
              }}
            >
              Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
            </DropdownButton>

            <div className="mt-1.5 divide-y divide-neutral-600">
              <UnitRadioInput<TemperatureUnit>
                legend="Temperature"
                name="temperatureUnit"
                options={[
                  { label: "Celsius (°C)", value: "celsius" },
                  { label: "Fahrenheit (°F)", value: "fahrenheit" },
                ]}
                value={unitInfo.temperatureUnit}
                onValueChange={handleValueChange}
              />

              <UnitRadioInput<WindSpeedUnit>
                legend="Wind Speed"
                name="windSpeedUnit"
                options={[
                  { label: "km/h", value: "kmh" },
                  { label: "mph", value: "mph" },
                ]}
                value={unitInfo.windSpeedUnit}
                onValueChange={handleValueChange}
              />

              <UnitRadioInput<PrecipitationUnit>
                legend="Precipitation"
                name="precipitationUnit"
                options={[
                  { label: "Millimeters (mm)", value: "mm" },
                  { label: "Inches (in)", value: "inch" },
                ]}
                value={unitInfo.precipitationUnit}
                onValueChange={handleValueChange}
              />
            </div>
          </div>
        </BaseCard>
      </div>
    </header>
  );
}

export default AppHeader;
