import { useClickAway } from "ahooks";
import { useRef, useState } from "react";

import iconDropdown from "../assets/icon-dropdown.svg";
import BaseCard from "./BaseCard";
import DropdownButton from "./DropdownButton";
import HourlyForecastCard from "./HourlyForecastCard";

interface AppHourlyForecastProps {
  temperatures?: number[];
  times?: string[];
  weatherCodes?: number[];
}

function AppHourlyForecast({
  temperatures,
  times,
  weatherCodes,
}: AppHourlyForecastProps) {
  /* ---------------------------------- State --------------------------------- */

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const [weekday, setWeekday] = useState(0);

  /* ------------------------------ Derived State ----------------------------- */

  const isDataLoaded =
    times !== undefined &&
    weatherCodes !== undefined &&
    temperatures !== undefined;

  /* ---------------------------------- Hooks --------------------------------- */

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setIsDropdownShown(false);
  }, [dropdownRef, dropdownToggleRef]);

  /* --------------------------------- Markup --------------------------------- */

  const dropdownButtons: React.ReactElement[] = [];
  let dropdownToggleText = "—";

  if (isDataLoaded) {
    const weekdayFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    });

    /*
      Frontend Mentor design calls for weekdays to be shown in order starting from monday, regardless of current weekday.
      I've intentionally implemented order of weekdays starting with current weekday, since this seems more intuitive to me.
    */

    for (let i = 0; i < 7; i++) {
      const weekdayName = weekdayFormat.format(new Date(times[i * 24]));

      dropdownButtons.push(
        <li key={i} role="option">
          <DropdownButton
            fullWidth={true}
            onButtonClick={() => {
              setWeekday(i);
              setIsDropdownShown(false);
            }}
          >
            {weekdayName}
          </DropdownButton>
        </li>,
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
        key={i}
        temperature={temperatures?.[i]}
        weatherCode={weatherCodes?.[i]}
      />,
    );
  }

  return (
    <article
      aria-labelledby="hourly-forecast-heading"
      className="relative col-start-2 row-span-3 row-start-1 mt-8 flex h-[685px] flex-col gap-4 rounded-2xl bg-neutral-800 px-4 py-5 xl:mt-0 xl:ml-8 xl:h-[692px] xl:p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" id="hourly-forecast-heading">
          Hourly forecast
        </h2>

        <button
          aria-label={`Set weekday; current: ${dropdownToggleText}`}
          className="flex h-9 items-center gap-2.5 rounded-md bg-neutral-600 px-4 text-base hover:bg-neutral-700"
          onClick={() => {
            if (isDataLoaded) setIsDropdownShown(!isDropdownShown);
          }}
          ref={dropdownToggleRef}
          type="button"
        >
          {dropdownToggleText}
          <img alt="" src={iconDropdown} />
        </button>
      </div>

      <div
        className={`${isDropdownShown ? "" : "hidden"} absolute top-[70px] right-6 min-w-[214px]`}
        ref={dropdownRef}
      >
        <BaseCard>
          <ul
            aria-label="Weekdays"
            className="flex flex-col gap-0.5 p-2"
            role="listbox"
          >
            {dropdownButtons}
          </ul>
        </BaseCard>
      </div>

      <ul className="flex flex-col gap-4 overflow-auto rounded-md">
        {hourlyForecastCards}
      </ul>
    </article>
  );
}

export default AppHourlyForecast;
