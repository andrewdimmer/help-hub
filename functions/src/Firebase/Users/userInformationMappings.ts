import firebaseApp from "../firebaseConfig";

/**
 * ----------------------------------------
 * General Configuration
 * ----------------------------------------
 */
const mappingsDocument = firebaseApp
  .firestore()
  .collection("mappings")
  .doc("MAPPINGS");
const emailToUserIdMappings = mappingsDocument.collection("emailToUserId");

/**
 * ----------------------------------------
 * Use Mappings
 * ----------------------------------------
 */

/**
 * getEmailToUserIdMapping
 * @description Gets the userId associated with a given user email address.
 * @param email The email address to query with.
 * @returns The userId associated with the provided email address in the form {email: string, userId: string}.
 */
export const getEmailToUserIdMapping = (
  email: string
): Promise<firebase.firestore.DocumentData> => {
  return emailToUserIdMappings
    .doc(email)
    .get()
    .then(mappingDoc => {
      const data = mappingDoc.data();
      if (data) {
        return data;
      } else {
        throw new Error(`${email} exists in "emailToUserId" but has no data`);
      }
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Error getting ${email} in "emailToUserId"`);
    });
};

/**
 * ----------------------------------------
 * Add Mappings
 * ----------------------------------------
 */

/**
 * addEmailToUserIdMapping
 * @description Adds a new mapping between the given email address and userId.
 * @param email The email address to add a mapping for.
 * @param userId The userId to be associated with the the provided email address.
 * @returns true if there where no errors while adding the new mapping; false otherwise.
 */
export const addEmailToUserIdMapping = (
  email: string,
  userId: string
): Promise<boolean> => {
  return emailToUserIdMappings
    .doc(email)
    .set({ email, userId })
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error adding mapping between ${email} and ${userId} in "emailToUserId"`
      );
    });
};

/**
 * ----------------------------------------
 * Remove Mappings
 * ----------------------------------------
 */

/**
 * removeEmailToUserIdMapping
 * @description Removes the mapping associated with the given email address.
 * @param email The email address to remove the mapping for.
 * @returns true if there where no errors while removing the mapping; false otherwise.
 */
export const removeEmailToUserIdMapping = (email: string): Promise<boolean> => {
  return emailToUserIdMappings
    .doc(email)
    .delete()
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error removing the mapping associated with ${email} in "emailToUserId"`
      );
    });
};
