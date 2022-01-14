import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UnitSelector from './molecules/unit-selector';
import DetailedWeatherInfo from './organisms/detailed-weather-info';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './organisms/search-bar';
import { getWeatherReport } from './services/weather';
import type { WeatherResponse } from './types/weather';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherReport, setWeatherReport] = useState<WeatherResponse | null>(null);

  const onSearch = async (city: string) => {
    try {
      setLoading(true);
      const result: WeatherResponse = await getWeatherReport(city);
      setWeatherReport(result);
    } catch (e) {
      console.log('Error', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      {/* Toggle Row */}
      <Row>
        <Col className="d-flex justify-content-end">
          <UnitSelector />
        </Col>
      </Row>
      {/* Search bar */}
      <Row>
        <Col className="d-flex justify-content-center">
          <SearchBar onSearch={onSearch} />
        </Col>
      </Row>
      {/* Search bar */}
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <MainWeatherInfo />
          <DetailedWeatherInfo />
        </Col>
      </Row>
      {weatherReport && <p>{`${weatherReport}`}</p>}
      {loading && <p>Loading</p>}
      {!loading && weatherReport && <p>Loading Complete</p>}
    </Container>
  );
};

export default App;
