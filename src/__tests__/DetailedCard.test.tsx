import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockDetails from './mock/mock-details';
import OrganizationDetails from '../components/organization-details/OrganizationDetails';
import mockPageState from './mock/mock-page-state';
import createMockRouter from './mock/createMockRouter';

describe('Tests for the Detailed Card component', () => {
  const router = createMockRouter({
    pathname: '/',
    query: {
      pageNumber: String(mockPageState.pageNumber),
      pageSize: String(mockPageState.pageSize),
      uid: mockDetails.uid,
    },
  });

  it('Hides the component when clicking at the close button', async () => {
    render(
      <RouterContext.Provider value={router}>
        <OrganizationDetails data={mockDetails} isLoading={false} />
      </RouterContext.Provider>
    );

    const detailedCloseBtn = screen.getByRole(
      'organization-details-close-button'
    );

    fireEvent.click(detailedCloseBtn);

    expect(router.push).toBeCalledWith({
      query: {
        pageNumber: String(mockPageState.pageNumber),
        pageSize: String(mockPageState.pageSize),
      },
    });
  });
});
