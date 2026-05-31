import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders correctly with given text', () => {
    render(<Button innerText="Click Me" />);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button innerText="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Click Me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has default type submit', () => {
    render(<Button innerText="Submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<Button innerText="Custom" className="my-class" />);
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass('my-class');
  });
});
