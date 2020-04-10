import * as functions from "firebase-functions";
import { getZipCodesWithinRadius } from "../../ZipCodes/getZipCodesWithinRadius";
import firebaseApp from "../firebaseConfig";
import { getEventsFromEventRefCollection } from "./getEventsFromEventIdEntry";
import { EventData } from "./eventTypes";
import { sortEventsByStartDate } from "./sortEventsByStartDate";
import { removeEventMapInZipcode } from "./eventRefMappings";

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

              const sortedEvents = sortEventsByStartDate(events as EventData[]);
              const now = new Date();
              while (
                sortedEvents.length > 0 &&
                new Date(
                  `${sortedEvents[0].endDate} ${sortedEvents[0].endTime}`
                ) < now
              ) {
                const removeMappingFor = sortedEvents.shift();
                if (removeMappingFor) {
                  const removePromise = removeEventMapInZipcode(
                    removeMappingFor.zip,
                    removeMappingFor.eventId
                  );
                  console.log(
                    `Removed expired mapping for ${removeMappingFor.eventId} in ${removeMappingFor.zip}: ${removePromise}`
                  );
                }
              }

              response.status(200).send({ events: sortedEvents });
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
