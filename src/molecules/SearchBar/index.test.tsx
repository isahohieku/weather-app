import type { ShallowWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import { mockCity } from '../../libs/mock-data/weather';
import SearchBar from '.';

describe('Search Bar', () => {
  let container: ShallowWrapper;

  beforeEach(() => {
    const defaultProps = { onSearch: jest.fn() };
    container = shallow(<SearchBar {...defaultProps} />);
  });

  test('Should contain a button component', () => {
    expect(container.containsMatchingElement(<Button />)).toBeTruthy();
  });

  test('Should contain a search form control component', () => {
    const onChange = jest.fn();
    expect(container.find(<Input id="search" onChange={onChange} />)).toBeTruthy();
  });

  test('Should call props onSubmit if the input has value', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<SearchBar onSearch={onSearch} />);
    const searchInput = wrapper.find('#search').first();
    const button = wrapper.find('button');
    searchInput.simulate('change', { target: { value: mockCity } });

    button.simulate('click');
    expect(onSearch).toHaveBeenCalledWith(mockCity);
  });

  test('Should not call props onSubmit if the input has no value', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<SearchBar onSearch={onSearch} />);
    const searchInput = wrapper.find('#search').first();
    const button = wrapper.find('button');
    searchInput.simulate('change', { target: { value: '' } });

    button.simulate('click');
    expect(onSearch).not.toHaveBeenCalled();
  });
});
