import ky from "ky";
import { OrganizationData } from "./firebaseOrganizationTypes";

export const createNewOrganization = (
  userId: string,
  organizationData: OrganizationData
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/create_new_organization",
      {
        body: JSON.stringify({
          userId,
          organizationData,
        }),
      }
    )
    .then((results) =>
      results
        .text()
        .then(
          (text) => text.length === "true".length && text.indexOf("true") === 0
        )
        .catch((err) => {
          console.log(err);
          return false;
        })
    )
    .catch((err) => {
      console.log(err);
      return false;
    });
};
