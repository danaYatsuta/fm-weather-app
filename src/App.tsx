import logo from "./assets/logo.svg";
import iconUnits from "./assets/icon-units.svg";
import iconDropdown from "./assets/icon-dropdown.svg";
import iconSearch from "./assets/icon-search.svg";

function App() {
  return (
    <>
      <header className="flex justify-between pt-4">
        <img src={logo} alt="Weather Now logo" className="w-[138px]" />

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-800 px-2.5 text-sm"
        >
          <img src={iconUnits} aria-hidden="true" className="h-3.5" />
          Units
          <img src={iconDropdown} aria-hidden="true" className="h-1.5" />
        </button>
      </header>

      <main className="flex flex-col pt-12">
        <p className="font-bricolage-grotesque text-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-3 pt-12 text-xl"
        >
          <label className="flex h-14 items-center gap-4 rounded-lg bg-neutral-800 px-6">
            <img src={iconSearch} aria-hidden="true" />

            <input
              type="text"
              placeholder="Search for a place..."
              aria-label="Search for a place"
              className="h-full w-full placeholder:text-neutral-200"
            />
          </label>

          <button type="submit" className="h-14 rounded-lg bg-blue-500">
            Search
          </button>
        </form>
      </main>
    </>
  );
}

export default App;
