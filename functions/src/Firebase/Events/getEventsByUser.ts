import * as functions from "firebase-functions";
import firebaseApp from "../firebaseConfig";
import { getEventsFromEventRefCollection } from "./getEventsFromEventRefCollection";
import { sortEventsByStartDate } from "./sortEventsByStartDate";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsByUser = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const userId = request.body;
    const userEventRefs = firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("events");
    getEventsFromEventRefCollection(userEventRefs)
      .then((events) => {
        if (events !== null) {
          response.status(200).send(
            JSON.stringify({
              events: sortEventsByStartDate(events),
            })
          );
        } else {
          response.status(200).send(JSON.stringify({ events: [] }));
        }
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(null);
      });
  }
);
