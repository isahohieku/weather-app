import { format } from 'date-fns';
import type { Icon } from 'react-feather';
import { Cloud, CloudRain, CloudSnow, MapPin, Sun } from 'react-feather';
import type { WeatherResponse } from '../../types/weather';
import styles from './styles.module.css';

interface Props {
  weatherReport: WeatherResponse;
  convertTemp: (temp: number) => number;
  unit: 'C' | 'F';
}

const Icons: Record<string, Icon> = {
  Clouds: Cloud,
  Rain: CloudRain,
  Clear: Sun,
  Snow: CloudSnow,
};

const MainWeatherInfo = ({ weatherReport, convertTemp, unit }: Props) => {
  const WeatherIcon: Icon = Icons[weatherReport.weather[0].main] || Sun;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4 className={styles.day}>{format(new Date(), 'eeee')}</h4>
        <p className={styles.date}>{format(new Date(), 'dd MMM yyyy')}</p>
        <p className={styles.location}>
          <MapPin size={16} /> {weatherReport.name || 'Unknown'}, {weatherReport.sys.country || '??'}
        </p>
      </div>
      <div className={styles.body}>
        <WeatherIcon size={70} strokeWidth={1.5} />
        <h1 className={styles.temperature}>
          {convertTemp(weatherReport.main.temp)}<span className={styles.degree}>°{unit}</span>
        </h1>
        <p className={styles.condition}>{weatherReport.weather[0].main}</p>
      </div>
    </div>
  );
};

export default MainWeatherInfo;
