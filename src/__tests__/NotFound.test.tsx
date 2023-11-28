import { describe, it, beforeAll, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import mockRouter from 'next-router-mock';
import NotFound from '../pages/404';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the 404 Page component', async () => {
  it('Render 404 Page correctly', async () => {
    render(<NotFound />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('Mocks the useRouter hook and back to main page', () => {
    render(<NotFound />);
    fireEvent.click(screen.getByRole('go-back-button'));
    waitFor(() => {
      expect(mockRouter.asPath).toEqual('/?pageNumber=1&pageSize=10&search=');
    });
  });
});
