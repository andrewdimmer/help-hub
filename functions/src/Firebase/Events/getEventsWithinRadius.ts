import * as functions from "firebase-functions";
import { getZipCodesWithinRadius } from "../../ZipCodes/getZipCodesWithinRadius";
import firebaseApp from "../firebaseConfig";
import { getPublicProfilesFromUserRefCollection } from "../Users/getPublicProfilesFromUserRefCollection";
import { sortUsersByName } from "../Users/sortUsersByName";
import { removeEventMapInZipcode } from "./eventRefMappings";
import { EventData, EventDataWithCount } from "./eventTypes";
import { getEventsFromEventRefCollection } from "./getEventsFromEventRefCollection";
import { sortEventsByStartDate } from "./sortEventsByStartDate";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsWithinRadius = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { zipcode, radius } = JSON.parse(request.body) as {
      zipcode: string;
      radius: number;
    };

    // Get Zip Codes within Radius
    getZipCodesWithinRadius(zipcode, radius)
      .then((zipcodes) => {
        const zipcodePromises = zipcodes.map(({ zip }) => {
          return firebaseApp.firestore().collection("zipcodes").doc(zip);
        });

        // Get Event Refs for Each Zip Code
        Promise.all(zipcodePromises)
          .then((values) => {
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

            // Get Events from Event Refs, and create a single array
            Promise.all(zipcodeEvents)
              .then((zipcodeEventsResults) => {
                const events: EventData[] = [];
                for (const zipcodeEventsResult of zipcodeEventsResults) {
                  if (zipcodeEventsResult) {
                    for (const event of zipcodeEventsResult) {
                      events.push(event as EventData);
                    }
                  }
                }

                // Gets the Volunteers for Each Event
                const eventVolunteerPromises = events.map((eventData) =>
                  getPublicProfilesFromUserRefCollection(
                    firebaseApp
                      .firestore()
                      .collection("events")
                      .doc(eventData.eventId)
                      .collection("volunteers")
                  )
                );

                Promise.all(eventVolunteerPromises)
                  .then((eventsVolunteers) => {
                    // Bind the events and the volunteers
                    const eventsWithVolunteers = events.map((event, index) => {
                      const eventVolunteers = eventsVolunteers[index];
                      return {
                        event: event,
                        volunteers: eventVolunteers
                          ? sortUsersByName(eventVolunteers)
                          : [],
                      };
                    });

                    // Filter out events that do not need any more volunteers
                    const eventsWithCount = eventsWithVolunteers.reduce(
                      (eventsWithCountTemp, { event, volunteers }) => {
                        if (volunteers.length !== event.volunteersNeeded) {
                          eventsWithCountTemp.push({
                            ...event,
                            volunteerCount: volunteers.length,
                          });
                        }
                        return eventsWithCountTemp;
                      },
                      [] as EventDataWithCount[]
                    );

                    // Sort the events by start date
                    const sortedEvents = sortEventsByStartDate(eventsWithCount);

                    // Remove events that have already happened
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

                    // Return events.
                    response
                      .status(200)
                      .send(JSON.stringify({ events: sortedEvents }));
                  })
                  .catch((err) => {
                    console.log(err);
                    response.status(500).send(null);
                  });
              })
              .catch((err) => {
                console.log(err);
                response.status(500).send(null);
              });
          })
          .catch((err) => {
            console.log(err);
            response.status(500).send(null);
          });
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(null);
      });
  }
);
