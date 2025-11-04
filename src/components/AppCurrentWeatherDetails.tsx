import type { PrecipitationUnit, WindSpeedUnit } from "../types";

import CurrentWeatherDetailCard from "./CurrentWeatherDetailCard";

interface AppCurrentWeatherDetailsProps {
  feelsLikeTemperature: number;
  humidity: number;
  wind: number;
  windSpeedUnit: WindSpeedUnit;
  precipitation: number;
  precipitationUnit: PrecipitationUnit;
}

function AppCurrentWeatherDetails({
  feelsLikeTemperature,
  humidity,
  wind,
  windSpeedUnit,
  precipitation,
  precipitationUnit,
}: AppCurrentWeatherDetailsProps) {
  const shownPrecipitationUnit = precipitationUnit === "inch" ? "in" : "mm";

  return (
    <ul className="mt-5 grid grid-cols-2 gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6">
      <CurrentWeatherDetailCard
        name="Feels Like"
        value={`${Math.round(feelsLikeTemperature)}°`}
      />
      <CurrentWeatherDetailCard name="Humidity" value={`${humidity}%`} />
      <CurrentWeatherDetailCard
        name="Wind"
        value={`${Math.round(wind)} ${windSpeedUnit}`}
      />
      <CurrentWeatherDetailCard
        name="Precipitation"
        value={`${Math.round(precipitation)} ${shownPrecipitationUnit}`}
      />
    </ul>
  );
}

export default AppCurrentWeatherDetails;
