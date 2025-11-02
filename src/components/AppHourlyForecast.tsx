import HourlyForecastCard from "./HourlyForecastCard";

function AppHourlyForecast() {
  const hourlyForecastEntries = [...Array(24).keys()].map((x) => {
    const time = (x % 12) + 1;
    let period;

    if (x < 11) period = "AM";
    else if (x === 11) period = "noon";
    else if (x < 23) period = "PM";
    else period = "midnight";

    return (
      <HourlyForecastCard
        time={`${time} ${period}`}
        icon="sunny"
        temp="20°"
        key={x}
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
        {hourlyForecastEntries}
      </ul>
    </section>
  );
}

export default AppHourlyForecast;
