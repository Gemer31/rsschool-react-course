export interface IOrganization {
  uid: string;
  name: string;
  government: boolean;
  intergovernmentalOrganization: boolean;
  researchOrganization: boolean;
  sportOrganization: boolean;
  medicalOrganization: boolean;
  militaryOrganization: boolean;
  militaryUnit: boolean;
  governmentAgency: boolean;
  lawEnforcementAgency: boolean;
  prisonOrPenalColony: boolean;
  mirror: boolean;
  alternateReality: boolean;
}

export interface IOrganizationsResponse {
  organizations: IOrganization[];
  page: IPage;
}

export interface IOrganizationResponse {
  organization: IOrganization;
}

export interface IPage {
  firstPage?: boolean;
  lastPage?: boolean;
  numberOfElements?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}
