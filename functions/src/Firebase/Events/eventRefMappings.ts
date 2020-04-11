import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";

export const createEventMapInZipcode = (
  zipcode: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("zipcodes")
    .doc(zipcode)
    .collection("upcomingEvents")
    .doc(eventId)
    .set({ eventId })
    .then(() => true)
    .catch(logAndReturnFalse);
};

export const removeEventMapInZipcode = (
  zipcode: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("zipcodes")
    .doc(zipcode)
    .collection("upcomingEvents")
    .doc(eventId)
    .delete()
    .then(() => true)
    .catch(logAndReturnFalse);
};

export const createEventMapInOrganization = (
  organizationId: string,
  eventGroupId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("eventGroups")
    .doc(eventGroupId)
    .set({ eventGroupId })
    .then(() => true)
    .catch(logAndReturnFalse);
};

export const createEventMapInEventGroup = (
  eventGroupId: string,
  eventId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("eventGroups")
    .doc(eventGroupId)
    .collection("events")
    .doc(eventId)
    .set({ eventId })
    .then(() => true)
    .catch(logAndReturnFalse);
};
