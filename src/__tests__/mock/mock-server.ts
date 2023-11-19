import { delay, http, HttpResponse } from "msw";
import { mockOrganizations } from "./mock-organizations";
import mockDetails from "./mock-details";
import { setupServer } from "msw/node";

export const handlers = [
    http.get(
        `https://stapi.co/api/v1/rest/organization/search?pageNumber=1&pageSize=10`,
        async ({request, params, cookies}) => {
            await delay(1000);
            return HttpResponse.json(mockOrganizations);
        }
    ),
    http.get(
        `https://stapi.co/api/v1/rest/organization/?uid=ORMA0000150866`,
        ({request, params, cookies}) => {
            return HttpResponse.json(mockDetails);
        }
    ),
];
const mockServer = setupServer(...handlers);

export default mockServer;