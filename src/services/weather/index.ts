import { Api } from '../../libs/api';
import type { WeatherResponse } from '../../types/weather';

export const WEATHER_SEARCH_BASE_URL_BY_CITY = (city: string): string => `?q=${city}`;
export const WEATHER_SEARCH_BASE_URL_BY_COORDINATES = (long: number, lat: number): string =>
  `?lat=${lat}&lon=${long}`;

export const getWeatherReport = async (city: string) => {
  const res: WeatherResponse = (await Api.get(
    WEATHER_SEARCH_BASE_URL_BY_CITY(city),
  )) as unknown as WeatherResponse;
  return res;
};

export const getWeatherReportByCoordinates = async (long: number, lat: number) => {
  const res: WeatherResponse = (await Api.get(
    WEATHER_SEARCH_BASE_URL_BY_COORDINATES(long, lat),
  )) as unknown as WeatherResponse;
  return res;
};
