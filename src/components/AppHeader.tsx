function AppHeader() {
  return (
    <header className="mt-4 flex justify-between xl:mt-12">
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
  );
}

export default AppHeader;
