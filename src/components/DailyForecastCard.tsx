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
  let content: React.ReactElement | null = null;

  if (
    time !== undefined &&
    weatherCode !== undefined &&
    maxTemp !== undefined &&
    minTemp !== undefined
  ) {
    const date = new Date(time);

    const weekdayShortFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    });
    const weekdayShort = weekdayShortFormat.format(date);

    const weekdayLongFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    });
    const weekdayLong = weekdayLongFormat.format(date);

    const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

    content = (
      <>
        <p aria-hidden="true">{weekdayShort}</p>
        <p className="sr-only">{weekdayLong}</p>

        <img src={iconSrc} alt={iconAlt} className="size-16" />

        <div className="flex justify-between self-stretch text-base">
          <p>
            <span className="sr-only">Maximal temperature: </span>{" "}
            {`${Math.round(maxTemp).toString()}°`}
          </p>

          <p className="text-neutral-200">
            <span className="sr-only">Minimal temperature: </span>
            {`${Math.round(minTemp).toString()}°`}
          </p>
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
