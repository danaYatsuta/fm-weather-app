import WeatherDetailCard from "./WeatherDetailCard";

function AppWeatherDetails() {
  return (
    <ul className="grid-area-details mt-5 grid grid-cols-2 gap-4 xl:mt-8 xl:grid-cols-4 xl:gap-6">
      <WeatherDetailCard name="Feels Like" value="18°" />
      <WeatherDetailCard name="Humidity" value="46%" />
      <WeatherDetailCard name="Wind" value="14 km/h" />
      <WeatherDetailCard name="Precipitation" value="0 mm" />
    </ul>
  );
}

export default AppWeatherDetails;
