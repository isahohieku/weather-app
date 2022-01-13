import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { API_BASE_URL } from './constants';
import { mockCity, mockWeather } from './libs/mock-data/weather';
import UnitSelector from './molecules/unit-selector';
import DetailedWeatherInfo from './organisms/detailed-weather-info';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './organisms/search-bar';

const server = setupServer(
  rest.get(`${API_BASE_URL as string}/q=${mockCity}`, (req, res, ctx) => {
    return res(ctx.json(mockWeather));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  let container: ShallowWrapper;

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

  //   test('Should make an API call for a searched city and be displayed', () =>  {

  //   });

  //   test('Should make an API call for a searched city and throw error', () =>  {

  // });
});
