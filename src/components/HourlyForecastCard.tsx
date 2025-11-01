interface HourlyForecastCardProps {
  time: string;
  icon:
    | "drizzle"
    | "fog"
    | "overcast"
    | "partly-cloudy"
    | "rain"
    | "snow"
    | "storm"
    | "sunny";
  temp: string;
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

function HourlyForecastCard({ time, icon, temp }: HourlyForecastCardProps) {
  const iconSrc = `/src/assets/icon-${icon}.webp`;
  const iconAlt = iconAlts[icon];

  return (
    <li className="flex h-[60px] shrink-0 items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 pr-4 pl-2.5">
      <div className="flex items-center gap-2 text-xl">
        <img src={iconSrc} alt={iconAlt} className="size-10" />
        <p>{time}</p>
      </div>

      <p className="text-base">{temp}</p>
    </li>
  );
}

export default HourlyForecastCard;
