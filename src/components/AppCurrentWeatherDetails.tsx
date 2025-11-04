import CurrentWeatherDetailCard from "./CurrentWeatherDetailCard";

interface AppCurrentWeatherDetailsProps {
  feelsLikeTemp: number;
  humidity: number;
  wind: number;
  windUnit: string;
  precipitation: number;
  precipitationUnit: string;
}

function AppCurrentWeatherDetails({
  feelsLikeTemp,
  humidity,
  wind,
  windUnit,
  precipitation,
  precipitationUnit,
}: AppCurrentWeatherDetailsProps) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6">
      <CurrentWeatherDetailCard
        name="Feels Like"
        value={`${Math.round(feelsLikeTemp)}°`}
      />
      <CurrentWeatherDetailCard name="Humidity" value={`${humidity}%`} />
      <CurrentWeatherDetailCard name="Wind" value={`${wind} ${windUnit}`} />
      <CurrentWeatherDetailCard
        name="Precipitation"
        value={`${Math.round(precipitation)} ${precipitationUnit}`}
      />
    </ul>
  );
}

export default AppCurrentWeatherDetails;
