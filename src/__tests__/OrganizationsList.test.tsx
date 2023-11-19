import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../App';
import mockServer from './mock/mock-server';

const server = mockServer;

describe('Cards list', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/?pageNumber=1&pageSize=15'],
    });
    render(<RouterProvider router={router} />);

    await waitFor(
      async () => {
        expect(screen.getByText('No items')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
