import ky from "ky";
import { UserProfile } from "./firebaseUserTypes";

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
