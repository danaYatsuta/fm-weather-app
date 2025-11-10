import DailyForecastCard from "./DailyForecastCard";

interface AppDailyForecastProps {
  maxTemps?: number[];
  minTemps?: number[];
  times?: string[];
  weatherCodes?: number[];
}

function AppDailyForecast({
  maxTemps,
  minTemps,
  times,
  weatherCodes,
}: AppDailyForecastProps) {
  const isDataLoaded =
    times !== undefined &&
    maxTemps !== undefined &&
    minTemps !== undefined &&
    weatherCodes !== undefined;

  const dailyForecastCards: React.ReactElement[] = [];

  for (let i = 0; i < 7; i++) {
    dailyForecastCards.push(
      <DailyForecastCard
        key={i}
        maxTemp={maxTemps?.[i]}
        minTemp={minTemps?.[i]}
        time={times?.[i]}
        weatherCode={weatherCodes?.[i]}
      />,
    );
  }

  return (
    <section
      aria-busy={!isDataLoaded}
      className="col-start-1 mt-8 xl:mt-0 xl:self-end"
    >
      <h2 className="text-xl font-bold">Daily forecast</h2>

      <ul className="mt-4 grid grid-cols-3 gap-4 xl:grid-cols-7">
        {dailyForecastCards}
      </ul>
    </section>
  );
}

export default AppDailyForecast;
