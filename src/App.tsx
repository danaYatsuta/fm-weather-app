import { useMount, useRequest } from "ahooks";
import { useReducer, useState } from "react";

import type { WeatherData } from "./types/data";
import type { IndividualUnitChange, UnitSystem } from "./types/units";
import type { LocationInfo } from "./types/util";

import AppCurrentWeatherCard from "./components/AppCurrentWeatherCard";
import AppCurrentWeatherDetails from "./components/AppCurrentWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppError from "./components/AppError";
import AppHeader from "./components/AppHeader";
import AppHourlyForecast from "./components/AppHourlyForecast";
import AppSearchForm from "./components/AppSearchForm";
import unitReducer from "./unitReducer";

const url = `https://api.open-meteo.com/v1/forecast?`;

export default function App() {
  /* ---------------------------------- State --------------------------------- */

  const [triedGettingUserLocation, setTriedGettingUserLocation] =
    useState(false);

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    country: "Germany",
    latitude: 52.52437,
    longitude: 13.41053,
    name: "Berlin",
    timezone: "Europe/Berlin",
  });

  /*
    unitInfo.unitSystem might looks like redundant state, but that's not the case -
    it's valid, for example, for unitInfo.unitSystem to be "metric" and unitInfo.temperatureUnit to be "fahrenheit"
    unitInfo.unitSystem is used for quick toggle between all units, it doesn't determine the value of other fields
  */

  const [unitInfo, unitInfoDispatch] = useReducer(unitReducer, {
    precipitationUnit: "mm",
    temperatureUnit: "celsius",
    unitSystem: "metric",
    windSpeedUnit: "kmh",
  });

  /* ------------------------------ Derived State ----------------------------- */

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

  /* ---------------------------------- Hooks --------------------------------- */

  useMount(() => {
    if (!("geolocation" in navigator)) {
      setTriedGettingUserLocation(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationInfo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // Open-Meteo doesn't have a reverse geocoding API, using another one would cause discrepancy between
          // initally shown location name and location names returned from search, and I don't feel like
          // switching APIs so just using a placeholder here
          name: "Your location",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        setTriedGettingUserLocation(true);
      },
      () => {
        setTriedGettingUserLocation(true);
      },
    );
  });

  const {
    data: weatherData,
    error,
    loading,
    run,
  } = useRequest(
    async (): Promise<WeatherData> => {
      const response = await fetch(url + params.toString());

      if (!response.ok)
        throw new Error(`${response.status.toString()} ${response.statusText}`);

      if (import.meta.env.DEV)
        await new Promise((resolve) => setTimeout(resolve, 500));

      return (await response.json()) as WeatherData;
    },
    {
      cacheKey:
        "weatherData" + JSON.stringify(locationInfo) + JSON.stringify(unitInfo),
      ready: triedGettingUserLocation,
      refreshDeps: [locationInfo, unitInfo],
      staleTime: 60 * 1000,
    },
  );

  /*
    After first fetch, weatherData is never undefined, but we need to pass undefined to components to display loading state;
    thus this const, which is either undefined while loading or loaded weatherData for current location
  */
  const relevantWeatherData = loading ? undefined : weatherData;

  /* -------------------------------- Handlers -------------------------------- */

  function handleIndividualUnitChange(
    individualUnitChange: IndividualUnitChange,
  ) {
    unitInfoDispatch({
      type: "changedIndividualUnit",
      ...individualUnitChange,
    });
  }

  function handleUnitSystemChange(unitSystem: UnitSystem) {
    unitInfoDispatch({ type: "changedUnitSystem", unitSystem });
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <>
      <AppHeader
        onIndividualUnitChange={handleIndividualUnitChange}
        onUnitSystemChange={handleUnitSystemChange}
        unitInfo={unitInfo}
      />

      {error ? (
        <main className="my-28 grow">
          <AppError onRetryButtonClick={run} />
        </main>
      ) : (
        <main className="my-12 flex grow flex-col xl:my-15">
          <h1 className="font-bricolage-grotesque text-center text-[3.375rem] leading-16 font-bold">
            How's the sky looking today?
          </h1>

          <AppSearchForm onLocationInfoChange={setLocationInfo} />

          <p aria-atomic="true" aria-live="polite" className="sr-only">
            {loading ? "" : `Loaded weather`}
          </p>

          <div
            aria-busy={loading}
            className="mt-8 flex grid-cols-[800px_1fr] grid-rows-[286px_min-content_min-content] flex-col xl:mt-12 xl:grid"
          >
            <AppCurrentWeatherCard
              locationCountry={locationInfo.country}
              locationName={locationInfo.name}
              temperature={relevantWeatherData?.current.temperature_2m}
              time={relevantWeatherData?.current.time}
              weatherCode={relevantWeatherData?.current.weather_code}
            />

            <AppCurrentWeatherDetails
              feelsLikeTemperature={
                relevantWeatherData?.current.apparent_temperature
              }
              humidity={relevantWeatherData?.current.relative_humidity_2m}
              precipitation={relevantWeatherData?.current.precipitation}
              precipitationUnit={unitInfo.precipitationUnit}
              windSpeed={relevantWeatherData?.current.wind_speed_10m}
              windSpeedUnit={unitInfo.windSpeedUnit}
            />

            <AppDailyForecast
              maxTemps={relevantWeatherData?.daily.temperature_2m_max}
              minTemps={relevantWeatherData?.daily.temperature_2m_min}
              times={relevantWeatherData?.daily.time}
              weatherCodes={relevantWeatherData?.daily.weather_code}
            />

            <AppHourlyForecast
              temperatures={relevantWeatherData?.hourly.temperature_2m}
              times={relevantWeatherData?.hourly.time}
              weatherCodes={relevantWeatherData?.hourly.weather_code}
            />
          </div>
        </main>
      )}

      <footer className="pb-1 text-center text-base font-normal">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/danaYatsuta">Dana Yatsuta</a>.
      </footer>
    </>
  );
}
