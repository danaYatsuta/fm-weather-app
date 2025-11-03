import { useEffect, useState } from "react";

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
    iconSrc = "/icon-drizzle.webp";
    iconAlt = "Drizzle icon";
  } else if (weatherCodes.fog.includes(weatherCode)) {
    iconSrc = "/icon-fog.webp";
    iconAlt = "Fog icon";
  } else if (weatherCodes.partlyCloudy.includes(weatherCode)) {
    iconSrc = "/icon-partly-cloudy.webp";
    iconAlt = "Partly cloudy icon";
  } else if (weatherCodes.rain.includes(weatherCode)) {
    iconSrc = "/icon-rain.webp";
    iconAlt = "Rain icon";
  } else if (weatherCodes.snow.includes(weatherCode)) {
    iconSrc = "/icon-snow.webp";
    iconAlt = "Snow icon";
  } else if (weatherCodes.storm.includes(weatherCode)) {
    iconSrc = "/icon-storm.webp";
    iconAlt = "Storm icon";
  } else if (weatherCodes.sunny.includes(weatherCode)) {
    iconSrc = "/icon-sunny.webp";
    iconAlt = "Sunny icon";
  } else {
    // Using overcast icon as fallback
    iconSrc = "/icon-overcast.webp";
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
