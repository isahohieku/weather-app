import type { Icon } from 'react-feather';
import { Cloud, CloudDrizzle, CloudSnow, Sun } from 'react-feather';
import type { WeatherResponse } from '../../types/weather';
import { fixToDecimalPlace, roundNumber } from '../../utils/functions';
import styles from './styles.module.css';

interface Props {
  weatherReport: WeatherResponse;
  convertTemp: (temp: number) => number;
  unit: 'C' | 'F';
}

const Icons: Record<string, Icon> = {
  Clouds: Cloud,
  Rain: CloudDrizzle,
  Clear: Sun,
  Snow: CloudSnow,
};

// Generate mock forecast data based on current weather
const generateForecast = (
  weatherReport: WeatherResponse,
  convertTemp: (temp: number) => number,
) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const conditions = ['Clear', 'Clouds', 'Rain', 'Clear'];
  const today = new Date();

  return Array.from({ length: 4 }, (_, i) => {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    const dayName = days[forecastDate.getDay()];
    const condition = i === 0 ? weatherReport.weather[0].main : conditions[i % conditions.length];
    const temp = convertTemp(weatherReport.main.temp + (Math.random() * 4 - 2));

    return { day: dayName, temp, condition, icon: Icons[condition] || Sun };
  });
};

const DetailedWeatherInfo = ({ weatherReport, convertTemp, unit }: Props) => {
  const forecast = generateForecast(weatherReport, convertTemp);
  const precipitation = weatherReport.clouds?.all ?? 0;

  return (
    <div className={styles.wrapper}>
      {/* Weather Stats */}
      <div className={styles.stats}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Precipitation</span>
          <span className={styles.statValue}>{precipitation} %</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Humidity</span>
          <span className={styles.statValue}>
            {fixToDecimalPlace(weatherReport.main.humidity, 0)} %
          </span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Wind</span>
          <span className={styles.statValue}>{roundNumber(weatherReport.wind.speed)} km/h</span>
        </div>
      </div>

      {/* Forecast Row */}
      <div className={styles.forecastRow}>
        {forecast.map((day, index) => {
          const ForecastIcon = day.icon;
          return (
            <div
              key={day.day + index}
              className={`${styles.forecastItem} ${index === 0 ? styles.forecastItemActive : ''}`}
            >
              <ForecastIcon size={24} strokeWidth={1.5} />
              <span className={styles.forecastDay}>{day.day}</span>
              <span className={styles.forecastTemp}>
                {day.temp}°{unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedWeatherInfo;
