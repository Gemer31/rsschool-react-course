import {
  IOrganization,
  IOrganizationsResponse,
} from './models/organization.model';

class OrganizationApi {
  public baseUrl: string = 'https://stapi.co/api/v1/rest/organization';

  async getItems(
    page: number,
    size: number
    // searchValue: string = ''
  ): Promise<IOrganizationsResponse> {
    const response = await fetch(
      `${this.baseUrl}/search?pageNumber=${page}&pageSize=${size}`
    );
    return await response.json();
  }

  async getDetails(uid: string): Promise<IOrganization> {
    const response = await fetch(`${this.baseUrl}?uid=${uid}`);
    const data: { organization: IOrganization } = await response.json();
    return data.organization;
  }
}

const starShipsApi = new OrganizationApi();

export default starShipsApi;
