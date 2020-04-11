import { OrganizationData } from "./organizationTypes";

export const sortOrganizationsByName = (
  organizations: OrganizationData[]
): OrganizationData[] => {
  if (organizations.length <= 1) {
    return organizations;
  }
  const leftArray = sortOrganizationsByName(
    organizations.slice(0, organizations.length / 2)
  );
  const rightArray = sortOrganizationsByName(
    organizations.slice(organizations.length / 2)
  );
  let sortedArray: OrganizationData[] = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0].organizationName < rightArray[0].organizationName) {
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
