import firebaseApp from "../firebaseConfig";
import { EventData } from "./eventTypes";
import { getEventsFromEventRefCollection } from "./getEventsFromEventRefCollection";

export const getEventsFromEventGrouopRefCollection = (
  startingRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >
): Promise<EventData[] | null> => {
  console.log("Getting Events from eventGroupRef");
  return startingRef
    .get()
    .then((eventGroupRefs) => {
      console.log("Have event group refs");
      console.log(eventGroupRefs.docs);
      const eventsPromises: Promise<EventData[] | null>[] = [];
      for (const eventGroupRef of eventGroupRefs.docs) {
        const eventGroupRefData = eventGroupRef.data();
        console.log("event group ref data");
        console.log(eventGroupRefData);
        if (eventGroupRefData) {
          console.log(
            "Getting events from eventGroupId: " +
              eventGroupRefData.eventGroupId
          );
          eventsPromises.push(
            getEventsFromEventRefCollection(
              firebaseApp
                .firestore()
                .collection("eventGroups")
                .doc(eventGroupRefData.eventGroupId)
                .collection("events")
            )
          );
        }
      }

      return Promise.all(eventsPromises).then((eventResults) => {
        const eventResultsClean: EventData[] = [];
        for (const eventResult of eventResults) {
          if (eventResult) {
            for (const event of eventResult) {
              console.log("Found event with eventId: " + event.eventId);
              eventResultsClean.push(event);
            }
          }
        }
        return eventResultsClean;
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
