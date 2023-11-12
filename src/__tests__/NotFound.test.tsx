import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../App';

describe('Tests for the 404 Page', async () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/not-found'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
