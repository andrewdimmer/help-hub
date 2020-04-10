import * as functions from "firebase-functions";
import { allSuccessfulResponse } from "../Helpers/allSuccessful";
import firebaseApp from "../Firebase/firebaseConfig";
import {
  getZipCodesWithinRadius50Zipwise,
  getZipCodesWithinRadius50
} from "./getZipCodesWithinRadius";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const testZipcodeFunctions = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    allSuccessfulResponse(
      [
        testNoDocExistsNoError(),
        testNoDocExistsNoData(),
        testGetZipCodesWithinRadius50Zipwise()
      ],
      response,
      "All test cases passed!",
      "One or more test cases failed."
    );
  }
);

// Should return true if there is no error while getting a doc that does not exist.
const testNoDocExistsNoError = () => {
  return firebaseApp
    .firestore()
    .collection("zipcodes")
    .doc("00000")
    .get()
    .then(() => true)
    .catch(() => false);
};

// Should return true if there is no data tied to the doc we are getting.
const testNoDocExistsNoData = () => {
  return firebaseApp
    .firestore()
    .collection("zipcodes")
    .doc("00000")
    .get()
    .then(results => {
      return !results.data();
    })
    .catch(() => false);
};

// Should return true if data other than null is returned.
const testGetZipCodesWithinRadius50Zipwise = () => {
  return getZipCodesWithinRadius50Zipwise("48346")
    .then((value: any) => !!value)
    .catch(() => false);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const testGetZipCodesWithinRadius50 = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const promise = getZipCodesWithinRadius50("48346", 0)
      .then((value: any) => response.status(200).send(value))
      .catch(err => {
        console.log(err);
        response.status(500).send(null);
      });
    console.log(promise);
  }
);
