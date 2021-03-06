import type { WeatherResponse } from '../../types/weather';
import { Conditions } from '../../types/weather';
import { getRandomCoordinate } from '../../utils/functions';

export const mockWeather: WeatherResponse = {
  coord: { lon: 7.4898, lat: 9.0574 },
  weather: [{ id: 804, main: Conditions.Clouds, description: 'overcast clouds', icon: '04d' }],
  base: 'stations',
  main: {
    temp: 298.76,
    feels_like: 298,
    temp_min: 298.76,
    temp_max: 298.76,
    pressure: 1014,
    humidity: 24,
    sea_level: 1014,
    grnd_level: 960,
  },
  visibility: 10000,
  wind: { speed: 1.33, deg: 64, gust: 1.79 },
  clouds: { all: 97 },
  dt: 1642057502,
  sys: { country: 'NG', sunrise: 1642052953, sunset: 1642094860 },
  timezone: 3600,
  id: 2352778,
  name: 'Abuja',
};

export const mockErrorNotFoundCity = {
  message: 'city not found',
  cod: '404',
};

export const mockCity = 'Abuja';
export const mockFalseCity = 'NeverExistingLand';

export const mockLongitude = getRandomCoordinate(2);
export const mockLatitude = getRandomCoordinate(2);
