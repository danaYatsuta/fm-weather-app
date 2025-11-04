import { useRef, useState } from "react";
import HourlyForecastCard from "./HourlyForecastCard";
import { useDropdown } from "../util";
import BaseDropdown from "./BaseDropdown";
import BaseDropdownButton from "./BaseDropdownButton";

interface AppHourlyForecastProps {
  times: string[];
  weatherCodes: number[];
  temps: number[];
}

function AppHourlyForecast({
  times,
  weatherCodes,
  temps,
}: AppHourlyForecastProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  const [isDropdownShown, setIsDropdownShown] = useDropdown([
    dropdownRef,
    dropdownToggleRef,
  ]);
  const [weekday, setWeekday] = useState(0);

  const weekdayFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const dropdownButtons: React.ReactElement[] = [];

  /*
    Frontend Mentor design calls for weekdays to be shown in order starting from monday, regardless of current weekday.
    I've intentionally implemented order of weekdays starting with current weekday, since this seems more intuitive to me.
  */
  for (let i = 0; i < 7; i++) {
    const weekdayName = weekdayFormat.format(new Date(times[i * 24]));

    dropdownButtons.push(
      <BaseDropdownButton
        onButtonClick={() => {
          setWeekday(i);
          setIsDropdownShown(false);
        }}
        key={i}
      >
        {weekdayName}
      </BaseDropdownButton>,
    );
  }

  const hourFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  });

  const hourlyForecastCards: React.ReactElement[] = [];

  for (let i = weekday * 24; i < (weekday + 1) * 24; i++) {
    const hour = hourFormat.format(new Date(times[i]));
    hourlyForecastCards.push(
      <HourlyForecastCard
        hour={hour}
        weatherCode={weatherCodes[i]}
        temp={temps[i]}
        key={i}
      />,
    );
  }

  return (
    <section className="relative col-start-2 row-span-3 row-start-3 mt-8 flex h-[685px] flex-col gap-4 rounded-2xl bg-neutral-800 px-4 py-5 xl:mt-0 xl:ml-8 xl:h-[692px] xl:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hourly forecast</h2>

        <button
          type="button"
          className="flex h-9 items-center gap-2.5 rounded-md bg-neutral-600 px-4 text-base outline-offset-[3px] hover:bg-neutral-700 focus:outline-2"
          onClick={() => {
            setIsDropdownShown(!isDropdownShown);
          }}
          ref={dropdownToggleRef}
        >
          {weekdayFormat.format(new Date(times[weekday * 24]))}
          <img src="/icon-dropdown.svg" alt="" />
        </button>
      </div>

      {isDropdownShown && (
        <BaseDropdown dropdownType="weekdayDropdown" ref={dropdownRef}>
          {dropdownButtons}
        </BaseDropdown>
      )}

      <ul className="flex flex-col gap-4 overflow-scroll rounded-md outline-offset-[3px] focus:outline-2">
        {hourlyForecastCards}
      </ul>
    </section>
  );
}

export default AppHourlyForecast;
