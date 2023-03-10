import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'whatwg-fetch';
import { server } from '../../../mocks/server';
import BoardWrapper from '../BoardWrapper';
import React from 'react';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Board', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BoardWrapper />
      </QueryClientProvider>
    );
  });

  it('name input renders', async () => {
    await screen.findByTestId('boardNameInput');
  });
  it('drop area renders', async () => {
    await screen.findByTestId('boardDropArea');
  });
  // it('new column button renders', async () => {
  //   await screen.findByRole('button', {
  //     name: /\+add another list/i
  //   });
  // });
});
