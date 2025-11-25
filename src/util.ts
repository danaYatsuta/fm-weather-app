import type { BasicTarget } from "ahooks/lib/utils/domTarget";

import { useClickAway, useKeyPress } from "ahooks";

import iconDrizzle from "./assets/icon-drizzle.webp";
import iconError from "./assets/icon-error.svg";
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
  let iconAlt, iconSrc;

  if (weatherCodes.drizzle.includes(weatherCode)) {
    iconSrc = iconDrizzle;
    iconAlt = "Drizzle";
  } else if (weatherCodes.fog.includes(weatherCode)) {
    iconSrc = iconFog;
    iconAlt = "Fog";
  } else if (weatherCodes.overcast.includes(weatherCode)) {
    iconSrc = iconOvercast;
    iconAlt = "Overcast";
  } else if (weatherCodes.partlyCloudy.includes(weatherCode)) {
    iconSrc = iconPartlyCloudy;
    iconAlt = "Partly cloudy";
  } else if (weatherCodes.rain.includes(weatherCode)) {
    iconSrc = iconRain;
    iconAlt = "Rain";
  } else if (weatherCodes.snow.includes(weatherCode)) {
    iconSrc = iconSnow;
    iconAlt = "Snow";
  } else if (weatherCodes.storm.includes(weatherCode)) {
    iconSrc = iconStorm;
    iconAlt = "Storm";
  } else if (weatherCodes.sunny.includes(weatherCode)) {
    iconSrc = iconSunny;
    iconAlt = "Sunny";
  } else {
    iconSrc = iconError;
    iconAlt = "Unknown weather code";
  }

  return [iconSrc, iconAlt];
}

function useClickAwayAndEsc(
  callback: () => void,
  target: BasicTarget | BasicTarget[],
) {
  useClickAway(callback, target);
  useKeyPress("esc", callback);
}

export { getIconFromWeatherCode, useClickAwayAndEsc };
