export type IndividualUnitChange =
  | {
      unitType: "precipitationUnit";
      unitValue: PrecipitationUnit;
    }
  | {
      unitType: "temperatureUnit";
      unitValue: TemperatureUnit;
    }
  | {
      unitType: "windSpeedUnit";
      unitValue: WindSpeedUnit;
    };

export interface UnitInfo {
  precipitationUnit: PrecipitationUnit;
  temperatureUnit: TemperatureUnit;
  unitSystem: UnitSystem;
  windSpeedUnit: WindSpeedUnit;
}

export type UnitInfoAction =
  | (IndividualUnitChange & { type: "changedIndividualUnit" })
  | {
      type: "changedUnitSystem";
      unitSystem: UnitSystem;
    };

type PrecipitationUnit = "inch" | "mm";

type TemperatureUnit = "celsius" | "fahrenheit";

type UnitSystem = "imperial" | "metric";

type WindSpeedUnit = "kmh" | "mph";
