import * as functions from "firebase-functions";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";
import { addEmailToUserIdMapping } from "./userInformationMappings";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const createNewUserDatabaseObjects = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const {
      userId,
      displayName,
      email,
      phone,
      photoUrl,
      zipcode,
      interests,
    } = JSON.parse(request.body) as {
      userId: string;
      displayName: string;
      email: string;
      phone: string;
      photoUrl: string;
      zipcode: string;
      interests: string[];
    };

    const promises = [];
    // Add the new user's object in the "users" collection
    promises.push(
      createNewUserUserObject(
        userId,
        displayName,
        email,
        phone,
        photoUrl,
        zipcode,
        interests
      )
    );

    // Create any mappings that might exist for this new user
    if (email) {
      promises.push(addEmailToUserIdMapping(email, userId));
    }

    allSuccessfulResponse(promises, response);
  }
);

/**
 * createNewUserUserObject
 * @description Creates a new object in the "users" collection for the user described by the information given in the input.
 * @param userId The userId of the new user.
 * @param displayName The displayName of the new user.
 * @param email The email address of the new user.
 * @param phone The phone number of the new user.
 * @param photoUrl The profile picture photoUrl of the new user.
 * @param zipcode The zip code of the user
 * @param interests An array of interests of the user
 * @returns true if the new user was created in the database without any errors; false otherwise.
 */
const createNewUserUserObject = (
  userId: string,
  displayName: string,
  email: string,
  phone: string,
  photoUrl: string,
  zipcode: string,
  interests: string[]
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .set({ userId, displayName, email, phone, photoUrl, zipcode, interests })
    .then(() => true)
    .catch(logAndReturnFalse);
};

/**
 * createNewUserSubcollection
 * @description Create a new subcollection inside of the specified user with a placeholder document.
 * @param userId The userId of the user to add the subcollection for.
 * @param subcollectionName The name of the subcollection to be added.
 * @returns true if the subcollection was created without any errors; false otherwise.
 */
/* const createNewUserSubcollection = (
  userId: string,
  subcollectionName: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .collection(subcollectionName)
    .doc("PLACEHOLDER")
    .set({ PLACEHOLDER: "PLACEHOLDER" })
    .then(() => {
      return true;
    })
    .catch(logAndReturnFalse);
};
*/
