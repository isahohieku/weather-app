import { Api } from '../../libs/api';
import type { WeatherResponse } from '../../types/weather';

export const WEATHER_SEARCH_BASE_URL_BY_CITY = (city: string): string => `?q=${city}`;
export const WEATHER_SEARCH_BASE_URL_BY_COORDINATES = (lat: number, lon: number): string =>
  `?lat=${lat}&lon=${lon}`;

export const getWeatherReportByCity = (city: string) =>
  Api.get(WEATHER_SEARCH_BASE_URL_BY_CITY(city)) as unknown as WeatherResponse;

export const getWeatherReportByCoords = (lat: number, lon: number) =>
  Api.get(WEATHER_SEARCH_BASE_URL_BY_COORDINATES(lat, lon)) as unknown as WeatherResponse;
