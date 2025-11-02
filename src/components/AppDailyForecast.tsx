import DailyForecastCard from "./DailyForecastCard";

interface AppDailyForecastProps {
  times: string[];
  maxTemps: number[];
  minTemps: number[];
  weatherCodes: number[];
}

function AppDailyForecast({
  times,
  maxTemps,
  minTemps,
  weatherCodes,
}: AppDailyForecastProps) {
  const dailyForecastCards = [...Array(7).keys()].map((x) => {
    return (
      <DailyForecastCard
        time={times[x]}
        weatherCode={weatherCodes[x]}
        maxTemp={maxTemps[x]}
        minTemp={minTemps[x]}
        key={times[x]}
      />
    );
  });

  return (
    <section className="grid-area-daily mt-8 xl:mt-0 xl:self-end">
      <h2 className="text-xl font-bold">Daily forecast</h2>

      <ul className="mt-4 grid grid-cols-3 gap-4 xl:grid-cols-7">
        {dailyForecastCards}
      </ul>
    </section>
  );
}

export default AppDailyForecast;
