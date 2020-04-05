import * as functions from "firebase-functions";
import { getZipCodesWithinRadius } from "../../ZipCodes/getZipCodesWithinRadius";
import firebaseApp from "../firebaseConfig";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsWithinRadius = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { zipcode, radius } = JSON.parse(request.body) as {
      zipcode: string;
      radius: number;
    };

    return getZipCodesWithinRadius(zipcode, radius).then(zipcodes => {
      const zipcodePromises = zipcodes.map(({ zip }) => {
        return firebaseApp
          .firestore()
          .collection("zipcodes")
          .doc(zip)
          .collection("events")
          .get()
          .then(value => value.docs)
          .catch(err => {
            console.log(err);
            return null;
          });
      });

      const promises = Promise.all(zipcodePromises).then(values => {
        const events = [];
        for (const value of values) {
          if (value) {
            for (const event of value) {
              const eventData = event.data();
              if (eventData) {
                events.push(eventData);
              }
            }
          }
        }
        response.status(200).send({ events });
      });
      console.log(promises);
    });
  }
);
