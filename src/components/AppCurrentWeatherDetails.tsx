import type { PrecipitationUnit, WindSpeedUnit } from "../types";

import CurrentWeatherDetailCard from "./CurrentWeatherDetailCard";

interface AppCurrentWeatherDetailsProps {
  feelsLikeTemperature?: number;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  windSpeedUnit: WindSpeedUnit;
  precipitationUnit: PrecipitationUnit;
}

function AppCurrentWeatherDetails({
  feelsLikeTemperature,
  humidity,
  windSpeed,
  precipitation,
  windSpeedUnit,
  precipitationUnit,
}: AppCurrentWeatherDetailsProps) {
  const isDataLoaded =
    feelsLikeTemperature !== undefined &&
    humidity !== undefined &&
    windSpeed !== undefined &&
    precipitation !== undefined;

  let shownFeelsLikeTemperatureValue = "—";
  let shownHumidityValue = "—";
  let shownWindSpeedValue = "—";
  let shownPrecipitationValue = "—";

  if (isDataLoaded) {
    const shownPrecipitationUnit = precipitationUnit === "inch" ? "in" : "mm";
    const shownWindSpeedUnit = windSpeedUnit === "kmh" ? "km/h" : "mph";

    shownFeelsLikeTemperatureValue = `${Math.round(feelsLikeTemperature).toString()}°`;
    shownHumidityValue = `${humidity.toString()}%`;
    shownWindSpeedValue = `${Math.round(windSpeed).toString()} ${shownWindSpeedUnit}`;
    shownPrecipitationValue = `${Math.round(precipitation).toString()} ${shownPrecipitationUnit}`;
  }

  return (
    <ul
      className="mt-5 grid grid-cols-2 items-start gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6"
      aria-busy={!isDataLoaded}
    >
      <CurrentWeatherDetailCard
        name="Feels Like"
        value={shownFeelsLikeTemperatureValue}
      />
      <CurrentWeatherDetailCard name="Humidity" value={shownHumidityValue} />
      <CurrentWeatherDetailCard name="Wind" value={shownWindSpeedValue} />
      <CurrentWeatherDetailCard
        name="Precipitation"
        value={shownPrecipitationValue}
      />
    </ul>
  );
}

export default AppCurrentWeatherDetails;
