import * as functions from "firebase-functions";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const unregisterForEvent = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, eventId } = JSON.parse(request.body) as {
      userId: string;
      eventId: string;
    };

    allSuccessfulResponse(
      [
        removeUserToEventMapping(userId, eventId),
        removeEventToUserMapping(userId, eventId),
      ],
      response
    );
  }
);

const removeUserToEventMapping = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("events")
    .doc(eventId)
    .delete()
    .then(() => true)
    .catch(logAndReturnFalse);
};

const removeEventToUserMapping = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("events")
    .doc(eventId)
    .collection("volunteers")
    .doc(userId)
    .delete()
    .then(() => true)
    .catch(logAndReturnFalse);
};
