import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getWeatherReport } from '../../services/weather';
import type { WeatherResponse, WeatherErrorResponse } from '../../types/weather';

const cacheTime = 10 * 60 * 1000; // 10 min

export const useSearchWeather = (search: string | null) => {
  const { isLoading, isFetching, data, error, refetch } = useQuery<
    WeatherResponse,
    WeatherErrorResponse
  >('weatherReportByCity', () => getWeatherReport(search), {
    enabled: false,
    cacheTime,
    retry: 0,
  });

  useEffect(() => {
    refetch();
  }, [search]);

  return { isLoading, isFetching, data, error };
};
