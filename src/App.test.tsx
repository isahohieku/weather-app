import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import App from './App';
import UnitSelector from './molecules/unit-selector';
import DetailedWeatherInfo from './organisms/detailed-weather-info';
import MainWeatherInfo from './organisms/main-weather-info';
import SearchBar from './organisms/search-bar';

describe('App', () => {
  let container: ShallowWrapper;

  beforeEach(() => (container = shallow(<App />)));

  test('Should contain a unit selector component', () => {
    expect(container.containsMatchingElement(<UnitSelector />)).toBeTruthy();
  });

  test('Should contain a search component', () => {
    expect(container.containsMatchingElement(<SearchBar />)).toBeTruthy();
  });

  test('Should contain the main weather info component', () => {
    expect(container.containsMatchingElement(<MainWeatherInfo />)).toBeTruthy();
  });

  test('Should contain the detailed weather info component', () => {
    expect(container.containsMatchingElement(<DetailedWeatherInfo />)).toBeTruthy();
  });
});
