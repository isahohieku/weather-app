import { screen, render, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { mockCity, mockFalseCity, mockWeather } from './libs/mock-data/weather';
import { API_BASE_URL } from './constants';

const getWeatherReportResponse = rest.get(`${API_BASE_URL}`, (req, res, ctx) =>
  res(ctx.json(mockWeather)),
);
const getWeatherReportErrorResponse = rest.get(`${API_BASE_URL}`, (req, res, ctx) =>
  res(ctx.status(404)),
);
const server = setupServer(getWeatherReportResponse);

Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: (success: any) => 
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }),
  },
  configurable: true,
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  test('Should contain a search component', () => {
    expect(render(<App />)).toBeTruthy();
  });

  test('Should search random coordinate when app mounts', async () => {
    render(<App />);
    const city = await screen.findByText(new RegExp(mockCity, 'i'));
    expect(city).toBeTruthy();
  });

  test('Should make an API call for a searched city and be displayed', async () => {
    const { container } = render(<App />);
    const searchInput = container.querySelector('#search') as Element;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: mockCity } });

    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const city = await screen.findByText(new RegExp(mockCity, 'i'));
    expect(city).toBeVisible();
  });

  test('Should toggle temperature unit', async () => {
    render(<App />);
    const toggleBtn = screen.getByRole('button', { name: /toggle temperature unit/i });
    
    // Default is C, click toggles to F
    fireEvent.click(toggleBtn);
    
    // Search for city to render weather report and hit Fahrenheit conversion
    const searchInput = screen.getByPlaceholderText(/Search City/i);
    const searchBtn = screen.getByRole('button', { name: /search/i });
    fireEvent.change(searchInput, { target: { value: mockCity } });
    fireEvent.click(searchBtn);

    const city = await screen.findByText(new RegExp(mockCity, 'i'));
    expect(city).toBeVisible();

    // Click again to toggle back to C
    fireEvent.click(toggleBtn);
  });

  test('Should display geolocation error if geolocation fails', async () => {
    const originalGeolocation = global.navigator.geolocation;
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    render(<App />);
    const error = await screen.findByText('Geolocation is not supported by your browser');
    expect(error).toBeInTheDocument();

    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true,
    });
  });

  test('Should make an API call for a none existing city and throw error', async () => {
    server.use(getWeatherReportErrorResponse);
    const { container } = render(<App />);

    const searchInput = container.querySelector('#search') as Element;
    const button = screen.getByRole('button', { name: /search/i });

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
