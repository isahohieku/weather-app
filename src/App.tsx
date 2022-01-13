import { Col, Container, Row } from 'react-bootstrap';
import UnitSelector from './molecules/unit-selector';
import DetailedWeatherInfo from './organisms/detailed-weather-info';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './organisms/search-bar';

const App = () => {
  const onSearch = () => {
    return;
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
    </Container>
  );
};

export default App;
