import { getIconFromWeatherCode } from "../util";

interface HourlyForecastCardProps {
  hour?: string;
  temperature?: number;
  weatherCode?: number;
}

export default function HourlyForecastCard({
  hour,
  temperature,
  weatherCode,
}: HourlyForecastCardProps) {
  /* ------------------------------ Derived State ----------------------------- */

  const isDataLoaded =
    hour !== undefined &&
    weatherCode !== undefined &&
    temperature !== undefined;

  /* --------------------------------- Markup --------------------------------- */

  let content: null | React.ReactElement = null;

  if (isDataLoaded) {
    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <div className="flex flex-row-reverse items-center gap-2 text-xl">
          <p>{hour}</p>

          <img alt={iconAlt} className="size-10" src={iconSrc} />
        </div>

        <p className="text-base">{Math.round(temperature)}°</p>
      </>
    );
  }

  return (
    <li className="flex h-15 shrink-0 items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 pr-4 pl-2.5">
      {content}
    </li>
  );
}
