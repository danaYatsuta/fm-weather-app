import type { PrecipitationUnit, WindSpeedUnit } from "../types";

import CurrentWeatherDetailCard from "./CurrentWeatherDetailCard";

interface AppCurrentWeatherDetailsProps {
  feelsLikeTemperature?: number;
  humidity?: number;
  windSpeed?: number;
  windSpeedUnit: WindSpeedUnit;
  precipitation?: number;
  precipitationUnit: PrecipitationUnit;
}

function AppCurrentWeatherDetails({
  feelsLikeTemperature,
  humidity,
  windSpeed,
  windSpeedUnit,
  precipitation,
  precipitationUnit,
}: AppCurrentWeatherDetailsProps) {
  const shownPrecipitationUnit = precipitationUnit === "inch" ? "in" : "mm";
  const shownWindSpeedUnit = windSpeedUnit === "kmh" ? "km/h" : "mph";

  const shownFeelsLikeTemperatureValue =
    feelsLikeTemperature !== undefined
      ? `${Math.round(feelsLikeTemperature)}°`
      : "—";

  const shownHumidityValue = humidity !== undefined ? `${humidity}%` : "—";

  const shownWindSpeedValue =
    windSpeed !== undefined
      ? `${Math.round(windSpeed)} ${shownWindSpeedUnit}`
      : "—";

  const shownPrecipitationValue =
    precipitation !== undefined
      ? `${Math.round(precipitation)} ${shownPrecipitationUnit}`
      : "—";

  return (
    <ul
      className="mt-5 grid grid-cols-2 items-start gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6"
      aria-hidden={!feelsLikeTemperature}
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
