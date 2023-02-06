import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import { screen, render, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { mockCity, mockFalseCity, mockWeather } from './libs/mock-data/weather';
import SearchBar from './molecules/SearchBar';
import { API_BASE_URL } from './constants';

const getWeatherReportResponse = rest.get(`${API_BASE_URL}`, (req, res, ctx) =>
  res(ctx.json(mockWeather)),
);
const getWeatherReportErrorResponse = rest.get(`${API_BASE_URL}`, (req, res, ctx) =>
  res(ctx.status(404)),
);
const server = setupServer(getWeatherReportResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  let container: ShallowWrapper;

  beforeEach(() => (container = shallow(<App />)));

  test('Should contain a search component', () => {
    const onSearch = jest.fn();
    expect(container.find(<SearchBar onSearch={onSearch} />)).toBeTruthy();
  });

  test('Should search random coordinate when app mounts', async () => {
    render(<App />);
    const city = await screen.findByText(mockCity);
    expect(city).toBeVisible();
  });

  test('Should make an API call for a searched city and be displayed', async () => {
    const { container } = render(<App />);
    const searchInput = container.querySelector('#search') as Element;
    const button = screen.getByRole('button');

    fireEvent.change(searchInput, { target: { value: mockCity } });

    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const city = await screen.findByText(mockCity);
    expect(city).toBeVisible();
  });

  test('Should make an API call for a none existing city and throw error', async () => {
    server.use(getWeatherReportErrorResponse);
    const { container } = render(<App />);

    const searchInput = container.querySelector('#search') as Element;
    const button = screen.getByRole('button');

    fireEvent.change(searchInput, { target: { value: mockFalseCity } });

    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const city = await screen.findByText(/Ops/i);
    expect(city).toBeVisible();
  });
});
