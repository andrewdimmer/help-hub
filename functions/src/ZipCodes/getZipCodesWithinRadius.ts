import * as functions from "firebase-functions";
import firebaseApp from "../Firebase/firebaseConfig";
const ky = require("ky/umd"); // TODO: Replace ky with regular import once linting works on it again.

/**
 * getZipCodesWithinRadius50
 * @description Gets all zipcodes in a 50 mile radius of the given zipcode.
 * @param zipcode The zipcode in the center of the search area.
 * @returns A list of zipcodes and their distances from the given zipcode, or null if an error occured.
 */
export const getZipCodesWithinRadius50 = (
  zipcode: string,
  tries: number
): Promise<{ zip: string; distance: number }[] | null> => {
  if (tries < 2) {
    console.log("Attempt " + (tries + 1));
    const zipcodeRef = firebaseApp
      .firestore()
      .collection("zipcodes")
      .doc(zipcode);
    return zipcodeRef
      .get()
      .then(results => {
        const data = results.data();
        if (data) {
          console.log(data.zipcodes);
          return data.zipcodes;
        } else {
          console.log("Getting Zipcodes from Zipwise");
          return getZipCodesWithinRadius50Zipwise(zipcode)
            .then((zipcodes: any) => {
              if (zipcodes) {
                return zipcodeRef
                  .set({ zipcodes })
                  .then(() => getZipCodesWithinRadius50(zipcode, tries + 1))
                  .catch(err => {
                    console.log(err);
                    return null;
                  });
              } else {
                return new Promise((resolve, reject) => null);
              }
            })
            .catch((err: any) => {
              console.log(err);
              return null;
            });
        }
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  } else {
    return new Promise((resolve, reject) => null);
  }
};

export const getZipCodesWithinRadius50Zipwise = (zipcode: string) => {
  const apikey: string = functions.config().zipwise.apikey;
  return ky
    .get(
      `https://www.zipwise.com/webservices/radius.php?key=${apikey}&zip=${zipcode}&radius=50&format=json`
    )
    .then((response: any) => {
      return response
        .json()
        .then(
          (zipcodesRaw: { results: { zip: string; distance: string }[] }) => {
            return zipcodesRaw.results.map(({ zip, distance }) => {
              return { zip, distance: parseFloat(distance) };
            });
          }
        )
        .catch((err: any) => {
          console.log(err);
          return null;
        });
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
};
export const getZipCodesWithinRadius = (
  zipcode: string,
  radius: number
): Promise<{ zip: string; distance: number }[]> => {
  return getZipCodesWithinRadius50(zipcode, 0)
    .then(value => {
      if (value) {
        return value.reduce((zipArray, currentZip) => {
          if (currentZip.distance <= radius) {
            zipArray.push(currentZip);
          }
          return zipArray;
        }, [] as { zip: string; distance: number }[]);
      } else {
        return [] as { zip: string; distance: number }[];
      }
    })
    .catch(err => {
      console.log(err);
      return [] as { zip: string; distance: number }[];
    });
};
