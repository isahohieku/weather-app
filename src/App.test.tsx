import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let container: ShallowWrapper;

  beforeEach(() => (container = shallow(<App />)));
  test('Should render a div with className app', () => {
    expect(container.find('.App').exists()).toBeTruthy();
  });

  // test('Should contain the component weather', () => {
  //   expect();
  // });

  // test('Should redirect all pages to the weather page', () => {

  // });
});
