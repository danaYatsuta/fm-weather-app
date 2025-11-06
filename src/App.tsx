import { useEffect, useState } from "react";

import type {
  LocationInfo,
  UnitInfo,
  UnitSystem,
  WeatherResponse,
} from "./types";

import AppCurrentWeatherCard from "./components/AppCurrentWeatherCard";
import AppCurrentWeatherDetails from "./components/AppCurrentWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppHeader from "./components/AppHeader";
import AppHourlyForecast from "./components/AppHourlyForecast";
import AppSearchForm from "./components/AppSearchForm";

function App() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [unitInfo, setUnitInfo] = useState<UnitInfo>({
    temperatureUnit: "celsius",
    windSpeedUnit: "kmh",
    precipitationUnit: "mm",
  });

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    name: "Berlin",
    country: "Germany",
    timezone: "Europe/Berlin",
    latitude: 52.52,
    longitude: 13.41,
  });

  const [weatherResponse, setWeatherResponse] =
    useState<WeatherResponse | null>(null);

  function handleUnitSystemChange(newUnitSystem: UnitSystem) {
    setUnitSystem(newUnitSystem);

    if (newUnitSystem === "metric") {
      setUnitInfo({
        temperatureUnit: "celsius",
        windSpeedUnit: "kmh",
        precipitationUnit: "mm",
      });
    } else {
      setUnitInfo({
        temperatureUnit: "fahrenheit",
        windSpeedUnit: "mph",
        precipitationUnit: "inch",
      });
    }
  }

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?`;

    const params = new URLSearchParams([
      [
        "current",
        "weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation",
      ],
      ["daily", "weather_code,temperature_2m_max,temperature_2m_min"],
      ["hourly", "weather_code,temperature_2m"],

      ["latitude", locationInfo.latitude.toString()],
      ["longitude", locationInfo.longitude.toString()],
      ["timezone", locationInfo.timezone],
      ["temperature_unit", unitInfo.temperatureUnit],
      ["wind_speed_unit", unitInfo.windSpeedUnit],
      ["precipitation_unit", unitInfo.precipitationUnit],
    ]);

    async function fetchData() {
      setWeatherResponse(null);

      try {
        const response = await fetch(url + params);

        if (!response.ok) {
          console.log(
            `Response failed, status: ${response.status} ${response.statusText}`,
          );
          return;
        }

        const result = await response.json();
        setTimeout(() => {
          setWeatherResponse(result);
        }, 500);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }

    fetchData();
  }, [unitInfo, locationInfo]);

  return (
    <>
      <AppHeader
        unitSystem={unitSystem}
        unitInfo={unitInfo}
        onUnitSystemChange={handleUnitSystemChange}
        onUnitInfoChange={setUnitInfo}
      />

      <main className="my-12 flex grid-cols-[800px_416px] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
        <h1 className="font-bricolage-grotesque col-span-2 text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <AppSearchForm onLocationInfoChange={setLocationInfo} />

        <AppCurrentWeatherCard
          locationName={locationInfo.name}
          locationCountry={locationInfo.country}
          time={weatherResponse?.current.time}
          weatherCode={weatherResponse?.current.weather_code}
          temperature={weatherResponse?.current.temperature_2m}
        />
        <AppCurrentWeatherDetails
          feelsLikeTemperature={weatherResponse?.current.apparent_temperature}
          humidity={weatherResponse?.current.relative_humidity_2m}
          windSpeed={weatherResponse?.current.wind_speed_10m}
          windSpeedUnit={unitInfo.windSpeedUnit}
          precipitation={weatherResponse?.current.precipitation}
          precipitationUnit={unitInfo.precipitationUnit}
        />
        <AppDailyForecast
          times={weatherResponse?.daily.time}
          weatherCodes={weatherResponse?.daily.weather_code}
          maxTemps={weatherResponse?.daily.temperature_2m_max}
          minTemps={weatherResponse?.daily.temperature_2m_min}
        />
        <AppHourlyForecast
          times={weatherResponse?.hourly.time}
          weatherCodes={weatherResponse?.hourly.weather_code}
          temperatures={weatherResponse?.hourly.temperature_2m}
        />
      </main>
    </>
  );
}

export default App;
