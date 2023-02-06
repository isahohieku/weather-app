import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Loader from '../../atoms/loader';
import MainWeatherInfo from '../../organisms/MainWeatherInfo';
import SearchBar from '../../molecules/SearchBar';
import ErrorView from '../../molecules/ErrorMessage';
import DetailedWeatherInfo from '../../organisms/DetailedWeatherInfo';
import { QueryClientProvider } from 'react-query';
import type { WeatherResponse } from '../../types';
import { queryClient } from '../../store/react-query';
import { useSearchWeather } from '../../hooks';

const WeatherPage = () => {
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const { isLoading, isFetching, data, error } = useSearchWeather(currentSearch);

  const onSearch = (city: string) => {
    setCurrentSearch(city);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Row>
          <Col>
            <h3 className="text-white mt-5">Simple Weather App</h3>
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
          <Col className="d-flex justify-content-center align-items-center mt-5">
            {!isLoading && !isFetching && !error && data && (
              <>
                <MainWeatherInfo weatherReport={data as WeatherResponse} />
                <DetailedWeatherInfo weatherReport={data as WeatherResponse} />
              </>
            )}
            {!isLoading && !isFetching && error && <ErrorView search={currentSearch} />}
          </Col>
        </Row>
        {(isLoading || isFetching) && <Loader />}
      </Container>
    </QueryClientProvider>
  );
};

export default WeatherPage;
