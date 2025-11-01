import WeatherDetailCard from "./components/WeatherDetailCard";
import DailyForecastCard from "./components/DailyForecastCard";
import HourlyForecastCard from "./components/HourlyForecastCard";

function App() {
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
    <>
      <header className="flex justify-between pt-4 xl:pt-12">
        <img
          src="/src/assets/logo.svg"
          alt="Weather Now logo"
          className="w-[138px] xl:w-auto"
        />

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-800 px-2.5 text-sm xl:h-11 xl:gap-2.5 xl:px-4 xl:text-base"
        >
          <img
            src="/src/assets/icon-units.svg"
            aria-hidden="true"
            className="h-3.5 xl:h-auto"
          />
          Units
          <img
            src="/src/assets/icon-dropdown.svg"
            aria-hidden="true"
            className="h-1.5 xl:h-auto"
          />
        </button>
      </header>

      <main className="grid-template flex flex-col pt-12 xl:grid xl:pt-[60px]">
        <h1 className="grid-area-slogan font-bricolage-grotesque text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="grid-area-search flex flex-col gap-3 pt-12 text-xl xl:flex-row xl:justify-center xl:gap-4 xl:pt-16"
        >
          <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6 xl:w-[526px]">
            <img src="/src/assets/icon-search.svg" aria-hidden="true" />

            <input
              type="text"
              placeholder="Search for a place..."
              aria-label="Search for a place"
              className="h-full w-full placeholder:text-neutral-200"
            />
          </label>

          <button type="submit" className="h-14 rounded-xl bg-blue-500 xl:px-6">
            Search
          </button>
        </form>

        <div className="grid-area-weather mt-8 flex h-[286px] w-[343px] flex-col items-center gap-2 self-center bg-[url(./assets/bg-today-small.svg)] bg-no-repeat pt-10">
          <h2 className="text-3xl font-bold">Berlin, Germany</h2>

          <p className="text-neutral-200">Tuesday, Aug 5, 2025</p>

          <div className="flex items-center gap-6">
            <img
              src="/src/assets/icon-sunny.webp"
              alt="Sunny icon"
              className="size-32"
            />

            <p className="text-8xl font-bold italic">20°</p>
          </div>
        </div>

        <ul className="grid-area-details grid grid-cols-2 gap-4 pt-5">
          <WeatherDetailCard name="Feels Like" value="18°" />
          <WeatherDetailCard name="Humidity" value="46%" />
          <WeatherDetailCard name="Wind" value="14 km/h" />
          <WeatherDetailCard name="Precipitation" value="0 mm" />
        </ul>

        <section className="grid-area-daily pt-8">
          <h2 className="text-xl font-bold">Daily forecast</h2>

          <ul className="grid grid-cols-3 gap-4 pt-4">
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
            <DailyForecastCard
              day="Mon"
              icon="fog"
              tempDay="24°"
              tempNight="15°"
            />
          </ul>
        </section>

        <section className="grid-area-hourly mt-8 mb-12 flex h-[685px] flex-col gap-4 rounded-2xl bg-neutral-800 px-4 py-5">
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
      </main>
    </>
  );
}

export default App;
