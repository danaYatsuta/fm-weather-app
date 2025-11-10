import { getIconFromWeatherCode } from "../util";

interface HourlyForecastCardProps {
  hour?: string;
  weatherCode?: number;
  temperature?: number;
}

function HourlyForecastCard({
  hour,
  weatherCode,
  temperature,
}: HourlyForecastCardProps) {
  let content: React.ReactElement | null = null;

  if (
    hour !== undefined &&
    weatherCode !== undefined &&
    temperature !== undefined
  ) {
    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <div className="flex flex-row-reverse items-center gap-2 text-xl">
          <p>{hour}</p>

          <img src={iconSrc} alt={iconAlt} className="size-10" />
        </div>

        <p className="text-base">{Math.round(temperature)}°</p>
      </>
    );
  }

  return (
    <li className="flex h-[60px] shrink-0 items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 pr-4 pl-2.5">
      {content}
    </li>
  );
}

export default HourlyForecastCard;
