export interface GeocodingData {
  generationtime_ms: number;
  results?: Result[];
}

export interface LocationInfo {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
}
export type PrecipitationUnit = "inch" | "mm";
export type TemperatureUnit = "celsius" | "fahrenheit";
export interface UnitInfo {
  precipitationUnit: PrecipitationUnit;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
}

export type UnitSystem = "imperial" | "metric";

export interface WeatherData {
  current: Current;
  current_units: CurrentUnits;
  daily: Daily;
  daily_units: DailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export type WindSpeedUnit = "kmh" | "mph";

interface Current {
  apparent_temperature: number;
  interval: number;
  precipitation: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
}

interface CurrentUnits {
  apparent_temperature: string;
  interval: string;
  precipitation: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
}

interface Daily {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}

interface DailyUnits {
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weather_code: string;
}

interface Hourly {
  temperature_2m: number[];
  time: string[];
  weather_code: number[];
}

interface HourlyUnits {
  temperature_2m: string;
  time: string;
  weather_code: string;
}

interface Result {
  admin1?: string;
  admin1_id?: number;
  admin2?: string;
  admin2_id?: number;
  admin3?: string;
  admin3_id?: number;
  admin4?: string;
  admin4_id?: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  postcodes: string[];
  timezone: string;
}
