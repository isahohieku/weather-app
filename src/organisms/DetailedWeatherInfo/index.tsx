import { Card } from 'react-bootstrap';
import type { WeatherResponse } from '../../types/weather';
import { fixToDecimalPlace, roundNumber } from '../../utils/functions';
import styles from './styles.module.scss';

interface Props {
  weatherReport: WeatherResponse;
}
const DetailedWeatherInfo = ({ weatherReport }: Props) => (
  <Card className={styles.wrapper}>
    <ul className={styles.meta}>
      <li>
        <p>Coordinates</p>
        <p>
          {fixToDecimalPlace(weatherReport.coord.lon)}&deg;,{' '}
          {fixToDecimalPlace(weatherReport.coord.lat)}&deg;
        </p>
      </li>
      <li>
        <p>Humidity</p>
        <p>{fixToDecimalPlace(weatherReport.main.humidity)}&#37;</p>
      </li>
      <li>
        <p>Wind</p>
        <p>{roundNumber(weatherReport.wind.speed)} km/h</p>
      </li>
    </ul>
  </Card>
);

export default DetailedWeatherInfo;
