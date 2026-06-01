import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherReportByCity, getWeatherReportByCoords } from '../../services/weather';
import type { WeatherResponse, WeatherErrorResponse } from '../../types/weather';
import type { GeolocationCoords } from '../useGeolocation';

const cacheTime = 10 * 60 * 1000; // 10 min

export const useSearchWeather = (
  search: string | null,
  coords: GeolocationCoords | null = null,
) => {
  // Query for city-based search
  const cityQuery = useQuery<WeatherResponse, WeatherErrorResponse>({
    queryKey: ['weatherReportByCity', search],
    queryFn: () => getWeatherReportByCity(search),
    enabled: false,
    gcTime: cacheTime,
    retry: 0,
  });

  // Query for coordinate-based search
  const coordsQuery = useQuery<WeatherResponse, WeatherErrorResponse>({
    queryKey: ['weatherReportByCoords', coords?.latitude, coords?.longitude],
    queryFn: () => getWeatherReportByCoords(coords?.latitude, coords?.longitude),
    enabled: !!coords,
    gcTime: cacheTime,
    retry: 0,
  });

  useEffect(() => {
    if (search) {
      cityQuery.refetch();
    }
  }, [search]);

  // Determine which query result to use: city search takes priority if active
  const activeQuery = search ? cityQuery : coordsQuery;

  return {
    isLoading: activeQuery.isLoading,
    isFetching: activeQuery.isFetching,
    data: activeQuery.data,
    error: activeQuery.error,
  };
};
