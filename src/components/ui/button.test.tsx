import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('ui/button', () => {
  it('renders correctly', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeDisabled();
  });
});
