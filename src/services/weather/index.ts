import { Api } from '../../libs/api';
import type { WeatherResponse } from '../../types/weather';

const WEATHER_API_BASE = '?q=';
export const getWeatherReport = async (city: string) => {
  const res: WeatherResponse = (await Api.get(
    `${WEATHER_API_BASE}${city}`,
  )) as unknown as WeatherResponse;
  return res;
};
