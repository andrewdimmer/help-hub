import * as functions from "firebase-functions";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";
import {
  createOrganizationToUserMapping,
  createUserToOrganizationMapping,
} from "./organizationRefMappings";
import { OrganizationData } from "./organizationTypes";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const createNewOrganization = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, organizationData } = JSON.parse(request.body) as {
      userId: string;
      organizationData: OrganizationData;
    };

    const promises = [];
    // Add the new user's object in the "users" collection
    promises.push(createNewOrganizationOrganizationObject(organizationData));

    // Create any mappings that might exist for this new organization
    promises.push(
      createUserToOrganizationMapping(userId, organizationData.organizationId)
    );
    promises.push(
      createOrganizationToUserMapping(userId, organizationData.organizationId)
    );

    allSuccessfulResponse(promises, response);
  }
);

/**
 * createNewOrganizationOrganizationObject
 * @description Creates a new object in the "organizations" collection for the organization described by the information given in the input.
 * @param organizationData The information about the organization to save
 * @returns true if the new user was created in the database without any errors; false otherwise.
 */
const createNewOrganizationOrganizationObject = (
  organizationData: OrganizationData
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("organizations")
    .doc(organizationData.organizationId)
    .set(organizationData)
    .then(() => true)
    .catch(logAndReturnFalse);
};
