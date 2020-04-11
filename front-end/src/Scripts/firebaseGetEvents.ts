import ky from "ky";
import { EventData, EventDataWithCount } from "./firebaseEventTypes";

export const getEventsWithinRadius = (
  zipcode: string,
  radius: number
): Promise<EventDataWithCount[] | null> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_events_within_radius",
      {
        body: JSON.stringify({ zipcode, radius }),
      }
    )
    .then((results) =>
      results
        .json()
        .then((json) => json.events)
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

export const getEventsByUser = (
  userId: string
): Promise<EventData[] | null> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_events_by_user",
      {
        body: userId,
      }
    )
    .then((results) =>
      results
        .json()
        .then((json) => json.events)
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
