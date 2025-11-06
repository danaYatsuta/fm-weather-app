import { getIconFromWeatherCode } from "../util";

import BaseCard from "./BaseCard";

interface DailyForecastCardProps {
  time?: string;
  weatherCode?: number;
  maxTemp?: number;
  minTemp?: number;
}

function DailyForecastCard({
  time,
  weatherCode,
  maxTemp,
  minTemp,
}: DailyForecastCardProps) {
  let content = <></>;

  if (
    time !== undefined &&
    weatherCode !== undefined &&
    maxTemp !== undefined &&
    minTemp !== undefined
  ) {
    const date = new Date(time);
    const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    });
    const weekday = intlDateTimeFormat.format(date);

    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <p>{weekday}</p>

        <img src={iconSrc} alt={iconAlt} className="size-16" />

        <div className="flex justify-between self-stretch text-base">
          <p>{`${Math.round(maxTemp)}°`}</p>
          <p className="text-neutral-200">{`${Math.round(minTemp)}°`}</p>
        </div>
      </>
    );
  }

  return (
    <BaseCard tag="li">
      <div className="flex h-[165px] flex-col items-center justify-between px-2 py-3">
        {content}
      </div>
    </BaseCard>
  );
}

export default DailyForecastCard;
