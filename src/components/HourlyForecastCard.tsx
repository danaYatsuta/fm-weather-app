import { getIconFromWeatherCode } from "../util";

interface HourlyForecastCardProps {
  hour?: string;
  temperature?: number;
  weatherCode?: number;
}

function HourlyForecastCard({
  hour,
  temperature,
  weatherCode,
}: HourlyForecastCardProps) {
  let content: null | React.ReactElement = null;

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

          <img alt={iconAlt} className="size-10" src={iconSrc} />
        </div>

        <p className="text-base">{Math.round(temperature)}°</p>
      </>
    );
  }

  return (
    <div className="flex h-[60px] shrink-0 items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 pr-4 pl-2.5">
      {content}
    </div>
  );
}

export default HourlyForecastCard;
