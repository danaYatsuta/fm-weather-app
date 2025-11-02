import AppHeader from "./components/AppHeader";
import AppSearchForm from "./components/AppSearchForm";
import AppWeatherCard from "./components/AppWeatherCard";
import AppWeatherDetails from "./components/AppWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppHourlyForecast from "./components/AppHourlyForecast";

import { geocodingResponse, weatherResponse } from "./exampleResponses";

function App() {
  const {
    time,
    weather_code: weatherCode,
    temperature_2m: temp,
    apparent_temperature: feelsLikeTemp,
    relative_humidity_2m: humidity,
    wind_speed_10m: wind,
    precipitation,
  } = weatherResponse.current;

  const { wind_speed_10m: windUnit, precipitation: precipitationUnit } =
    weatherResponse.current_units;

  const {
    time: times,
    weather_code: weatherCodes,
    temperature_2m_max: maxTemps,
    temperature_2m_min: minTemps,
  } = weatherResponse.daily;

  return (
    <>
      <AppHeader />

      <main className="grid-template my-12 flex grid-cols-[800px_1fr] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
        <h1 className="grid-area-slogan font-bricolage-grotesque self-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <AppSearchForm />

        <AppWeatherCard
          location={geocodingResponse.results[0].name}
          country={geocodingResponse.results[0].country}
          time={time}
          weatherCode={weatherCode}
          temp={temp}
        />

        <AppWeatherDetails
          feelsLikeTemp={feelsLikeTemp}
          humidity={humidity}
          wind={wind}
          windUnit={windUnit}
          precipitation={precipitation}
          precipitationUnit={precipitationUnit}
        />

        <AppDailyForecast
          times={times}
          weatherCodes={weatherCodes}
          maxTemps={maxTemps}
          minTemps={minTemps}
        />

        <AppHourlyForecast />
      </main>
    </>
  );
}

export default App;
