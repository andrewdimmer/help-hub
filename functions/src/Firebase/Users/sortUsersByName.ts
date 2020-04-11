import { UserPublicProfile } from "./userTypes";

export const sortUsersByName = (
  users: UserPublicProfile[]
): UserPublicProfile[] => {
  if (users.length <= 1) {
    return users;
  }
  const leftArray = sortUsersByName(users.slice(0, users.length / 2));
  const rightArray = sortUsersByName(users.slice(users.length / 2));
  let sortedArray: UserPublicProfile[] = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0].displayName < rightArray[0].displayName) {
      const insertMe = leftArray.shift();
      if (insertMe) {
        sortedArray.push(insertMe);
      }
    } else {
      const insertMe = rightArray.shift();
      if (insertMe) {
        sortedArray.push(insertMe);
      }
    }
  }
  sortedArray = sortedArray.concat(leftArray);
  sortedArray = sortedArray.concat(rightArray);
  return sortedArray;
};
