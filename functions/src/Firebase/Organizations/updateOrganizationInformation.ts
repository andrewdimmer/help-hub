import {
  allSuccessful,
  allSuccessfulResponse,
} from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";
import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateOrganizationName = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { organizationId, newOrganizationName } = JSON.parse(
      request.body
    ) as {
      organizationId: string;
      newOrganizationName: string;
    };

    allSuccessfulResponse(
      [updateOrganizationNameHelper(organizationId, newOrganizationName)],
      response
    );
  }
);

/**
 * updateOrganizationNameHelper
 * @description Updates the main Organization Object in the "organizations" collection, and all mappings in the database when the organization name is changed.
 * @param organizationId The organizationId of the organization that is being updated.
 * @param newOrganizationName The new organization name to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateOrganizationNameHelper = (
  organizationId: string,
  newOrganizationName: string
): Promise<boolean> => {
  const promises = [];

  // Update the organization name in the main Organization Object in the "organization" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .update({ organizationName: newOrganizationName })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateOrganizationDescription = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { organizationId, newOrganizationDescription } = JSON.parse(
      request.body
    ) as {
      organizationId: string;
      newOrganizationDescription: string;
    };

    allSuccessfulResponse(
      [
        updateOrganizationDescriptionHelper(
          organizationId,
          newOrganizationDescription
        ),
      ],
      response
    );
  }
);

/**
 * updateOrganizationDescriptionHelper
 * @description Updates the main Organization Object in the "organizations" collection, and all mappings in the database when the organization description is changed.
 * @param organizationId The organizationId of the organization that is being updated.
 * @param newOrganizationDescription The new organization description to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateOrganizationDescriptionHelper = (
  organizationId: string,
  newOrganizationDescription: string
): Promise<boolean> => {
  const promises = [];

  // Update the zipcode in the main Organization Object in the "organizations" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .update({ organizationDescription: newOrganizationDescription })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateOrganizationEmail = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { organizationId, newEmail } = JSON.parse(request.body) as {
      organizationId: string;
      newEmail: string;
    };

    allSuccessfulResponse(
      [updateOrganizationEmailHelper(organizationId, newEmail)],
      response
    );
  }
);

/**
 * updateOrganizationEmailHelper
 * @description Updates the main Organization Object in the "organizations" collection, and all mappings in the database when the email address is changed.
 * @param organizationId The organizationId of the organization that is being updated.
 * @param oldDisplayName The previous email address (used to determine if a mapping needs to be removed).
 * @param newDisplayName The new email address to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateOrganizationEmailHelper = (
  organizationId: string,
  newEmail: string
): Promise<boolean> => {
  const promises = [];

  // Update the email address in the main Organization Object in the "organizations" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .update({ email: newEmail })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateOrganizationPhone = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { organizationId, newPhone } = JSON.parse(request.body) as {
      organizationId: string;
      newPhone: string;
    };

    allSuccessfulResponse(
      [updateOrganizationPhoneHelper(organizationId, newPhone)],
      response
    );
  }
);

/**
 * updateOrganizationPhoneHelper
 * @description Updates the main Organization Object in the "organizations" collection, and all mappings in the database when the phone numner is changed.
 * @param organizationId The organizationId of the organization that is being updated.
 * @param newPhone The new phone number to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateOrganizationPhoneHelper = (
  organizationId: string,
  newPhone: string
): Promise<boolean> => {
  const promises = [];

  // Update the phone number in the main Organization Object in the "organizations" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .update({ phone: newPhone })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateOrganizationPhotoUrl = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { organizationId, newPhotoUrl } = JSON.parse(request.body) as {
      organizationId: string;
      newPhotoUrl: string;
    };

    allSuccessfulResponse(
      [updateOrganizationPhotoUrlHelper(organizationId, newPhotoUrl)],
      response
    );
  }
);

/**
 * updateOrganizationPhotoUrlHelper
 * @description Updates the main Organization Object in the "organizations" collection, and all mappings in the database when the photoUrl is changed.
 * @param organizationId The organizationId of the organization that is being updated.
 * @param newPhotoUrl The new photoUrl to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateOrganizationPhotoUrlHelper = (
  organizationId: string,
  newPhotoUrl: string
): Promise<boolean> => {
  const promises = [];

  // Update the photoUrl in the main Organization Object in the "organizations" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("organizations")
      .doc(organizationId)
      .update({ photoUrl: newPhotoUrl })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  return allSuccessful(promises);
};
