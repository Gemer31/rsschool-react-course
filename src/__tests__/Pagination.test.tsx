import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import PagesBar from '../components/pages-bar/PagesBar';
import mockPageState from './mock/mock-page-state';
import createMockRouter from './mock/createMockRouter';

describe('Page bur component', () => {
  it('Updates URL query parameter when page changes', async () => {
    const router = createMockRouter({
      query: {
        pageNumber: String(mockPageState.pageNumber),
        pageSize: String(mockPageState.pageSize),
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <PagesBar
          pageState={mockPageState}
          changePageClickCallback={() => {}}
        />
      </RouterContext.Provider>
    );

    const pageNumber = screen.getByRole('page-number');
    const paginationNextBtn = screen.getByRole('next-page-button');

    expect(pageNumber).toHaveTextContent(String(mockPageState.pageNumber));
    fireEvent.click(paginationNextBtn);
    expect(router.push).toBeCalledWith({
      query: {
        pageNumber: mockPageState.pageNumber + 1,
        pageSize: String(mockPageState.pageSize),
      },
    });
  });
});
