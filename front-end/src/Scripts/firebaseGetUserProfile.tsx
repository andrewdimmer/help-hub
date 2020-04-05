import ky from "ky";

export declare interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  zipcode: string;
}

export const getUserProfileDatabase = (
  userId: string
): Promise<UserProfile | null> => {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_user_profile_database",
      {
        body: userId,
      }
    )
    .then((results) =>
      results
        .json()
        .then((json) => json)
        .catch((err) => {
          console.log(err);
          return null;
        })
    )
    .catch((err) => {
      console.log(err);
      return null;
    });
};
