import { useEffect, useState } from "react";

import AppCurrentWeatherCard from "./components/AppCurrentWeatherCard";
import AppCurrentWeatherDetails from "./components/AppCurrentWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppHeader from "./components/AppHeader";
import AppHourlyForecast from "./components/AppHourlyForecast";
import AppSearchForm from "./components/AppSearchForm";

import type {
  PrecipitationUnit,
  TempUnit,
  UnitSystem,
  WeatherResponse,
  WindUnit,
} from "./types";

function App() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [tempUnit, setTempUnit] = useState<TempUnit>("celsius");
  const [windUnit, setWindUnit] = useState<WindUnit>("kmh");
  const [precipitationUnit, setPrecipitationUnit] =
    useState<PrecipitationUnit>("mm");

  const [latitide, setLatitude] = useState(52.52);
  const [longitude, setLongitude] = useState(13.41);
  const [timezone, setTimezone] = useState("");

  const [locationName, setLocationName] = useState("");
  const [locationCountry, setLocationCountry] = useState("");

  const [weatherResponse, setWeatherResponse] =
    useState<WeatherResponse | null>(null);

  function handleUnitSystemChange(newUnitSystem: UnitSystem) {
    setUnitSystem(newUnitSystem);

    if (newUnitSystem === "metric") {
      setTempUnit("celsius");
      setWindUnit("kmh");
      setPrecipitationUnit("mm");
    } else {
      setTempUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipitationUnit("inch");
    }
  }

  function handleLocationChange(
    newLatitude: number,
    newLongitude: number,
    newTimezone: string,
    newLocationName: string,
    newLocationCountry: string,
  ) {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
    setTimezone(newTimezone);
    setLocationName(newLocationName);
    setLocationCountry(newLocationCountry);
  }

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitide}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&timezone=${timezone}&wind_speed_unit=${windUnit}&temperature_unit=${tempUnit}&precipitation_unit=${precipitationUnit}`;

    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const result = await response.json();
          setWeatherResponse(result);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }

    fetchData();
  }, [latitide, longitude, timezone, windUnit, tempUnit, precipitationUnit]);

  return (
    <>
      <AppHeader
        unitSystem={unitSystem}
        tempUnit={tempUnit}
        windUnit={windUnit}
        precipitationUnit={precipitationUnit}
        onUnitSystemChange={handleUnitSystemChange}
        onTempUnitChange={setTempUnit}
        onWindUnitChange={setWindUnit}
        onPrecipitationUnitChange={setPrecipitationUnit}
      />

      <main className="my-12 flex grid-cols-[800px_416px] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
        <h1 className="font-bricolage-grotesque col-span-2 text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <AppSearchForm onLocationChange={handleLocationChange} />

        {weatherResponse && (
          <>
            <AppCurrentWeatherCard
              location={locationName}
              country={locationCountry}
              time={weatherResponse.current.time}
              weatherCode={weatherResponse.current.weather_code}
              temp={weatherResponse.current.temperature_2m}
            />
            <AppCurrentWeatherDetails
              feelsLikeTemp={weatherResponse.current.apparent_temperature}
              humidity={weatherResponse.current.relative_humidity_2m}
              wind={weatherResponse.current.wind_speed_10m}
              windUnit={weatherResponse.current_units.wind_speed_10m}
              precipitation={weatherResponse.current.precipitation}
              precipitationUnit={weatherResponse.current_units.precipitation}
            />
            <AppDailyForecast
              times={weatherResponse.daily.time}
              weatherCodes={weatherResponse.daily.weather_code}
              maxTemps={weatherResponse.daily.temperature_2m_max}
              minTemps={weatherResponse.daily.temperature_2m_min}
            />
            <AppHourlyForecast
              times={weatherResponse.hourly.time}
              weatherCodes={weatherResponse.hourly.weather_code}
              temps={weatherResponse.hourly.temperature_2m}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
