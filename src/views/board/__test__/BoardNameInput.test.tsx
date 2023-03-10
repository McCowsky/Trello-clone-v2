import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import BoardNameInput from '../components/BoardNameInput';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('boardnameinput', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BoardNameInput boardName="board" />{' '}
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByDisplayValue(/board/i));
  });
  it('changes value on input', async () => {
    const user = userEvent.setup();

    await act(async () => {
      const input = screen.getByDisplayValue(/board/i);
      await user.clear(input);
      await user.type(input, 'newValue');
      expect(input).toHaveDisplayValue(/newValue/i);
    });
  });
});
