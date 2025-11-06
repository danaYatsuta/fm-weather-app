import { useRef, useState } from "react";
import { useDropdown } from "../util";

import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";
import HourlyForecastCard from "./HourlyForecastCard";

import iconDropdown from "../assets/icon-dropdown.svg";

interface AppHourlyForecastProps {
  times?: string[];
  weatherCodes?: number[];
  temperatures?: number[];
}

function AppHourlyForecast({
  times,
  weatherCodes,
  temperatures,
}: AppHourlyForecastProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  const [isDropdownShown, setIsDropdownShown] = useDropdown([
    dropdownRef,
    dropdownToggleRef,
  ]);
  const [weekday, setWeekday] = useState(0);

  // if (!(times && weatherCodes && temperatures)) {
  //   return <div></div>;
  // }

  const weekdayFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  });

  const dropdownButtons: React.ReactElement[] = [];

  /*
    Frontend Mentor design calls for weekdays to be shown in order starting from monday, regardless of current weekday.
    I've intentionally implemented order of weekdays starting with current weekday, since this seems more intuitive to me.
  */

  let dropdownToggleText = "—";

  if (times) {
    for (let i = 0; i < 7; i++) {
      const weekdayName = weekdayFormat.format(new Date(times[i * 24]));

      dropdownButtons.push(
        <DropdownButton
          onButtonClick={() => {
            setWeekday(i);
            setIsDropdownShown(false);
          }}
          key={i}
        >
          {weekdayName}
        </DropdownButton>,
      );
    }

    dropdownToggleText = weekdayFormat.format(new Date(times[weekday * 24]));
  }

  const hourFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  });

  const hourlyForecastCards: React.ReactElement[] = [];

  for (let i = weekday * 24; i < (weekday + 1) * 24; i++) {
    const hour = times && hourFormat.format(new Date(times[i]));
    hourlyForecastCards.push(
      <HourlyForecastCard
        hour={hour}
        weatherCode={weatherCodes?.[i]}
        temperature={temperatures?.[i]}
        key={i}
      />,
    );
  }

  return (
    <section
      className="relative col-start-2 row-span-3 row-start-3 mt-8 flex h-[685px] flex-col gap-4 rounded-2xl bg-neutral-800 px-4 py-5 xl:mt-0 xl:ml-8 xl:h-[692px] xl:p-6"
      aria-hidden={!times}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hourly forecast</h2>

        <button
          type="button"
          className="flex h-9 items-center gap-2.5 rounded-md bg-neutral-600 px-4 text-base hover:bg-neutral-700"
          onClick={() => {
            if (times) setIsDropdownShown(!isDropdownShown);
          }}
          ref={dropdownToggleRef}
        >
          {dropdownToggleText}
          <img src={iconDropdown} alt="" />
        </button>
      </div>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[70px] right-6 min-w-[214px]`}
        ref={dropdownRef}
      >
        <BaseCard>
          <div className="flex flex-col gap-0.5 p-2">{dropdownButtons}</div>
        </BaseCard>
      </div>

      <ul className="flex flex-col gap-4 overflow-scroll rounded-md">
        {hourlyForecastCards}
      </ul>
    </section>
  );
}

export default AppHourlyForecast;
