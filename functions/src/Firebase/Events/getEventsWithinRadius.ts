import * as functions from "firebase-functions";
import { getZipCodesWithinRadius } from "../../ZipCodes/getZipCodesWithinRadius";
import firebaseApp from "../firebaseConfig";
import { getEventsFromCollection } from "./getEventsFromEventIdEntry";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsWithinRadius = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { zipcode, radius } = JSON.parse(request.body) as {
      zipcode: string;
      radius: number;
    };

    return getZipCodesWithinRadius(zipcode, radius).then((zipcodes) => {
      const zipcodePromises = zipcodes.map(({ zip }) => {
        return firebaseApp.firestore().collection("zipcodes").doc(zip);
      });

      const promises = Promise.all(zipcodePromises).then((values) => {
        const eventGroups: Promise<
          firebase.firestore.DocumentData[] | null
        >[] = [];
        for (const value of values) {
          eventGroups.push(getEventsFromCollection(value));
        }
        const promises2 = Promise.all(eventGroups).then(
          (eventGroupsResults) => {
            const events: Array<firebase.firestore.DocumentData> = [];
            for (const eventGroup of eventGroupsResults) {
              if (eventGroup) {
                for (const event of eventGroup) {
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
    });
  }
);
