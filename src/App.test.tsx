import type { ShallowWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { waitFor, screen } from '@testing-library/react';
import type { AxiosError, AxiosResponse } from 'axios';
import mockAxios from 'jest-mock-axios';
import App from './App';
import {
  mockCity,
  mockErrorNotFoundCity,
  mockFalseCity,
  mockWeather,
} from './libs/mock-data/weather';
import UnitSelector from './molecules/unit-selector';
import DetailedWeatherInfo from './organisms/detailed-weather-info';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './organisms/search-bar';
import type { WeatherErrorResponse, WeatherResponse } from './types/weather';
import { getWeatherReport } from './services/weather';
import { waitForComponentToPaint } from './utils/functions';

describe('App', () => {
  let container: ShallowWrapper;

  afterEach(() => {
    mockAxios.reset();
  });

  beforeEach(() => (container = shallow(<App />)));

  test('Should contain a unit selector component', () => {
    expect(container.containsMatchingElement(<UnitSelector />)).toBeTruthy();
  });

  test('Should contain a search component', () => {
    const onSearch = jest.fn();
    expect(container.find(<SearchBar onSearch={onSearch} />)).toBeTruthy();
  });

  test('Should contain the main weather info component', () => {
    expect(container.containsMatchingElement(<MainWeatherInfo />)).toBeTruthy();
  });

  test('Should contain the detailed weather info component', () => {
    expect(container.containsMatchingElement(<DetailedWeatherInfo />)).toBeTruthy();
  });

  test('Should make an API call for a searched city and be displayed', async () => {
    const wrapper = mount(<App />);
    const searchInput = wrapper.find('#search').first();
    const button = wrapper.find('button').first();
    searchInput.simulate('change', { target: { value: mockCity } });

    button.simulate('click');

    const data = await getWeatherReport(mockCity);

    const mockedResponse: AxiosResponse<WeatherResponse> = {
      data: mockWeather,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockAxios.get.mockResolvedValue(mockedResponse);

    waitForComponentToPaint(wrapper, 1000);

    expect(typeof data).toBe(typeof mockWeather);

    await waitFor(() => screen.getByText(mockCity));
  });

  test('Should make an API call for aa unknown city and throw error', async () => {
    const mockedResponse: AxiosError<WeatherErrorResponse> = {
      response: {
        data: mockErrorNotFoundCity,
        status: 404,
        statusText: 'OK',
        headers: {},
        config: {},
      },
      config: {},
      message: mockErrorNotFoundCity.message,
      name: 'Just Error',
      toJSON: () => {
        return {};
      },
      isAxiosError: true,
    };

    mockAxios.get.mockRejectedValueOnce(mockedResponse);

    const wrapper = mount(<App />);
    const searchInput = wrapper.find('#search').first();
    const button = wrapper.find('button').first();
    searchInput.simulate('change', { target: { value: mockFalseCity } });

    button.simulate('click');

    const data = await getWeatherReport(mockFalseCity);

    expect(data).toEqual(expect.stringContaining(mockErrorNotFoundCity.message));
  });
});
