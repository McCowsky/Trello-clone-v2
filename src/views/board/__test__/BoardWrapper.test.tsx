import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BoardWrapper from '../BoardWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'whatwg-fetch';
import { server } from '../../../mocks/server';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('BoardWrapper', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BoardWrapper />
      </QueryClientProvider>
    );
  });
  it('shows loading while fetching data', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it('render board component', async () => {
    await screen.findByTestId('boardName');
  });
});
