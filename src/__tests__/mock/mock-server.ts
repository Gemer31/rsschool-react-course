import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  mockOrganizations,
  mockOrganizationsEmpty,
} from './mock-organizations';
import mockDetails from './mock-details';

const mockServerBaseUrl: string = 'https://stapi.co/api/v1/rest/organization';

export const handlers = [
  http.get(`${mockServerBaseUrl}/search?pageNumber=1&pageSize=10`, async () => {
    await delay(1000);
    return HttpResponse.json(mockOrganizations);
  }),
  http.get(`${mockServerBaseUrl}/search?pageNumber=1&pageSize=15`, async () => {
    return HttpResponse.json(mockOrganizationsEmpty);
  }),
  http.get(`${mockServerBaseUrl}/?uid=${mockDetails.organization.uid}`, () => {
    return HttpResponse.json(mockDetails);
  }),
];
const mockServer = setupServer(...handlers);

export default mockServer;
