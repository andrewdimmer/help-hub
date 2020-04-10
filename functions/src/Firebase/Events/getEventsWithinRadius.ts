import * as functions from "firebase-functions";
import { getZipCodesWithinRadius } from "../../ZipCodes/getZipCodesWithinRadius";
import firebaseApp from "../firebaseConfig";
import { getEventsFromEventRefCollection } from "./getEventsFromEventIdEntry";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsWithinRadius = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { zipcode, radius } = JSON.parse(request.body) as {
      zipcode: string;
      radius: number;
    };

    const entryPromise = getZipCodesWithinRadius(zipcode, radius)
      .then((zipcodes) => {
        const zipcodePromises = zipcodes.map(({ zip }) => {
          return firebaseApp.firestore().collection("zipcodes").doc(zip);
        });

        const promises = Promise.all(zipcodePromises).then((values) => {
          const zipcodeEvents: Promise<
            firebase.firestore.DocumentData[] | null
          >[] = [];
          for (const value of values) {
            zipcodeEvents.push(
              getEventsFromEventRefCollection(
                value.collection("upcomingEvents")
              )
            );
          }
          const promises2 = Promise.all(zipcodeEvents).then(
            (zipcodeEventsResults) => {
              const events: Array<firebase.firestore.DocumentData> = [];
              for (const zipcodeEventsResult of zipcodeEventsResults) {
                if (zipcodeEventsResult) {
                  for (const event of zipcodeEventsResult) {
                    events.push(event);
                  }
                }
              }
              response.status(200).send({ events });
            }
          );
          console.log(promises2);
        });
        console.log(promises);
      })
      .catch((err) => {
        console.log(err);
        response.status(200).send(null);
      });
    console.log(entryPromise);
  }
);
