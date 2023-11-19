import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { routerConfig } from '../App';
import mockDetails from './mock/mock-details';
import LOCAL_STORAGE_SEARCH_VALUE from '../constants/common.constant';

const localStorageMock = (() => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
  };
})();

let originalLocalStorage: Storage;

describe('Search component', () => {
  beforeAll(() => {
    originalLocalStorage = window.localStorage;
    (window as unknown).localStorage = localStorageMock;
  });

  afterAll(() => {
    (window as unknown).localStorage = originalLocalStorage;
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    const searchInput = await screen.getByRole('search-input');
    const searchButton = await screen.getByRole('search-button');

    fireEvent.input(searchInput, { target: { value: mockDetails.organization.uid } });
    fireEvent.click(searchButton);
    expect(localStorageMock.getItem(LOCAL_STORAGE_SEARCH_VALUE)).toEqual(
      mockDetails.organization.uid
    );
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {});
});
