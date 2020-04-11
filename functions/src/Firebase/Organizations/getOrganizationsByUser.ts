import * as functions from "firebase-functions";
import firebaseApp from "../firebaseConfig";
import { getPublicProfilesFromUserRefCollection } from "../Users/getPublicProfilesFromUserRefCollection";
import { getOrganizationsFromOrganizationRefCollection } from "./getOrganizationsFromOrganizationRefCollection";
import { OrganizationDataWithManagers } from "./organizationTypes";
import { sortOrganizationsByName } from "./sortOrganizationsByName";
import { sortUsersByName } from "../Users/sortUsersByName";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getEventsByUser = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const userId = request.body;
    // Get Organizations
    const userEventRefs = firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("organizations");
    getOrganizationsFromOrganizationRefCollection(userEventRefs)
      .then((organizations) => {
        if (organizations !== null) {
          // Get managers of each organization
          const managerPromises = organizations.map((organization) =>
            getPublicProfilesFromUserRefCollection(
              firebaseApp
                .firestore()
                .collection("organizations")
                .doc(organization.organizationId)
                .collection("managers")
            )
          );

          Promise.all(managerPromises)
            .then((organizationsManagers) => {
              const organizationsWithManagers: OrganizationDataWithManagers[] = organizations.map(
                (organization, index) => {
                  const organizationManagers = organizationsManagers[index];
                  return {
                    ...organization,
                    managers: organizationManagers
                      ? sortUsersByName(organizationManagers)
                      : [],
                  };
                }
              );
              response.status(200).send(
                JSON.stringify({
                  organizations: sortOrganizationsByName(
                    organizationsWithManagers
                  ),
                })
              );
            })
            .catch((err) => {
              console.log(err);
              response.status(500).send(null);
            });
        } else {
          response.status(200).send(JSON.stringify({ organizations: [] }));
        }
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(null);
      });
  }
);
