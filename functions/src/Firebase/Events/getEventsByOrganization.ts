import * as functions from "firebase-functions";
import firebaseApp from "../firebaseConfig";
import { getPublicProfilesFromUserRefCollection } from "../Users/getPublicProfilesFromUserRefCollection";
import { EventDataWithVolunteers } from "./eventTypes";
import { getEventsFromEventGrouopRefCollection } from "./getEventsFromEventGroupRefCollection";
import { sortEventsByStartDate } from "./sortEventsByStartDate";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsByOrganization = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const organizationId = request.body;
    // Get events for the organization
    const organizationEventRefs = firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .collection("eventGroups");
    getEventsFromEventGrouopRefCollection(organizationEventRefs)
      .then((events) => {
        if (events !== null) {
          // Gets the volunteers for each event
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
              const eventsWithVolunteers: EventDataWithVolunteers[] = events.map(
                (event, index) => {
                  const eventVolunteers = eventsVolunteers[index];
                  return {
                    ...event,
                    volunteers: eventVolunteers ? eventVolunteers : [],
                  };
                }
              );

              // Sort the events by start date
              const sortedEvents = sortEventsByStartDate(eventsWithVolunteers);

              // Return events.
              response
                .status(200)
                .send(JSON.stringify({ events: sortedEvents }));
            })
            .catch((err) => {
              console.log(err);
              response.status(500).send(null);
            });
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
