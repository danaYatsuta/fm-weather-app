import WeatherDetailCard from "./WeatherDetailCard";

interface AppWeatherDetailsProps {
  feelsLikeTemp: number;
  humidity: number;
  wind: number;
  windUnit: string;
  precipitation: number;
  precipitationUnit: string;
}

function AppWeatherDetails({
  feelsLikeTemp,
  humidity,
  wind,
  windUnit,
  precipitation,
  precipitationUnit,
}: AppWeatherDetailsProps) {
  return (
    <ul className="grid-area-details mt-5 grid grid-cols-2 gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6">
      <WeatherDetailCard
        name="Feels Like"
        value={`${Math.round(feelsLikeTemp)}°`}
      />
      <WeatherDetailCard name="Humidity" value={`${humidity}%`} />
      <WeatherDetailCard name="Wind" value={`${wind} ${windUnit}`} />
      <WeatherDetailCard
        name="Precipitation"
        value={`${Math.round(precipitation)} ${precipitationUnit}`}
      />
    </ul>
  );
}

export default AppWeatherDetails;
