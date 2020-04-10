import ky from "ky";

export const updateDisplayNameDatabase = (
  userId: string,
  newDisplayName: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_display_name_database",
      {
        body: JSON.stringify({ userId, newDisplayName }),
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

export const updateEmailDatabase = (
  userId: string,
  oldEmail: string,
  newEmail: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_email_database",
      {
        body: JSON.stringify({ userId, oldEmail, newEmail }),
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

export const updatePhoneDatabase = (
  userId: string,
  newPhone: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_phone_database",
      {
        body: JSON.stringify({ userId, newPhone }),
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

export const updatePhotoUrlDatabase = (
  userId: string,
  newPhotoUrl: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_photo_url_database",
      {
        body: JSON.stringify({ userId, newPhotoUrl }),
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

export const updateZipcodeDatabase = (
  userId: string,
  newZipcode: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_zipcode_database",
      {
        body: JSON.stringify({ userId, newZipcode }),
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

export const updateInterestsDatabase = (
  userId: string,
  newInterests: string[]
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/update_interests_database",
      {
        body: JSON.stringify({ userId, newInterests }),
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
