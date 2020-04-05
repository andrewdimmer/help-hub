import * as functions from "firebase-functions";
import {
  addEmailToUserIdMapping,
  getEmailToUserIdMapping,
  removeEmailToUserIdMapping
} from "./userInformationMappings";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const testInformationMappings = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    allSuccessfulResponse(
      [testInformationMappingsEmailToUserId()],
      response,
      "All test cases passed!",
      "One or more test cases failed."
    );
  }
);

/**
 * testInformationMappingsEmailToUserId
 * @description Runs unit tests on all of the basic mapping functions associated with email address and userId.
 * @returns true if all functions worked, false if one or more functions did not.
 */
const testInformationMappingsEmailToUserId = (): Promise<boolean> => {
  const testEmail = "example@example.com";
  const testUserId = "ThisIsAUserId";
  return addEmailToUserIdMapping(testEmail, testUserId)
    .then(() =>
      getEmailToUserIdMapping(testEmail)
        .then(data => {
          if (
            data.email.indexOf(testEmail) === 0 &&
            data.email.length === testEmail.length &&
            data.userId.indexOf(testUserId) === 0 &&
            data.userId.length === testUserId.length
          ) {
            return removeEmailToUserIdMapping(testEmail)
              .then(() =>
                getEmailToUserIdMapping(testEmail)
                  .then(() => false)
                  .catch(logAndReturnFalse)
              )
              .catch(logAndReturnFalse);
          }
          return false;
        })
        .catch(logAndReturnFalse)
    )
    .catch(logAndReturnFalse);
};
