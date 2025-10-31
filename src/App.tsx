import WeatherDetailCard from "./components/WeatherDetailCard";

function App() {
  return (
    <>
      <header className="flex justify-between pt-4">
        <img
          src="/src/assets/logo.svg"
          alt="Weather Now logo"
          className="w-[138px]"
        />

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-800 px-2.5 text-sm"
        >
          <img
            src="/src/assets/icon-units.svg"
            aria-hidden="true"
            className="h-3.5"
          />
          Units
          <img
            src="/src/assets/icon-dropdown.svg"
            aria-hidden="true"
            className="h-1.5"
          />
        </button>
      </header>

      <main className="flex flex-col pt-12">
        <h1 className="font-bricolage-grotesque text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-3 pt-12 text-xl"
        >
          <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6">
            <img src="/src/assets/icon-search.svg" aria-hidden="true" />

            <input
              type="text"
              placeholder="Search for a place..."
              aria-label="Search for a place"
              className="h-full w-full placeholder:text-neutral-200"
            />
          </label>

          <button type="submit" className="h-14 rounded-xl bg-blue-500">
            Search
          </button>
        </form>

        <section className="pt-8">
          <div className="flex h-[286px] flex-col items-center gap-2 bg-[url(./assets/bg-today-small.svg)] pt-10">
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

          <div className="grid grid-cols-2 grid-rows-2 gap-4 pt-5">
            <WeatherDetailCard name="Feels Like" value="18°" />
            <WeatherDetailCard name="Humidity" value="46%" />
            <WeatherDetailCard name="Wind" value="14 km/h" />
            <WeatherDetailCard name="Precipitation" value="0 mm" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
