import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from "../App";
import mockServer from "./mock/mock-server";

const server = mockServer;

describe('Cards list', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Verify that the component renders the specified number of cards', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router}/>);

    await waitFor(async () => {
      const itemsElements = await screen.findAllByRole('organization-list-item');
      expect(itemsElements).toHaveLength(10);
    }, {timeout: 1000});
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router}/>);

    await waitFor(async () => {
      expect(screen.getByText('No items')).toBeInTheDocument();
    }, {timeout: 1000});
  });
});
