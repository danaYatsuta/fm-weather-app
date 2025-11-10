import { getIconFromWeatherCode } from "../util";

interface AppCurrentWeatherCardProps {
  locationName: string;
  locationCountry: string;
  time?: string;
  weatherCode?: number;
  temperature?: number;
}

function AppCurrentWeatherCard({
  locationName,
  locationCountry,
  time,
  weatherCode,
  temperature,
}: AppCurrentWeatherCardProps) {
  let content = (
    <>
      <div className="loader" />
      <p>Loading...</p>
    </>
  );

  const isDataLoaded =
    time !== undefined &&
    weatherCode !== undefined &&
    temperature !== undefined;

  if (isDataLoaded) {
    const date = new Date(time);
    const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedDate = intlDateTimeFormat.format(date);

    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <div className="flex flex-col items-center gap-1 self-center pt-10 xl:items-start xl:pt-0">
          <p className="text-[28px] font-bold">
            {locationName}, {locationCountry}
          </p>

          <p className="text-neutral-200">{formattedDate}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <img src={iconSrc} alt={iconAlt} className="size-32" />

          <p className="text-8xl font-extrabold italic">
            {Math.round(temperature)}°
          </p>
        </div>
      </>
    );
  }

  return (
    <section
      className={`${isDataLoaded ? "bg-[url(./assets/bg-today-small.svg)] bg-no-repeat xl:flex-row xl:justify-between xl:bg-[url(./assets/bg-today-large.svg)]" : "items-center justify-center bg-neutral-800"} flex h-[286px] w-[343px] flex-col gap-2 self-center rounded-2xl px-6 xl:w-full`}
      aria-busy={!isDataLoaded}
    >
      <h2 className="sr-only">Current weather</h2>

      {content}
    </section>
  );
}

export default AppCurrentWeatherCard;
