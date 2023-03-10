import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Home from '../Home';

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText(/react trello clone/i)).toBeInTheDocument();
  });
});
