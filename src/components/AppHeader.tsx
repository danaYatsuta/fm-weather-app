import { useRef, useState } from "react";

import type {
  IndividualUnitChange,
  PrecipitationUnit,
  TemperatureUnit,
  UnitInfo,
  UnitSystem,
  WindSpeedUnit,
} from "../types/units";

import iconDropdown from "../assets/icon-dropdown.svg";
import iconUnits from "../assets/icon-units.svg";
import logo from "../assets/logo.svg";
import { useClickAwayAndEsc } from "../util";
import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";
import UnitRadioGroup from "./UnitRadioGroup";

interface AppHeaderProps {
  onIndividualUnitChange: (individualUnitChange: IndividualUnitChange) => void;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
  unitInfo: UnitInfo;
}

export default function AppHeader({
  onIndividualUnitChange,
  onUnitSystemChange,
  unitInfo,
}: AppHeaderProps) {
  /* ---------------------------------- State --------------------------------- */

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  /* ---------------------------------- Hooks --------------------------------- */

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  useClickAwayAndEsc(() => {
    setIsDropdownShown(false);
  }, [dropdownRef, dropdownToggleRef]);

  /* --------------------------------- Markup --------------------------------- */

  return (
    <header className="relative mt-4 flex justify-between xl:mt-12">
      <a href="/">
        <img
          alt="Weather Now homepage"
          className="w-[138px] xl:w-auto"
          src={logo}
        />
      </a>

      <button
        aria-controls="units-dropdown"
        aria-expanded={isDropdownShown}
        className="flex h-8 items-center gap-1.5 rounded-lg bg-neutral-800 px-2.5 text-sm hover:bg-neutral-700 xl:h-11 xl:gap-2.5 xl:px-4 xl:text-base"
        onClick={() => {
          setIsDropdownShown(!isDropdownShown);
        }}
        ref={dropdownToggleRef}
        type="button"
      >
        <img alt="" className="h-3.5 xl:h-auto" src={iconUnits} />
        Units
        <img alt="" className="h-1.5 xl:h-auto" src={iconDropdown} />
      </button>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[54px] right-0 z-10`}
        id="units-dropdown"
        ref={dropdownRef}
      >
        <BaseCard>
          <div className="min-w-[214px] px-2 py-1">
            <DropdownButton
              fullWidth={true}
              onButtonClick={() => {
                onUnitSystemChange(
                  unitInfo.unitSystem === "metric" ? "imperial" : "metric",
                );
              }}
            >
              Switch to{" "}
              {unitInfo.unitSystem === "metric" ? "Imperial" : "Metric"}
            </DropdownButton>

            <div className="mt-1.5 divide-y divide-neutral-600">
              <UnitRadioGroup<TemperatureUnit>
                legend="Temperature"
                name="temperatureUnit"
                onChange={(value) => {
                  onIndividualUnitChange({
                    unitType: "temperatureUnit",
                    unitValue: value,
                  });
                }}
                options={[
                  { label: "Celsius (°C)", value: "celsius" },
                  { label: "Fahrenheit (°F)", value: "fahrenheit" },
                ]}
                value={unitInfo.temperatureUnit}
              />

              <UnitRadioGroup<WindSpeedUnit>
                legend="Wind Speed"
                name="windSpeedUnit"
                onChange={(value) => {
                  onIndividualUnitChange({
                    unitType: "windSpeedUnit",
                    unitValue: value,
                  });
                }}
                options={[
                  { label: "km/h", value: "kmh" },
                  { label: "mph", value: "mph" },
                ]}
                value={unitInfo.windSpeedUnit}
              />

              <UnitRadioGroup<PrecipitationUnit>
                legend="Precipitation"
                name="precipitationUnit"
                onChange={(value) => {
                  onIndividualUnitChange({
                    unitType: "precipitationUnit",
                    unitValue: value,
                  });
                }}
                options={[
                  { label: "Millimeters (mm)", value: "mm" },
                  { label: "Inches (in)", value: "inch" },
                ]}
                value={unitInfo.precipitationUnit}
              />
            </div>
          </div>
        </BaseCard>
      </div>
    </header>
  );
}
