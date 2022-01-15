import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Loader from '../../atoms/loader';
import MainWeatherInfo from '../../organisms/main-weather-info';
import SearchBar from '../../molecules/search-bar';
import { getWeatherReport } from '../../services/weather';
import ErrorView from '../../molecules/error-message';
import DetailedWeatherInfo from '../../organisms/detailed-weather-info';
import { QueryClientProvider, useQuery } from 'react-query';
import type { WeatherErrorResponse, WeatherResponse } from '../../types/weather';
import { queryClient } from '../../store/react-query';

const cacheTime = 10 * 60 * 1000; // 10 min

const WeatherPage = () => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const { isLoading, isFetching, data, error, refetch } = useQuery<
    WeatherResponse,
    WeatherErrorResponse
  >('weatherReportByCity', () => getWeatherReport(currentSearch), {
    enabled: false,
    cacheTime,
    retry: 0,
  });

  useEffect(() => {
    refetch();
  }, [currentSearch]);

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
