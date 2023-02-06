import { Api } from '../../libs/api';
import type { WeatherResponse } from '../../types/weather';
import { getRandomCoordinate } from '../../utils/functions';

const long = getRandomCoordinate(2);
const lat = getRandomCoordinate(2);

export const WEATHER_SEARCH_BASE_URL_BY_CITY = (city: string): string => `?q=${city}`;
export const WEATHER_SEARCH_BASE_URL_BY_COORDINATES = `?lat=${lat}&lon=${long}`;

export const getWeatherReport = (city?: string | null) =>
  Api.get(
    city ? WEATHER_SEARCH_BASE_URL_BY_CITY(city) : WEATHER_SEARCH_BASE_URL_BY_COORDINATES,
  ) as unknown as WeatherResponse;
