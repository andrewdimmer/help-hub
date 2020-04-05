import ky from "ky";
import { UserProfile } from "./firebaseGetUserProfile";

export const createNewEventDatabase = (eventData: {
  organizationId: string;
  eventName: string;
  eventDescription: string;
  eventContactInfo: string;
  events: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }[];
  categories: string[];
  volunteer: UserProfile | null;
}): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/create_new_event",
      {
        body: JSON.stringify(eventData),
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
