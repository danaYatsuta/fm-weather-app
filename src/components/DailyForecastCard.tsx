interface DailyForecastCardProps {
  day: string;
  icon:
    | "drizzle"
    | "fog"
    | "overcast"
    | "partly-cloudy"
    | "rain"
    | "snow"
    | "storm"
    | "sunny";
  tempDay: string;
  tempNight: string;
}

const iconAlts = {
  drizzle: "Drizzle icon",
  fog: "Fog icon",
  overcast: "Overcast icon",
  "partly-cloudy": "Partly cloudy icon",
  rain: "Rain icon",
  snow: "Snow icon",
  storm: "Storm icon",
  sunny: "Sunny icon",
};

function DailyForecastCard({
  day,
  icon,
  tempDay,
  tempNight,
}: DailyForecastCardProps) {
  const iconSrc = `/src/assets/icon-${icon}.webp`;
  const iconAlt = iconAlts[icon];

  return (
    <div className="flex h-[165px] flex-col items-center justify-between rounded-xl border border-neutral-600 bg-neutral-800 px-2 py-3">
      <p>{day}</p>
      <img src={iconSrc} alt={iconAlt} className="size-16" />
      <div className="flex justify-between self-stretch text-base">
        <p>{tempDay}</p>
        <p className="text-neutral-200">{tempNight}</p>
      </div>
    </div>
  );
}

export default DailyForecastCard;
