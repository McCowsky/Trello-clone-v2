import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ColumnMenu from '../components/ColumnMenu';
import { vi } from 'vitest';
describe('ColumnMenu', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ColumnMenu columnId={0} newTask={vi.fn} />
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByTestId('columnMenu')).toBeInTheDocument();
  });
});
