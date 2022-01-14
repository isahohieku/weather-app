interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IMainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeather[];
  base: string;
  main: IMainWeather;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
}

export interface WeatherErrorResponse {
  message: string;
  cod: string;
}
