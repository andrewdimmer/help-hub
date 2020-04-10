import * as functions from "firebase-functions";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";
import {
  EventData,
  EventGroupData,
  CreateNewEventGroupFunctionInput,
} from "./eventTypes";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import {
  createEventMapInZipcode,
  createEventMapInOrganization,
} from "./eventRefMappings";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const createNewEventGroup = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const createEventInputData = JSON.parse(
      request.body
    ) as CreateNewEventGroupFunctionInput;

    const promises = [];

    // Create Event Group
    promises.push(
      createEventGroup({
        organizationId: createEventInputData.organizationId,
        eventGroupId: createEventInputData.eventGroupId,
        eventName: createEventInputData.eventName,
        eventDescription: createEventInputData.eventDescription,
        eventContactInfo: createEventInputData.eventContactInfo,
        events: createEventInputData.events.map(
          (eventDetails) => eventDetails.eventId
        ),
        categories: createEventInputData.categories,
      })
    );

    // Create Event Group Mapping in Organization
    promises.push(
      createEventMapInOrganization(
        createEventInputData.organizationId,
        createEventInputData.eventGroupId
      )
    );

    // Create Events
    for (const event of createEventInputData.events) {
      // Create Event Itself
      promises.push(
        createEvent({
          eventId: event.eventId,
          organizationId: createEventInputData.organizationId,
          eventGroupId: createEventInputData.eventGroupId,
          eventName: createEventInputData.eventName,
          eventDescription: createEventInputData.eventDescription,
          eventContactInfo: createEventInputData.eventContactInfo,
          startDate: event.startDate,
          startTime: event.startTime,
          endDate: event.endDate,
          endTime: event.endTime,
          address: event.address,
          city: event.city,
          state: event.state,
          zip: event.zip,
          volunteersNeeded: event.volunteersNeeded,
          categories: createEventInputData.categories,
        })
      );

      // Create Event Mapping in the Specified Zip Code's Upcoming Events
      promises.push(createEventMapInZipcode(event.zip, event.eventId));
    }

    allSuccessfulResponse(promises, response);
  }
);

const createEventGroup = (eventGroupData: EventGroupData) => {
  return firebaseApp
    .firestore()
    .collection("eventGroups")
    .doc(eventGroupData.eventGroupId)
    .set(eventGroupData)
    .then(() => true)
    .catch(logAndReturnFalse);
};

const createEvent = (eventData: EventData): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("events")
    .doc(eventData.eventId)
    .set(eventData)
    .then(() => true)
    .catch(logAndReturnFalse);
};
