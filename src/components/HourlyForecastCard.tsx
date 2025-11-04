import { getIconFromWeatherCode } from "../util";

interface HourlyForecastCardProps {
  hour: string;
  weatherCode: number;
  temperature: number;
}

function HourlyForecastCard({
  hour,
  weatherCode,
  temperature,
}: HourlyForecastCardProps) {
  const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

  return (
    <li className="flex h-[60px] shrink-0 items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 pr-4 pl-2.5">
      <div className="flex items-center gap-2 text-xl">
        <img src={iconSrc} alt={iconAlt} className="size-10" />
        <p>{hour}</p>
      </div>

      <p className="text-base">{Math.round(temperature)}°</p>
    </li>
  );
}

export default HourlyForecastCard;
