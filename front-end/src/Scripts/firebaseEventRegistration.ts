import ky from "ky";

export const registerForEvent = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/register_for_event",
      {
        body: JSON.stringify({ userId, eventId }),
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

export const unregisterForEvent = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/unregister_for_event",
      {
        body: JSON.stringify({ userId, eventId }),
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
