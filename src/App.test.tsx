import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import App from './App';
import UnitSelector from './molecules/unit-selector';

describe('App', () => {
  let container: ShallowWrapper;

  beforeEach(() => (container = shallow(<App />)));

  test('Should contain a unit selector component', () => {
    expect(container.containsMatchingElement(<UnitSelector />)).toBeTruthy();
  });
});
