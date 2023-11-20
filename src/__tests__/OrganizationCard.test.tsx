import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../App';
import mockDetails from './mock/mock-details';
import { mockOrganizations } from './mock/mock-organizations';
import mockServer from './mock/mock-server';

const server = mockServer;

describe('Card component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Ensure that the card component renders the relevant card data', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: [
        `/details/?uid=${mockDetails.organization.uid}&pageNumber=1&pageSize=10&search=`,
      ],
    });
    render(<RouterProvider router={router} />);

    await waitFor(
      async () => {
        const itemsElements = await screen.findAllByRole(
          'organization-list-item'
        );
        mockOrganizations.organizations.forEach(async (item, index) => {
          expect(itemsElements[index]).toHaveTextContent(item.name);
        });

        const organizationDetailsTitle = await screen.getByRole(
          'organization-details-title'
        );
        expect(organizationDetailsTitle).toHaveTextContent(
          mockDetails.organization.name
        );
      },
      { timeout: 2000 }
    );
  });

  it('Validate that clicking on a card opens a detailed card component. Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    const organizationsElements = await screen.findAllByRole(
      'organization-list-item'
    );
    await fireEvent.click(organizationsElements[0]);

    await waitFor(async () => {
      const organizationDetailsTitle = await screen.getByRole(
        'organization-details-title'
      );
      expect(organizationDetailsTitle).toHaveTextContent(
        mockDetails.organization.name
      );
    });
  });
});
