interface WeatherDetailCardProps {
  name: string;
  value: string;
}

function WeatherDetailCard({ name, value }: WeatherDetailCardProps) {
  return (
    <li className="flex h-[118px] flex-col justify-between rounded-xl border border-neutral-600 bg-neutral-800 pt-4 pb-3 pl-5">
      <p className="text-neutral-200">{name}</p>
      <p className="text-[32px] font-normal">{value}</p>
    </li>
  );
}

export default WeatherDetailCard;
