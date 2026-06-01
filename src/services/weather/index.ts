import { Api } from '../../libs/api';
import type { WeatherResponse } from '../../types/weather';

export const WEATHER_SEARCH_BASE_URL_BY_CITY = (city: string): string => `?q=${city}`;
export const WEATHER_SEARCH_BASE_URL_BY_COORDINATES = (lat: number, lon: number): string =>
  `?lat=${lat}&lon=${lon}`;

export const getWeatherReportByCity = (city: string | null): Promise<WeatherResponse> => {
  if (!city) {
    return Promise.reject(new Error('City is required'));
  }
  return Api.get(WEATHER_SEARCH_BASE_URL_BY_CITY(city)) as unknown as Promise<WeatherResponse>;
};

export const getWeatherReportByCoords = (
  lat: number | undefined,
  lon: number | undefined,
): Promise<WeatherResponse> => {
  if (lat === undefined || lon === undefined) {
    return Promise.reject(new Error('Coordinates are required'));
  }
  return Api.get(
    WEATHER_SEARCH_BASE_URL_BY_COORDINATES(lat, lon),
  ) as unknown as Promise<WeatherResponse>;
};
