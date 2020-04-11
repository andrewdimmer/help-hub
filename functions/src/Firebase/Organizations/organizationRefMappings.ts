import { logAndReturnFalse } from "../../Helpers/logErrors";
import firebaseApp from "../firebaseConfig";

export const createUserToOrganizationMapping = (
  userId: string,
  organizationId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("organizations")
    .doc(organizationId)
    .set({ organizationId })
    .then(() => true)
    .catch(logAndReturnFalse);
};

export const createOrganizationToUserMapping = (
  userId: string,
  organizationId: string
): Promise<boolean> => {
  return firebaseApp
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("managers")
    .doc(userId)
    .set({ userId })
    .then(() => true)
    .catch(logAndReturnFalse);
};
