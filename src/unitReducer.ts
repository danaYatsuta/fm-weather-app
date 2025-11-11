import type { UnitInfo, UnitInfoAction } from "./types/units";

function unitReducer(unitInfo: UnitInfo, action: UnitInfoAction): UnitInfo {
  switch (action.type) {
    case "changedUnitSystem": {
      if (action.unitSystem === "metric") {
        return {
          precipitationUnit: "mm",
          temperatureUnit: "celsius",
          unitSystem: "metric",
          windSpeedUnit: "kmh",
        };
      } else {
        return {
          precipitationUnit: "inch",
          temperatureUnit: "fahrenheit",
          unitSystem: "imperial",
          windSpeedUnit: "mph",
        };
      }
    }
    case "changedIndividualUnit": {
      const nextUnitInfo = {
        ...unitInfo,
        [action.unitType]: action.unitValue,
      };

      if (
        nextUnitInfo.temperatureUnit === "celsius" &&
        nextUnitInfo.windSpeedUnit === "kmh" &&
        nextUnitInfo.precipitationUnit === "mm"
      ) {
        nextUnitInfo.unitSystem = "metric";
      } else if (
        nextUnitInfo.temperatureUnit === "fahrenheit" &&
        nextUnitInfo.windSpeedUnit === "mph" &&
        nextUnitInfo.precipitationUnit === "inch"
      )
        nextUnitInfo.unitSystem = "imperial";

      return nextUnitInfo;
    }
  }
}

export default unitReducer;
