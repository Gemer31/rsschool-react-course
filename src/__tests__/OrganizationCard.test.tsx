import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { routerConfig } from '../App';
import organizationApi from '../api/organization.api';
import mockDetails from './mock/mock-details';
import mockOrganizations from './mock/mock-organizations';
import OrganizationsList from '../components/organizations-list/OrganizationsList';

describe('Card component', () => {
  beforeAll(() => {
    organizationApi.getItems = vi
      .fn()
      .mockReturnValue(Promise.resolve(mockOrganizations));
    organizationApi.getDetails = vi
      .fn()
      .mockReturnValue(Promise.resolve(mockDetails));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <MemoryRouter>
        <OrganizationsList
          loading={false}
          items={mockOrganizations.organizations}
        />
      </MemoryRouter>
    );
    const itemsElements = await screen.findAllByRole('organization-list-item');
    mockOrganizations.organizations.forEach(async (item, index) => {
      expect(itemsElements[index]).toHaveTextContent(item.name);
    });
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
      expect(organizationDetailsTitle).toHaveTextContent(mockDetails.name);
    });
  });
});
