import { UserPublicProfile } from "./firebaseUserTypes";

export declare interface OrganizationData {
  organizationId: string;
  organizationName: string;
  organizationDescription: string;
  email: string;
  phone: string;
  photoUrl: string;
}

export declare interface OrganizationDataWithManagers extends OrganizationData {
  managers: UserPublicProfile[];
}
