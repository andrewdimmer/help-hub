import firebaseApp from "../firebaseConfig";

export const getEventsFromCollection = (
  startingRef: firebase.firestore.DocumentData
): Promise<Array<firebase.firestore.DocumentData> | null> => {
  return startingRef
    .collection("events")
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
        const eventResultsClean: Array<firebase.firestore.DocumentData> = [];
        for (const eventResult of eventResults) {
          if (eventResult) {
            eventResultsClean.push(eventResult);
          }
        }
        return eventResultsClean;
      });
    });
};
