import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import { MapPin } from 'react-feather';
import type { WeatherResponse } from '../../types/weather';
import styles from './styles.module.scss';

interface Props {
  weatherReport: WeatherResponse;
}

const MainWeatherInfo = ({ weatherReport }: Props) => {
  return (
    <Card className={styles.wrapper}>
      <h4>{format(new Date(), 'eeee')}</h4>
      <p>{format(new Date(), 'dd MMM yyyy')}</p>
      <p>
        <MapPin /> <span>{weatherReport.name || 'Unknown'}</span>,{' '}
        {weatherReport.sys.country || 'Unknown Country'}
      </p>
    </Card>
  );
};

export default MainWeatherInfo;
