import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../App';
import mockDetails from './mock/mock-details';
import mockServer from "./mock/mock-server";

const server = mockServer;

describe('Card details component', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('Make sure the detailed card component correctly displays the detailed card data. Check that a loading indicator is displayed while fetching data', async () => {
        const router = createMemoryRouter(routerConfig, {
            initialEntries: [`/details/?uid=${mockDetails.organization.uid}&pageNumber=1&pageSize=10&search=`],
        });
        render(<RouterProvider router={router}/>);

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
                    mockDetails.organization.name
                );
                await expect(detailsParam).toHaveLength(13);
            },
            {timeout: 1000}
        );
    });

    it('Ensure that clicking the close button hides the component', async () => {
        const router = createMemoryRouter(routerConfig, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router}/>);

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
                    mockDetails.organization.name
                );

                const organizationDetailsCloseButton = await screen.getByRole(
                    'organization-details-close-button'
                );
                await fireEvent.click(organizationDetailsCloseButton);
                await expect(organizationDetailsTitle).not.toBeInTheDocument();
            },
            {timeout: 1000},
        );
    });
});
