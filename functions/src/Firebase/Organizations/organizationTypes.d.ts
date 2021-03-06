import { UserPublicProfile } from "../Users/userTypes";

export declare interface OrganizationData {
  organizationId: string;
  organizationName: string;
  organizationDesciption: string;
  email: string;
  phone: string;
  photoUrl: string;
}

export declare interface OrganizationDataWithManagers extends OrganizationData {
  managers: UserPublicProfile[];
}
