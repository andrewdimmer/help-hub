import firebaseApp from "../firebaseConfig";
import { UserPublicProfile } from "./userTypes";

export const getPublicProfilesFromUserRefCollection = (
  startingRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >
): Promise<UserPublicProfile[] | null> => {
  return startingRef
    .get()
    .then((userRefs) => {
      const users: Array<firebase.firestore.DocumentData | null> = [];
      for (const userRef of userRefs.docs) {
        const userRefData = userRef.data();
        if (userRefData) {
          users.push(
            firebaseApp
              .firestore()
              .collection("users")
              .doc(userRefData.userId)
              .get()
              .then((user) => {
                const userData = user.data();
                if (userData) {
                  return userData;
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

      return Promise.all(users).then((userResults) => {
        const userResultsClean: UserPublicProfile[] = [];
        for (const userResult of userResults) {
          if (userResult) {
            userResultsClean.push({
              userId: userResult.userId,
              displayName: userResult.displayName,
              email: userResult.email,
              phoneNumber: userResult.phone,
              photoURL: userResult.photoUrl,
            });
          }
        }
        return userResultsClean;
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
