import * as functions from "firebase-functions";
import { createNewEventGroup } from "./Firebase/Events/createNewEvents";
import { getEventsByOrganization } from "./Firebase/Events/getEventsByOrganization";
import { getEventsByUser } from "./Firebase/Events/getEventsByUser";
import { getEventsWithinRadius } from "./Firebase/Events/getEventsWithinRadius";
import { registerForEvent } from "./Firebase/Events/registerForEvent";
import { unregisterForEvent } from "./Firebase/Events/unregisterForEvent";
import { createNewOrganization } from "./Firebase/Organizations/createNewOrganization";
import { getOrganizationsByUser } from "./Firebase/Organizations/getOrganizationsByUser";
import {
  updateOrganizationDescription,
  updateOrganizationEmail,
  updateOrganizationName,
  updateOrganizationPhone,
  updateOrganizationPhotoUrl,
} from "./Firebase/Organizations/updateOrganizationInformation";
import { createNewUserDatabaseObjects } from "./Firebase/Users/createNewUser";
import { getUserProfileDatabaseObject } from "./Firebase/Users/getUserProfile";
import { testInformationMappings } from "./Firebase/Users/testInformationMappings";
import {
  updateDisplayNameDatabase,
  updateEmailDatabase,
  updateInterestsDatabase,
  updatePhoneDatabase,
  updatePhotoUrlDatabase,
  updateZipcodeDatabase,
} from "./Firebase/Users/updateUserProfileDatabase";
import {
  getGoogleCalendarAuthURL,
  getGoogleCalendarToken,
} from "./GoogleCalendar/authHandlers";
import {
  testGetZipCodesWithinRadius50,
  testZipcodeFunctions,
} from "./ZipCodes/testGetZipCodesWithinRadius";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Create New Users
export const create_new_user = createNewUserDatabaseObjects;

// Get User Profile Data
export const get_user_profile_database = getUserProfileDatabaseObject;

// Update Users
export const update_display_name_database = updateDisplayNameDatabase;
export const update_email_database = updateEmailDatabase;
export const update_phone_database = updatePhoneDatabase;
export const update_photo_url_database = updatePhotoUrlDatabase;
export const update_zipcode_database = updateZipcodeDatabase;
export const update_interests_database = updateInterestsDatabase;

// Create New Event Groups
export const create_new_event_group = createNewEventGroup;

// Get Events
export const get_events_within_radius = getEventsWithinRadius;
export const get_events_by_user = getEventsByUser;
export const get_events_by_organization = getEventsByOrganization;

// Register and Unregister for Events
export const register_for_event = registerForEvent;
export const unregister_for_event = unregisterForEvent;

// Create New Organization
export const create_new_organization = createNewOrganization;

// Get Organizations
export const get_organizations_by_user = getOrganizationsByUser;

// Update Organization Information
export const update_organization_name = updateOrganizationName;
export const update_organization_description = updateOrganizationDescription;
export const update_organization_email = updateOrganizationEmail;
export const update_organization_phone = updateOrganizationPhone;
export const update_organization_photo_url = updateOrganizationPhotoUrl;

// Google Calendar Authorization
export const get_google_calendar_auth_url = getGoogleCalendarAuthURL;
export const get_google_calendar_token = getGoogleCalendarToken;

// Unit Tests and Validation
export const test_information_mappings = testInformationMappings;
export const test_zipcode_functions = testZipcodeFunctions;
export const test_get_zip_codes_within_radius_50 = testGetZipCodesWithinRadius50;
