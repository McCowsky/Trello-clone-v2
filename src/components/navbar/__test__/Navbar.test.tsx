import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Navbar from '../Navbar';
import { Router, ReactLocation, Outlet } from '@tanstack/react-location';
import { routes } from '@/router/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';

describe('Navbar', () => {
  const location = new ReactLocation();
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router routes={routes} location={location}>
          <Navbar />
          <Outlet />
        </Router>
      </QueryClientProvider>
    );
  });
  describe('Navbar', () => {
    it('trello button renders correctly', () => {
      expect(screen.getByRole('link', { name: /trello/i })).toBeInTheDocument();
    });
    it('workspace button renders correctly', () => {
      expect(screen.getByRole('link', { name: /workspace/i })).toBeInTheDocument();
    });
    it('trello button redirects', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: /trello/i }));
      expect(screen.getByText(/react trello clone/i)).toBeInTheDocument();
    });
    it('workspace button redirects', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: /workspace/i }));
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });
});
