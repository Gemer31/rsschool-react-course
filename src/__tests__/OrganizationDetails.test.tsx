import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';
import organizationApi from '../api/organization.api';
import { routerConfig } from '../App';
import OrganizationDetails from '../components/organization-details/OrganizationDetails';
import mockDetails from './mock/mock-details';
import mockOrganizations from './mock/mock-organizations';

describe('Card details component', () => {
  beforeAll(() => {
    organizationApi.getItems = vi
      .fn()
      .mockReturnValue(Promise.resolve(mockOrganizations));
    organizationApi.getDetails = vi.fn().mockReturnValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockDetails);
        }, 1000);
      })
    );
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('Make sure the detailed card component correctly displays the detailed card data. Check that a loading indicator is displayed while fetching data', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: [`/details/?uid=${mockDetails.uid}`],
    });
    render(
      <RouterProvider router={router}>
        <OrganizationDetails />
      </RouterProvider>
    );

    await waitFor(async () => {
      const loader = await screen.getByRole('loader');
      expect(loader).toBeInTheDocument();
    });

    await waitFor(
      async () => {
        const organizationDetailsTitle = await screen.getByRole(
          'organization-details-title'
        );
        const detailsParam = await screen.findAllByRole('details-param');
        await expect(organizationDetailsTitle).toHaveTextContent(
          mockDetails.name
        );
        await expect(detailsParam).toHaveLength(13);
      },
      { timeout: 1000 }
    );
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    const organizationsElements = await screen.findAllByRole(
      'organization-list-item'
    );
    await fireEvent.click(organizationsElements[0]);

    await waitFor(
      async () => {
        const organizationDetailsTitle = await screen.getByRole(
          'organization-details-title'
        );
        await expect(organizationDetailsTitle).toHaveTextContent(
          mockDetails.name
        );

        const organizationDetailsCloseButton = await screen.getByRole(
          'organization-details-close-button'
        );
        await fireEvent.click(organizationDetailsCloseButton);
        await expect(organizationDetailsTitle).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
