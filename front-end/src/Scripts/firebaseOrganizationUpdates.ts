import ky from "ky";

export const updateOrganizationNameDatabase = (
  organizationId: string,
  newOrganizationName: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_name",
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
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_description",
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
  newEmail: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_email",
      {
        body: JSON.stringify({ organizationId, newEmail }),
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
  newPhone: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_phone",
      {
        body: JSON.stringify({ organizationId, newPhone }),
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

export const updateOrganizationPhotoUrlDatabase = (
  organizationId: string,
  newPhotoUrl: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_organization_photo_url",
      {
        body: JSON.stringify({ organizationId, newPhotoUrl }),
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
