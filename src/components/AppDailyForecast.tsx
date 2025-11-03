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
  const dailyForecastCards: React.ReactElement[] = [];

  for (let i = 0; i < 7; i++) {
    dailyForecastCards.push(
      <DailyForecastCard
        time={times[i]}
        weatherCode={weatherCodes[i]}
        maxTemp={maxTemps[i]}
        minTemp={minTemps[i]}
        key={times[i]}
      />,
    );
  }

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
