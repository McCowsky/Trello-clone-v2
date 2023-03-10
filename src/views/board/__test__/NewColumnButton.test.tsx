import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import NewColumnButton from '../components/NewColumnButton';
describe('NewColumnButton', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewColumnButton />
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByRole('button', { name: /\+ add another list/i })).toBeInTheDocument();
  });
});
