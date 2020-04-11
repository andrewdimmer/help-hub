import ky from "ky";
import { OrganizationDataWithManagers } from "./firebaseOrganizationTypes";

export const getOrganizationsByUser = (
  userId: string
): Promise<OrganizationDataWithManagers[] | null> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_organizations_by_user",
      {
        body: userId,
      }
    )
    .then((results) =>
      results
        .json()
        .then((json) => json.organizations)
        .catch((err) => {
          console.log(err);
          return null;
        })
    )
    .catch((err) => {
      console.log(err);
      return null;
    });
};
