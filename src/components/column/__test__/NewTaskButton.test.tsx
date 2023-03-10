import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NewTaskButton from '../components/NewTaskButton';
import { vi } from 'vitest';
describe('NewTaskButton', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewTaskButton newTask={vi.fn} />
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByRole('button', { name: /add card/i }));
  });
});
