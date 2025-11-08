import { useState } from "react";
import { useRequest } from "ahooks";

import type { LocationInfo, UnitInfo, UnitSystem, WeatherData } from "./types";

import AppCurrentWeatherCard from "./components/AppCurrentWeatherCard";
import AppCurrentWeatherDetails from "./components/AppCurrentWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppError from "./components/AppError";
import AppHeader from "./components/AppHeader";
import AppHourlyForecast from "./components/AppHourlyForecast";
import AppSearchForm from "./components/AppSearchForm";

function App() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    name: "Berlin",
    country: "Germany",
    timezone: "Europe/Berlin",
    latitude: 52.52437,
    longitude: 13.41053,
  });

  /*
    unitSystem and unitInfo might looks like contradicting states, but that's not the case -
    it's valid, for example, for unitSystem to be "metric" and unitInfo.temperatureUnit to be "fahrenheit"
    unitSystem is used for quick toggle between all units, it doesn't determine the value of unitInfo
  */
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [unitInfo, setUnitInfo] = useState<UnitInfo>({
    temperatureUnit: "celsius",
    windSpeedUnit: "kmh",
    precipitationUnit: "mm",
  });

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

  const {
    data: weatherData,
    error,
    run,
  } = useRequest(
    async (): Promise<WeatherData> => {
      const response = await fetch(url + params.toString());

      if (!response.ok)
        throw new Error(`${response.status.toString()} ${response.statusText}`);

      const data = (await response.json()) as WeatherData;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      });
    },
    {
      refreshDeps: [locationInfo, unitInfo],
      cacheKey:
        "weatherData" + JSON.stringify(locationInfo) + JSON.stringify(unitInfo),
      staleTime: 60 * 1000,
    },
  );

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

  function handleUnitInfoChange(newUnitInfo: UnitInfo) {
    setUnitInfo(newUnitInfo);

    if (
      newUnitInfo.temperatureUnit === "celsius" &&
      newUnitInfo.windSpeedUnit === "kmh" &&
      newUnitInfo.precipitationUnit === "mm"
    ) {
      setUnitSystem("metric");
    } else if (
      newUnitInfo.temperatureUnit === "fahrenheit" &&
      newUnitInfo.windSpeedUnit === "mph" &&
      newUnitInfo.precipitationUnit === "inch"
    )
      setUnitSystem("imperial");
  }

  return (
    <>
      <AppHeader
        unitSystem={unitSystem}
        unitInfo={unitInfo}
        onUnitSystemChange={handleUnitSystemChange}
        onUnitInfoChange={handleUnitInfoChange}
      />

      {error ? (
        <main className="my-28">
          <AppError onRetryButtonClick={run} />
        </main>
      ) : (
        <main className="my-12 flex grid-cols-[800px_1fr] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
          <h1 className="font-bricolage-grotesque col-span-2 text-center text-[54px] leading-16 font-bold">
            How's the sky looking today?
          </h1>

          <AppSearchForm onLocationInfoChange={setLocationInfo} />

          <AppCurrentWeatherCard
            locationName={locationInfo.name}
            locationCountry={locationInfo.country}
            time={weatherData?.current.time}
            weatherCode={weatherData?.current.weather_code}
            temperature={weatherData?.current.temperature_2m}
          />
          <AppCurrentWeatherDetails
            feelsLikeTemperature={weatherData?.current.apparent_temperature}
            humidity={weatherData?.current.relative_humidity_2m}
            windSpeed={weatherData?.current.wind_speed_10m}
            windSpeedUnit={unitInfo.windSpeedUnit}
            precipitation={weatherData?.current.precipitation}
            precipitationUnit={unitInfo.precipitationUnit}
          />
          <AppDailyForecast
            times={weatherData?.daily.time}
            weatherCodes={weatherData?.daily.weather_code}
            maxTemps={weatherData?.daily.temperature_2m_max}
            minTemps={weatherData?.daily.temperature_2m_min}
          />
          <AppHourlyForecast
            times={weatherData?.hourly.time}
            weatherCodes={weatherData?.hourly.weather_code}
            temperatures={weatherData?.hourly.temperature_2m}
          />
        </main>
      )}
    </>
  );
}

export default App;
