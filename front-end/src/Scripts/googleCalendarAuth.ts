import ky from "ky";

export function getGoogleCalendarAuthUrl(localhost: boolean): Promise<string> {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_google_calendar_auth_url",
      { body: JSON.stringify({ localhost }) }
    )
    .then((response) => {
      return response
        .text()
        .then((text) => {
          return text;
        })
        .catch((err) => {
          console.log(err);
          return "";
        });
    })
    .catch((err) => {
      return err;
    });
}

/**
 * getAuthToken
 * TODO: Add Documentation
 * @param oauthCode
 * @param userId
 * @param localhost
 */
export function getGoogleCalendarAuthToken(
  oauthCode: string,
  userId: string,
  localhost: boolean
): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-cathacksvi-gcp.cloudfunctions.net/get_google_calendar_token",
      { body: JSON.stringify({ localhost, oauthCode, userId }) }
    )
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });
}
