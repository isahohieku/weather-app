import { useState, useEffect } from 'react';

import Loader from '../../atoms/Loader';
import MainWeatherInfo from '../../organisms/MainWeatherInfo';
import SearchBar from '../../molecules/SearchBar';
import ErrorView from '../../molecules/ErrorMessage';
import DetailedWeatherInfo from '../../organisms/DetailedWeatherInfo';
import type { WeatherResponse } from '../../types';
import { useSearchWeather, useGeolocation } from '../../hooks';
import styles from './styles.module.css';

const WeatherPage = () => {
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const { coords, isLocating, error: geoError, getLocation } = useGeolocation();
  const { isLoading, isFetching, data, error } = useSearchWeather(currentSearch, coords);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const onSearch = (city: string) => {
    setCurrentSearch(city);
  };

  const onLocate = () => {
    setCurrentSearch(null);
    getLocation();
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const convertTemp = (tempCelsius: number): number => {
    if (unit === 'F') {
      return Math.round((tempCelsius * 9) / 5 + 32);
    }
    return Math.round(tempCelsius);
  };

  return (
    <div className={styles.page}>
      {/* Unit Toggle */}
      <div className={styles.toggleWrapper}>
        <span className={`${styles.toggleLabel} ${unit === 'C' ? styles.activeLabel : ''}`}>
          °C
        </span>
        <button
          className={`${styles.toggleSwitch} ${unit === 'F' ? styles.toggleSwitchActive : ''}`}
          onClick={toggleUnit}
          aria-label="Toggle temperature unit"
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
        <span className={`${styles.toggleLabel} ${unit === 'F' ? styles.activeLabel : ''}`}>
          °F
        </span>
      </div>

      {/* Search bar */}
      <div className={styles.searchSection}>
        <SearchBar onSearch={onSearch} onLocate={onLocate} isLocating={isLocating} />
      </div>

      {/* Geolocation Error */}
      {geoError && (
        <div className={styles.geoError}>
          <span>{geoError}</span>
        </div>
      )}

      {/* Main Content */}
      <div className={styles.contentSection}>
        {!isLoading && !isFetching && !error && data && (
          <div className={styles.weatherCard}>
            <MainWeatherInfo
              weatherReport={data as WeatherResponse}
              convertTemp={convertTemp}
              unit={unit}
            />
            <DetailedWeatherInfo
              weatherReport={data as WeatherResponse}
              convertTemp={convertTemp}
              unit={unit}
            />
          </div>
        )}
        {!isLoading && !isFetching && error && <ErrorView search={currentSearch} />}
      </div>

      {(isLoading || isFetching) && (
        <div className={styles.loaderSection}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
