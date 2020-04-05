import * as functions from "firebase-functions";
import firebaseApp from "../firebaseConfig";
import { getOrganizationProfile } from "../Organizations/getOrganizationProfile";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getUserProfileDatabaseObject = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const promise = firebaseApp
      .firestore()
      .collection("users")
      .doc(request.body)
      .get()
      .then((results) => {
        const data = results.data();
        if (data && data.userId === request.body) {
          console.log(data);
          response.status(200).send(
            JSON.stringify({
              userId: data.userId,
              displayName: data.displayName,
              email: data.email,
              phoneNumber: data.phone,
              photoURL: data.photoUrl,
              zipcode: data.zipcode,
            })
          );
        } else {
          console.log(
            "Either no data was returned, or the userId's do not match."
          );
          console.log("userId: " + request.body);
          console.log("data returned: " + data);
          response.status(500).send(null);
        }
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(null);
      });
    console.log(promise);
  }
);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getUserOrganizations = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const promise = firebaseApp
      .firestore()
      .collection("users")
      .doc(request.body)
      .collection("organizations")
      .get()
      .then((organizationSnapshot) => {
        const organizations = [];
        for (const organization of organizationSnapshot.docs) {
          const organizationData = organization.data();
          if (organization.data) {
            organizations.push(
              getOrganizationProfile(organizationData.organizationId)
            );
          }
        }
        const promises = Promise.all(organizations).then((results) => {
          const resultsData = [];
          for (const result of results) {
            if (result) {
              resultsData.push(result);
            }
          }
          response.status(200).send({ organizations: resultsData });
        });
        console.log(promises);
      });
    console.log(promise);
  }
);
