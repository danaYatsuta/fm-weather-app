import DailyForecastCard from "./DailyForecastCard";

function AppDailyForecast() {
  return (
    <section className="grid-area-daily mt-8 xl:mt-0 xl:self-end">
      <h2 className="text-xl font-bold">Daily forecast</h2>

      <ul className="mt-4 grid grid-cols-3 gap-4 xl:grid-cols-7">
        <DailyForecastCard
          day="Tue"
          icon="rain"
          tempDay="20°"
          tempNight="14°"
        />
        <DailyForecastCard
          day="Wed"
          icon="drizzle"
          tempDay="21°"
          tempNight="15°"
        />
        <DailyForecastCard
          day="Thu"
          icon="sunny"
          tempDay="24°"
          tempNight="14°"
        />
        <DailyForecastCard
          day="Fri"
          icon="partly-cloudy"
          tempDay="25°"
          tempNight="13°"
        />
        <DailyForecastCard
          day="Sat"
          icon="storm"
          tempDay="21°"
          tempNight="15°"
        />
        <DailyForecastCard
          day="Sun"
          icon="snow"
          tempDay="25°"
          tempNight="16°"
        />
        <DailyForecastCard day="Mon" icon="fog" tempDay="24°" tempNight="15°" />
      </ul>
    </section>
  );
}

export default AppDailyForecast;
