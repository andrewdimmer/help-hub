import firebaseApp from "../firebaseConfig";

export const getOrganizationProfile = (organizationId: string) => {
  return firebaseApp
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .get()
    .then(organization => {
      const organizationData = organization.data();
      return organizationData ? organizationData : null;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};
