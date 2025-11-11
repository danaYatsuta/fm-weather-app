import BaseCard from "./BaseCard";

interface CurrentWeatherDetailCardProps {
  name: string;
  value: string;
}

function CurrentWeatherDetailCard({
  name,
  value,
}: CurrentWeatherDetailCardProps) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <BaseCard tag="li">
      <div className="flex h-[118px] flex-col justify-between pt-4 pb-3 pl-5">
        <p className="text-neutral-200">{name}</p>
        <p className="text-[32px] font-normal">{value}</p>
      </div>
    </BaseCard>
  );
}

export default CurrentWeatherDetailCard;
