import * as functions from "firebase-functions";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const registerForEvent = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, eventId } = JSON.parse(request.body) as {
      userId: string;
      eventId: string;
    };

    allSuccessfulResponse(
      [
        createUserToEventMapping(userId, eventId),
        createEventToUserMapping(userId, eventId),
      ],
      response
    );
  }
);

const createUserToEventMapping = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("events")
    .doc(eventId)
    .set({ eventId })
    .then(() => true)
    .catch(logAndReturnFalse);
};

const createEventToUserMapping = (
  userId: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("events")
    .doc(eventId)
    .collection("volunteers")
    .doc(userId)
    .set({ userId })
    .then(() => true)
    .catch(logAndReturnFalse);
};
