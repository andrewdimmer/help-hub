import * as functions from "firebase-functions";
import { createNewUserDatabaseObjects } from "./Firebase/Users/createNewUser";
import { testInformationMappings } from "./Firebase/Users/testInformationMappings";
import {
  updateDisplayNameDatabase,
  updateEmailDatabase,
  updatePhoneDatabase,
  updatePhotoUrlDatabase,
  updateZipcodeDatabase,
} from "./Firebase/Users/updateUserProfileDatabase";
import { getUserProfileDatabaseObject } from "./Firebase/Users/getUserProfile";
import {
  testZipcodeFunctions,
  testGetZipCodesWithinRadius50,
} from "./ZipCodes/testGetZipCodesWithinRadius";
import { getEventsWithinRadius } from "./Firebase/Events/getEventsWithinRadius";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Create New Users
export const create_new_user = createNewUserDatabaseObjects;

// Update Users
export const update_display_name_database = updateDisplayNameDatabase;
export const update_email_database = updateEmailDatabase;
export const update_phone_database = updatePhoneDatabase;
export const update_photo_url_database = updatePhotoUrlDatabase;
export const update_zipcode_database = updateZipcodeDatabase;

// Get User Profile Data
export const get_user_profile_database = getUserProfileDatabaseObject;

// Get events within a given radius
export const get_events_within_radius = getEventsWithinRadius;

// Unit Tests and Validation
export const test_information_mappings = testInformationMappings;
export const test_zipcode_functions = testZipcodeFunctions;
export const test_get_zip_codes_within_radius_50 = testGetZipCodesWithinRadius50;
