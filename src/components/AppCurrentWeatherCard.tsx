import { getIconFromWeatherCode } from "../util";

interface AppCurrentWeatherCardProps {
  location: string;
  country: string;
  time: string;
  weatherCode: number;
  temp: number;
}

function AppCurrentWeatherCard({
  location,
  country,
  time,
  weatherCode,
  temp,
}: AppCurrentWeatherCardProps) {
  const date = new Date(time);
  const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedDate = intlDateTimeFormat.format(date);

  const [iconSrc, iconAlt] = getIconFromWeatherCode(weatherCode);

  return (
    <div className="grid-area-weather flex h-[286px] w-[343px] flex-col items-center gap-2 self-center bg-[url(./assets/bg-today-small.svg)] bg-no-repeat xl:w-full xl:flex-row xl:justify-between xl:self-start xl:bg-[url(./assets/bg-today-large.svg)] xl:px-6">
      <div className="flex flex-col items-center gap-1 pt-10 xl:items-start xl:pt-0">
        <h2 className="text-[28px] font-bold">
          {location}, {country}
        </h2>

        <p className="text-neutral-200">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-4">
        <img src={iconSrc} alt={iconAlt} className="size-32" />

        <p className="text-8xl font-extrabold italic">{Math.round(temp)}°</p>
      </div>
    </div>
  );
}

export default AppCurrentWeatherCard;
