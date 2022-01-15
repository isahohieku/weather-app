import { useState, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Loader from './atoms/loader';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './molecules/search-bar';
import { getWeatherReport, getWeatherReportByCoordinates } from './services/weather';
import type { WeatherResponse } from './types/weather';
import { getRandomCoordinate } from './utils/functions';
import ErrorView from './molecules/error-message';
import DetailedWeatherInfo from './organisms/detailed-weather-info';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const [weatherReport, setWeatherReport] = useState<WeatherResponse | null>(null);

  const _isMounted = useRef(true);

  useEffect(() => {
    const getRandomWeather = async () => {
      const long = getRandomCoordinate(2);
      const lat = getRandomCoordinate(2);
      try {
        setLoading(true);
        setHasError(false);
        setWeatherReport(null);
        if (_isMounted.current) {
          const res = await getWeatherReportByCoordinates(long, lat);
          setWeatherReport(res);
        }
      } catch {
        setHasError(true);
      } finally {
        if (_isMounted.current) {
          setLoading(false);
        }
      }
    };

    getRandomWeather();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const onSearch = async (city: string) => {
    setCurrentSearch(city);
    try {
      setLoading(true);
      setWeatherReport(null);
      setHasError(false);
      const res: WeatherResponse = await getWeatherReport(city);
      setWeatherReport(res);
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      {/* Search bar */}
      <Row>
        <Col className="d-flex justify-content-center">
          <SearchBar onSearch={onSearch} />
        </Col>
      </Row>
      {/* Search bar */}
      <Row>
        <Col className="d-flex justify-content-center align-items-center mt-5">
          {!loading && !hasError && weatherReport && (
            <>
              <MainWeatherInfo weatherReport={weatherReport} />
              <DetailedWeatherInfo weatherReport={weatherReport} />
            </>
          )}
          {!loading && hasError && <ErrorView search={currentSearch} />}
        </Col>
      </Row>
      {loading && <Loader />}
    </Container>
  );
};

export default App;
