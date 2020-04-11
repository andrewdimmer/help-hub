import { Button, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { getGoogleCalendarAuthUrl } from "../../../Scripts/googleCalendarAuth";
import { PageProps } from "../../Pages";

const ViewEditUserGoogleCalendarAuth: React.FunctionComponent<PageProps> = ({
  currentUserProfile,
  setNotification,
  handleLoadUserData,
  setLoadingMessage,
  classes,
}) => {
  /**
   * handleAuth
   * Gets the Google OAuth URL for a user to login and authorize access to Google Calendar.
   * Precondition: User must be logged in.
   * Note: Redirects the user off site, when the come back must resume state.
   */
  const handleAuth = () => {
    if (currentUserProfile) {
      setLoadingMessage("Getting Auth URL...");
      window.localStorage.setItem("userId", currentUserProfile.userId);
      getGoogleCalendarAuthUrl(window.location.href.indexOf("localhost") >= 0)
        .then((url) => {
          window.open(url, "_self");
        })
        .catch((err) => {
          console.log(err);
          setLoadingMessage("");
          setNotification({
            message: "Unable to get authorization url. Please try again later!",
            type: "error",
            open: true,
          });
        });
    } else {
      console.log(
        "User must be logged in before authorizing access to Google Calendar. (This error should never be thrown)"
      );
      setNotification({
        message:
          "Unable to authorize access to Google Calendar without being logged in.",
        type: "warning",
        open: true,
      });
    }
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Authorize Google Calendar</Typography>
      <Typography variant="body1">
        This allows Volunteer Here to automatically add events you sign up for
        to your Google Calendar, and detect time conflicts before you sign up.
      </Typography>
      <Container className={classes.pageTitle}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.margined}
          disabled={currentUserProfile?.googleCalendarAuthorized}
          onClick={handleAuth}
        >
          <Typography variant="h5">Authorize Google Calendar</Typography>
        </Button>
        {currentUserProfile?.googleCalendarAuthorized && (
          <Typography variant="body1">
            You have already authorized Google Calendar.
          </Typography>
        )}
      </Container>
    </Paper>
  );
};

export default ViewEditUserGoogleCalendarAuth;
