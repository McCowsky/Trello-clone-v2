import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TaskInput from '../components/TaskInput';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
describe('CoumnNameInput', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskInput columnId={0} taskId={0} taskName="task" />
      </QueryClientProvider>
    );
  });
  it('renders', () => {
    expect(screen.getByDisplayValue(/task/i)).toBeInTheDocument();
  });
  it('changes value on input', async () => {
    const user = userEvent.setup();

    await act(async () => {
      const input = screen.getByDisplayValue(/task/i);
      await user.clear(input);
      await user.type(input, 'newValue');
      expect(input).toHaveDisplayValue(/newValue/i);
    });
  });
});
