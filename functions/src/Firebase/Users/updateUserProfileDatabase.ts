import {
  allSuccessful,
  allSuccessfulResponse,
} from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";
import {
  addEmailToUserIdMapping,
  removeEmailToUserIdMapping,
} from "./userInformationMappings";
import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateDisplayNameDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, newDisplayName } = JSON.parse(request.body) as {
      userId: string;
      newDisplayName: string;
    };

    allSuccessfulResponse(
      [updateDisplayNameDatabaseHelper(userId, newDisplayName)],
      response
    );
  }
);

/**
 * updateDisplayNameDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the display name is changed.
 * @param userId The userId of the user that is being updated.
 * @param newDisplayName The new display name to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateDisplayNameDatabaseHelper = (
  userId: string,
  newDisplayName: string
): Promise<boolean> => {
  const promises = [];

  // Update the display name in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ displayName: newDisplayName })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateEmailDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, oldEmail, newEmail } = JSON.parse(request.body) as {
      userId: string;
      oldEmail: string;
      newEmail: string;
    };

    allSuccessfulResponse(
      [updateEmailDatabaseHelper(userId, oldEmail, newEmail)],
      response
    );
  }
);

/**
 * updateEmailDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the email address is changed.
 * @param userId The userId of the user that is being updated.
 * @param oldDisplayName The previous email address (used to determine if a mapping needs to be removed).
 * @param newDisplayName The new email address to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateEmailDatabaseHelper = (
  userId: string,
  oldEmail: string,
  newEmail: string
): Promise<boolean> => {
  const promises = [];

  // Update the email address in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ email: newEmail })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  // If there was an old email address, remove the mapping to it
  if (oldEmail) {
    promises.push(removeEmailToUserIdMapping(oldEmail));
  }
  // If there is a new email address, create a new mapping for it
  if (newEmail) {
    promises.push(addEmailToUserIdMapping(newEmail, userId));
  }

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updatePhoneDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, newPhone } = JSON.parse(request.body) as {
      userId: string;
      newPhone: string;
    };

    allSuccessfulResponse(
      [updatePhoneDatabaseHelper(userId, newPhone)],
      response
    );
  }
);

/**
 * updatePhoneDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the phone numner is changed.
 * @param userId The userId of the user that is being updated.
 * @param newPhone The new phone number to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updatePhoneDatabaseHelper = (
  userId: string,
  newPhone: string
): Promise<boolean> => {
  const promises = [];

  // Update the phone number in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ phone: newPhone })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updatePhotoUrlDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, newPhotoUrl } = JSON.parse(request.body) as {
      userId: string;
      newPhotoUrl: string;
    };

    allSuccessfulResponse(
      [updatePhotoUrlDatabaseHelper(userId, newPhotoUrl)],
      response
    );
  }
);

/**
 * updatePhotoUrlDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the photoUrl is changed.
 * @param userId The userId of the user that is being updated.
 * @param newPhotoUrl The new photoUrl to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updatePhotoUrlDatabaseHelper = (
  userId: string,
  newPhotoUrl: string
): Promise<boolean> => {
  const promises = [];

  // Update the photoUrl in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ photoUrl: newPhotoUrl })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateZipcodeDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, newZipcode } = JSON.parse(request.body) as {
      userId: string;
      newZipcode: string;
    };

    allSuccessfulResponse(
      [updateZipcodeDatabaseHelper(userId, newZipcode)],
      response
    );
  }
);

/**
 * updateZipcodeDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the zipcode is changed.
 * @param userId The userId of the user that is being updated.
 * @param newZipcode The new zipcode to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateZipcodeDatabaseHelper = (
  userId: string,
  newZipcode: string
): Promise<boolean> => {
  const promises = [];

  // Update the zipcode in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ zipcode: newZipcode })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};
