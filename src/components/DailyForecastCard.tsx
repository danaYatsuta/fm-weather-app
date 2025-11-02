import { getIconFromWeatherCode } from "../util";

interface DailyForecastCardProps {
  time: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
}

function DailyForecastCard({
  time,
  weatherCode,
  maxTemp,
  minTemp,
}: DailyForecastCardProps) {
  const date = new Date(time);
  const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  });
  const weekday = intlDateTimeFormat.format(date);

  const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

  return (
    <li className="flex h-[165px] flex-col items-center justify-between rounded-xl border border-neutral-600 bg-neutral-800 px-2 py-3">
      <p>{weekday}</p>
      <img src={iconSrc} alt={iconAlt} className="size-16" />
      <div className="flex justify-between self-stretch text-base">
        <p>{`${Math.round(maxTemp)}°`}</p>
        <p className="text-neutral-200">{`${Math.round(minTemp)}°`}</p>
      </div>
    </li>
  );
}

export default DailyForecastCard;
