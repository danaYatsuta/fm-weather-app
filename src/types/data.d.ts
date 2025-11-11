export interface GeocodingData {
  generationtime_ms: number;
  results?: GeocodingDataResult[];
}

export interface WeatherData {
  current: WeatherDataCurrent;
  current_units: WeatherDataCurrentUnits;
  daily: WeatherDataDaily;
  daily_units: WeatherDataDailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: WeatherDataHourly;
  hourly_units: WeatherDataHourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

interface GeocodingDataResult {
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

interface WeatherDataCurrent {
  apparent_temperature: number;
  interval: number;
  precipitation: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
}

interface WeatherDataCurrentUnits {
  apparent_temperature: string;
  interval: string;
  precipitation: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
}
interface WeatherDataDaily {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}

interface WeatherDataDailyUnits {
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weather_code: string;
}

interface WeatherDataHourly {
  temperature_2m: number[];
  time: string[];
  weather_code: number[];
}

interface WeatherDataHourlyUnits {
  temperature_2m: string;
  time: string;
  weather_code: string;
}
