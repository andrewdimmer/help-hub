import ky from "ky";
import { CreateNewEventGroupFunctionInput } from "./firebaseEventTypes";

export const createNewEventGroup = (
  eventData: CreateNewEventGroupFunctionInput
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/create_new_event_group",
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
