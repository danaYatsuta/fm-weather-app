import BaseCard from "./BaseCard";

interface CurrentWeatherDetailCardProps {
  name: string;
  value: string;
}

export default function CurrentWeatherDetailCard({
  name,
  value,
}: CurrentWeatherDetailCardProps) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <BaseCard tag="li">
      <div className="flex h-30 flex-col justify-between pt-4 pb-3 pl-5">
        <p className="text-neutral-200">{name}</p>
        <p className="text-[2rem] font-normal">{value}</p>
      </div>
    </BaseCard>
  );
}
