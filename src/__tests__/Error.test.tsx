import { describe, it, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import mockRouter from 'next-router-mock';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the Error components', async () => {
  it('Render Error Boundary', async () => {
    render(<ErrorBoundary />);

    waitFor(() => {
      expect(screen.getByText('Error boundary triggered')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('go-back-button'));
      expect(mockRouter.asPath).toEqual('/?pageNumber=1&pageSize=10&search=');
    });
  });
});
