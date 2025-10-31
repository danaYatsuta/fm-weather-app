import logo from "./assets/logo.svg";
import iconUnits from "./assets/icon-units.svg";
import iconDropdown from "./assets/icon-dropdown.svg";

function App() {
  return (
    <>
      <header className="flex justify-between px-4 pt-4">
        <img src={logo} alt="Weather Now logo" className="w-[138px]" />

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md bg-neutral-800 px-2.5 text-sm font-medium"
        >
          <img src={iconUnits} aria-hidden="true" className="h-3.5" />
          Units
          <img src={iconDropdown} aria-hidden="true" className="h-1.5" />
        </button>
      </header>
    </>
  );
}

export default App;
