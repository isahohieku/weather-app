import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import { mockCity } from '../../libs/mock-data/weather';
import SearchBar from '.';
import { fireEvent, getByText, render, screen } from '@testing-library/react';

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
    render(<SearchBar onSearch={onSearch} />);

    const input = document.querySelector('#search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: mockCity } });

    const button = screen.getByRole('button');

    fireEvent(
      getByText(button, 'Search'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(onSearch).toHaveBeenCalledWith(mockCity);
  });

  test('Should not call props onSubmit if the input has no value', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = document.querySelector('#search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByRole('button');

    fireEvent(
      getByText(button, 'Search'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onSearch).not.toHaveBeenCalled();
  });
});
