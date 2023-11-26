import { fireEvent, render, screen } from '@testing-library/react';
import mockOrganizations from './mock/mock-organizations';
import mockPageState from './mock/mock-page-state';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import OrganizationsList from '../components/organizations-list/OrganizationsList';
import createMockRouter from './mock/createMockRouter';

describe('Card component', () => {
  const router = createMockRouter({
    pathname: '/',
    query: {
      pageNumber: String(mockPageState.pageNumber),
      pageSize: String(mockPageState.pageSize),
    },
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <RouterContext.Provider value={router}>
        <OrganizationsList
          isLoading={false}
          data={mockOrganizations.organizations}
          linkClickCallback={() => {}}
        />
      </RouterContext.Provider>
    );
    const itemsElements = await screen.findAllByRole('organization-list-item');

    mockOrganizations.organizations.forEach(async (item, index) => {
      expect(itemsElements[index]).toHaveTextContent(item.name);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <RouterContext.Provider value={router}>
        <OrganizationsList
          isLoading={false}
          data={mockOrganizations.organizations}
          linkClickCallback={() => {}}
        />
      </RouterContext.Provider>
    );
    const organizationsElements = await screen.findAllByRole(
      'organization-list-item'
    );
    await fireEvent.click(organizationsElements[0]);
    router.query.uid = mockOrganizations.organizations[0].uid;
  });
});
