import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ColumnNameInput from '../components/ColumnNameInput';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
describe('CoumnNameInput', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <ColumnNameInput columnName="column" columnId={0} />
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByDisplayValue(/column/i)).toBeInTheDocument();
  });
  it('changes value on input', async () => {
    const user = userEvent.setup();

    await act(async () => {
      const input = screen.getByDisplayValue(/column/i);
      await user.clear(input);
      await user.type(input, 'newValue');
      expect(input).toHaveDisplayValue(/newValue/i);
    });
  });
});
