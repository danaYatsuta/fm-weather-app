function AppWeatherCard() {
  return (
    <div className="grid-area-weather flex h-[286px] w-[343px] flex-col items-center gap-2 self-center bg-[url(./assets/bg-today-small.svg)] bg-no-repeat xl:w-full xl:flex-row xl:justify-between xl:self-start xl:bg-[url(./assets/bg-today-large.svg)] xl:px-6">
      <div className="flex flex-col items-center gap-1 pt-10 xl:items-start xl:pt-0">
        <h2 className="text-[28px] font-bold">Berlin, Germany</h2>

        <p className="text-neutral-200">Tuesday, Aug 5, 2025</p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src="/src/assets/icon-sunny.webp"
          alt="Sunny icon"
          className="size-32"
        />

        <p className="text-8xl font-extrabold italic">20°</p>
      </div>
    </div>
  );
}

export default AppWeatherCard;
