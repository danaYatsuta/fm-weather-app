import { useEffect, useState } from "react";

import iconDrizzle from "./assets/icon-drizzle.webp";
import iconFog from "./assets/icon-fog.webp";
import iconOvercast from "./assets/icon-overcast.webp";
import iconPartlyCloudy from "./assets/icon-partly-cloudy.webp";
import iconRain from "./assets/icon-rain.webp";
import iconSnow from "./assets/icon-snow.webp";
import iconStorm from "./assets/icon-storm.webp";
import iconSunny from "./assets/icon-sunny.webp";

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

function getIconFromWeatherCode(weatherCode: number) {
  let iconSrc, iconAlt;

  if (weatherCodes.drizzle.includes(weatherCode)) {
    iconSrc = iconDrizzle;
    iconAlt = "Drizzle icon";
  } else if (weatherCodes.fog.includes(weatherCode)) {
    iconSrc = iconFog;
    iconAlt = "Fog icon";
  } else if (weatherCodes.partlyCloudy.includes(weatherCode)) {
    iconSrc = iconPartlyCloudy;
    iconAlt = "Partly cloudy icon";
  } else if (weatherCodes.rain.includes(weatherCode)) {
    iconSrc = iconRain;
    iconAlt = "Rain icon";
  } else if (weatherCodes.snow.includes(weatherCode)) {
    iconSrc = iconSnow;
    iconAlt = "Snow icon";
  } else if (weatherCodes.storm.includes(weatherCode)) {
    iconSrc = iconStorm;
    iconAlt = "Storm icon";
  } else if (weatherCodes.sunny.includes(weatherCode)) {
    iconSrc = iconSunny;
    iconAlt = "Sunny icon";
  } else {
    // Using overcast icon as fallback
    iconSrc = iconOvercast;
    iconAlt = "Overcast icon";
  }

  return [iconSrc, iconAlt];
}

/**
 * Returns boolean state which is set to false if any place on page except passed refs is clicked.
 * @param refs - Refs of elements that, when clicked, should not close the dropdown (usually the dropdown itself and the toggle button)
 */
function useDropdown(refs: React.RefObject<HTMLElement | null>[]) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: PointerEvent) {
      if (!(e.target instanceof Node)) return;

      for (const ref of refs) {
        if (ref.current === null || ref.current.contains(e.target)) return;
      }

      setIsDropdownShown(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs]);

  return [isDropdownShown, setIsDropdownShown] as const;
}

export { getIconFromWeatherCode, useDropdown };
