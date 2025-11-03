import HourlyForecastCard from "./HourlyForecastCard";

interface AppHourlyForecastProps {
  times: string[];
  weatherCodes: number[];
  temps: number[];
}

function AppHourlyForecast({
  times,
  weatherCodes,
  temps,
}: AppHourlyForecastProps) {
  const hourlyForecastCards = times.slice(0, 24).map((time, index) => {
    const date = new Date(time);
    const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
    });
    const hour = intlDateTimeFormat.format(date);

    return (
      <HourlyForecastCard
        hour={hour}
        weatherCode={weatherCodes[index]}
        temp={temps[index]}
        key={hour}
      />
    );
  });

  return (
    <section className="grid-area-hourly mt-8 flex h-[685px] flex-col gap-4 rounded-2xl bg-neutral-800 px-4 py-5 xl:mt-0 xl:ml-8 xl:h-[692px] xl:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hourly forecast</h2>

        <button
          type="button"
          className="flex h-9 items-center gap-2.5 rounded-md bg-neutral-600 px-4 text-base"
        >
          Tuesday
          <img src="/src/assets/icon-dropdown.svg" aria-hidden="true" />
        </button>
      </div>

      <ul className="flex flex-col gap-4 overflow-scroll">
        {hourlyForecastCards}
      </ul>
    </section>
  );
}

export default AppHourlyForecast;
