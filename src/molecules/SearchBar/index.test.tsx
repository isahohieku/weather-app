import { fireEvent, getByText, render, screen, queryByAttribute } from '@testing-library/react';
import Input from '../../atoms/Input';
import { mockCity } from '../../libs/mock-data/weather';
import SearchBar from '.';

describe('Search Bar', () => {
  const defaultProps = {
    onSearch: vi.fn(),
    onLocate: vi.fn(),
    isLocating: false,
  };

  test('Should contain a button component', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByRole('button', { name: /search/i })).toHaveTextContent('Search');
  });

  test('Should contain a search form control component', () => {
    const onChange = vi.fn();
    const { container } = render(<Input onChange={onChange} id="search" />);

    const getById = queryByAttribute.bind(null, 'id');

    expect(getById(container, 'search')).toBeTruthy();
  });

  test('Should call props onSubmit if the input has value', () => {
    const onSearch = vi.fn();
    const { container } = render(<SearchBar {...defaultProps} onSearch={onSearch} />);
    const getById = queryByAttribute.bind(null, 'id');

    const input = getById(container, 'search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: mockCity } });

    const button = screen.getByRole('button', { name: /search/i });

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
    const onSearch = vi.fn();
    render(<SearchBar {...defaultProps} onSearch={onSearch} />);

    const input = document.querySelector('#search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByRole('button', { name: /search/i });

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
