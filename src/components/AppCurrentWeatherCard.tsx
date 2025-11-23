import { getIconFromWeatherCode } from "../util";

interface AppCurrentWeatherCardProps {
  locationCountry: string;
  locationName: string;
  temperature?: number;
  time?: string;
  weatherCode?: number;
}

function AppCurrentWeatherCard({
  locationCountry,
  locationName,
  temperature,
  time,
  weatherCode,
}: AppCurrentWeatherCardProps) {
  /* ------------------------------ Derived State ----------------------------- */

  const isDataLoaded =
    time !== undefined &&
    weatherCode !== undefined &&
    temperature !== undefined;

  /* --------------------------------- Markup --------------------------------- */

  let content = (
    <>
      <div className="loader" />
      <p>Loading...</p>
    </>
  );

  if (isDataLoaded) {
    const date = new Date(time);

    const weekdayShortFormat = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      weekday: "long",
      year: "numeric",
    });
    const weekdayShortDate = weekdayShortFormat.format(date);

    const weekdayLongFormat = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    });
    const weekdayLongDate = weekdayLongFormat.format(date);

    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <div className="flex flex-col items-center gap-1 self-center pt-10 xl:items-start xl:pt-0">
          <p className="text-[28px] font-bold">
            {locationName}, {locationCountry}
          </p>

          <p aria-hidden="true" className="text-neutral-200">
            {weekdayShortDate}
          </p>
          <p className="sr-only">{weekdayLongDate}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <img alt={iconAlt} className="size-32" src={iconSrc} />

          <p className="text-8xl font-extrabold italic">
            {Math.round(temperature)}°
          </p>
        </div>
      </>
    );
  }

  return (
    <article
      aria-label="Current weather"
      className={`${isDataLoaded ? "bg-[url(./assets/bg-today-small.svg)] bg-no-repeat xl:flex-row xl:justify-between xl:bg-[url(./assets/bg-today-large.svg)]" : "items-center justify-center bg-neutral-800"} flex h-[286px] w-[343px] flex-col gap-2 self-center rounded-2xl px-6 xl:w-full`}
    >
      {content}
    </article>
  );
}

export default AppCurrentWeatherCard;
