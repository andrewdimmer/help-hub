import * as functions from "firebase-functions";
import { google } from "googleapis";
import firebaseApp from "../Firebase/firebaseConfig";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const getGoogleCalendarAuthURL = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const oauth2Client = getOauth2Client(request.body);

      const scopes = ["https://www.googleapis.com/auth/calendar.events"];

      const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "offline",

        // If you only need one scope you can pass it as a string
        scope: scopes,
      });
      response.status(200).send(url);
    } catch (err) {
      console.log(err);
      response
        .status(500)
        .send("Unable to get login URL at this time. Please try again later!");
    }
  }
);

/**
 * getToken
 * Gets an OAuth Token from an OAuth Code
 */
export const getGoogleCalendarToken = functions.https.onRequest(
  async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const oauth2Client = getOauth2Client(request.body);
      let oauthCode = "",
        userId = "";
      try {
        const parsed = JSON.parse(request.body);
        oauthCode = parsed.oauthCode;
        userId = parsed.userId;
      } catch (err) {
        console.log(err);
      }
      if (userId && oauthCode) {
        const { tokens } = await oauth2Client.getToken(oauthCode);
        const { refresh_token } = tokens;
        const userDoc = firebaseApp.firestore().collection("users").doc(userId);
        userDoc
          .update({
            googleCalendarAuthorized: true,
            googleCalendarRefreshToken: refresh_token,
          })
          .then(() => {
            response
              .status(200)
              .send("Google Calendar Authorized Successfully");
          })
          .catch((err) => {
            console.log(err);
            response
              .status(500)
              .send(
                "Error Saving Google Calendar Authorization. Please try again later!"
              );
          });
      } else {
        response
          .status(500)
          .send("Missing input parameters. Please try again later!");
      }
    } catch (err) {
      console.log(err);
      response
        .status(500)
        .send("Unable to get tokens at this time. Please try again later!");
    }
  }
);

export const getOauth2Client = (body?: string) => {
  let localhost = null;
  try {
    if (body) {
      localhost = JSON.parse(body).localhost;
    }
  } catch (err) {
    // console.log(err);
    localhost = null;
  }
  return new google.auth.OAuth2(
    functions.config().oauth.client_id,
    functions.config().oauth.client_secret,
    localhost
      ? "http://localhost:3000/auth"
      : "https://volunteerhere.online/auth"
  );
};
