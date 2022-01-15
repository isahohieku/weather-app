import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import type { Icon } from 'react-feather';
import { Cloud, CloudRain, CloudSnow, MapPin, Sun } from 'react-feather';
import type { WeatherResponse } from '../../types/weather';
import styles from './styles.module.scss';

interface Props {
  weatherReport: WeatherResponse;
}

const Icons = {
  Clouds: Cloud,
  Rain: CloudRain,
  Clear: Sun,
  Snow: CloudSnow,
};

const MainWeatherInfo = ({ weatherReport }: Props) => {
  const Icon: Icon = Icons[weatherReport.weather[0].main];
  return (
    <Card className={styles.wrapper}>
      <h4>{format(new Date(), 'eeee')}</h4>
      <p className="mb-0">{format(new Date(), 'dd MMM yyyy')}</p>
      <p className="mb-0">
        <MapPin size={18} /> <span>{weatherReport.name || 'Unknown'}</span>,{' '}
        {weatherReport.sys.country || 'Unknown Country'}
      </p>
      <Icon size={80} className="mt-auto" />
      <h1 className={styles.temperature}>{Math.round(weatherReport.main.temp)}&deg;C</h1>
      <p className="mb-0">{weatherReport.weather[0].main}</p>
    </Card>
  );
};

export default MainWeatherInfo;
