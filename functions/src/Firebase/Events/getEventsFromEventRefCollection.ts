import firebaseApp from "../firebaseConfig";
import { EventData } from "./eventTypes";

export const getEventsFromEventRefCollection = (
  startingRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >
): Promise<EventData[] | null> => {
  return startingRef
    .get()
    .then((eventRefs) => {
      const events: Array<firebase.firestore.DocumentData | null> = [];
      for (const eventRef of eventRefs.docs) {
        const eventRefData = eventRef.data();
        if (eventRefData) {
          events.push(
            firebaseApp
              .firestore()
              .collection("events")
              .doc(eventRefData.eventId)
              .get()
              .then((event) => {
                const eventData = event.data();
                if (eventData) {
                  return eventData;
                } else {
                  return null;
                }
              })
              .catch((err) => {
                console.log(err);
                return null;
              })
          );
        }
      }

      return Promise.all(events).then((eventResults) => {
        const eventResultsClean: EventData[] = [];
        for (const eventResult of eventResults) {
          if (eventResult) {
            eventResultsClean.push(eventResult as EventData);
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
