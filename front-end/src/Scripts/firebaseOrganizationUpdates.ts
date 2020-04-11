import ky from "ky";

export const updateOrganizationNameDatabase = (
  organizationId: string,
  newOrganizationName: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_name_database",
      {
        body: JSON.stringify({ organizationId, newOrganizationName }),
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

export const updateOrganizationDescriptionDatabase = (
  organizationId: string,
  newOrganizationDescription: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_description_database",
      {
        body: JSON.stringify({ organizationId, newOrganizationDescription }),
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

export const updateOrganizationEmailDatabase = (
  organizationId: string,
  newOrganizationEmail: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_email_database",
      {
        body: JSON.stringify({ organizationId, newOrganizationEmail }),
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

export const updateOrganizationPhoneDatabase = (
  organizationId: string,
  newOrganizationPhone: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_phone_database",
      {
        body: JSON.stringify({ organizationId, newOrganizationPhone }),
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