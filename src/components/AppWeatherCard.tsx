const weatherCodes = {
  drizzle: [51, 53, 55, 56, 57],
  fog: [45, 48],
  overcast: [3],
  partlyCloudy: [2],
  rain: [61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  storm: [95, 96, 99],
  sunny: [0, 1],
};

interface AppWeatherCardProps {
  location: string;
  country: string;
  time: string;
  weatherCode: number;
  temp: number;
}

function AppWeatherCard({
  location,
  country,
  time,
  weatherCode,
  temp,
}: AppWeatherCardProps) {
  const date = new Date(time);
  const intlDateTimeFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedDate = intlDateTimeFormat.format(date);

  let iconSrc, iconAlt;

  if (weatherCodes.drizzle.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-drizzle.webp";
    iconAlt = "Drizzle icon";
  } else if (weatherCodes.fog.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-fog.webp";
    iconAlt = "Fog icon";
  } else if (weatherCodes.partlyCloudy.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-partly-cloudy.webp";
    iconAlt = "Partly cloudy icon";
  } else if (weatherCodes.rain.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-rain.webp";
    iconAlt = "Rain icon";
  } else if (weatherCodes.snow.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-snow.webp";
    iconAlt = "Snow icon";
  } else if (weatherCodes.storm.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-storm.webp";
    iconAlt = "Storm icon";
  } else if (weatherCodes.sunny.includes(weatherCode)) {
    iconSrc = "/src/assets/icon-sunny.webp";
    iconAlt = "Sunny icon";
  } else {
    iconSrc = "/src/assets/icon-overcast.webp";
    iconAlt = "Overcast icon";
  }

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

export default AppWeatherCard;
