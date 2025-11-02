import AppHeader from "./components/AppHeader";
import AppSearchForm from "./components/AppSearchForm";
import AppCurrentWeatherCard from "./components/AppCurrentWeatherCard";
import AppCurrentWeatherDetails from "./components/AppCurrentWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppHourlyForecast from "./components/AppHourlyForecast";

import { geocodingResponse, weatherResponse } from "./exampleResponses";

function App() {
  const {
    time: currentTime,
    weather_code: currentWeatherCode,
    temperature_2m: currentTemp,
    apparent_temperature: currentFeelsLikeTemp,
    relative_humidity_2m: currentHumidity,
    wind_speed_10m: currentWind,
    precipitation: currentPrecipitation,
  } = weatherResponse.current;

  const {
    wind_speed_10m: currentWindUnit,
    precipitation: currentPrecipitationUnit,
  } = weatherResponse.current_units;

  const {
    time: dailyTimes,
    weather_code: dailyWeatherCodes,
    temperature_2m_max: dailyMaxTemps,
    temperature_2m_min: dailyMinTemps,
  } = weatherResponse.daily;

  const {
    time: hourlyTimes,
    weather_code: hourlyWeatherCodes,
    temperature_2m: hourlyTemps,
  } = weatherResponse.hourly;

  return (
    <>
      <AppHeader />

      <main className="grid-template my-12 flex grid-cols-[800px_384px] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
        <h1 className="grid-area-slogan font-bricolage-grotesque text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <AppSearchForm />

        <AppCurrentWeatherCard
          location={geocodingResponse.results[0].name}
          country={geocodingResponse.results[0].country}
          time={currentTime}
          weatherCode={currentWeatherCode}
          temp={currentTemp}
        />

        <AppCurrentWeatherDetails
          feelsLikeTemp={currentFeelsLikeTemp}
          humidity={currentHumidity}
          wind={currentWind}
          windUnit={currentWindUnit}
          precipitation={currentPrecipitation}
          precipitationUnit={currentPrecipitationUnit}
        />

        <AppDailyForecast
          times={dailyTimes}
          weatherCodes={dailyWeatherCodes}
          maxTemps={dailyMaxTemps}
          minTemps={dailyMinTemps}
        />

        <AppHourlyForecast
          times={hourlyTimes}
          weatherCodes={hourlyWeatherCodes}
          temps={hourlyTemps}
        />
      </main>
    </>
  );
}

export default App;
