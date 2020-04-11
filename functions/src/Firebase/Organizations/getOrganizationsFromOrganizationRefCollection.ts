import firebaseApp from "../firebaseConfig";
import { OrganizationData } from "./organizationTypes";

export const getOrganizationsFromOrganizationRefCollection = (
  startingRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >
): Promise<OrganizationData[] | null> => {
  return startingRef
    .get()
    .then((organizationRefs) => {
      const organizations: Array<firebase.firestore.DocumentData | null> = [];
      for (const organizationRef of organizationRefs.docs) {
        const organizationRefData = organizationRef.data();
        if (organizationRefData) {
          organizations.push(
            firebaseApp
              .firestore()
              .collection("organizations")
              .doc(organizationRefData.organizationId)
              .get()
              .then((organization) => {
                const organizationData = organization.data();
                if (organizationData) {
                  return organizationData;
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

      return Promise.all(organizations).then((organizationResults) => {
        const organizationResultsClean: OrganizationData[] = [];
        for (const organizationResult of organizationResults) {
          if (organizationResult) {
            organizationResultsClean.push(
              organizationResult as OrganizationData
            );
          }
        }
        return organizationResultsClean;
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
