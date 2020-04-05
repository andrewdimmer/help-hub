import { Container, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import ViewEditUserDisplayName from "../Content/ProfileInformation/ViewEditUserDisplayName";
import ViewEditUserEmail from "../Content/ProfileInformation/ViewEditUserEmail";
import ViewEditUserPassword from "../Content/ProfileInformation/ViewEditUserPassword";
import ViewEditUserPhone from "../Content/ProfileInformation/ViewEditUserPhone";
import ViewEditUserPhoto from "../Content/ProfileInformation/ViewEditUserPhoto";
import ViewEditUserZipcode from "../Content/ProfileInformation/ViewEditUserZipcode";

const ProfilePage: React.FunctionComponent<PageProps> = ({
  currentUser,
  currentUserProfile,
  setPageKey,
  setNotification,
  setLoadingMessage,
  forceReloadUserData,
  handleLoadUserData,
  classes,
  events,
  setEvents,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3" id="profileTourStep1">
          Profile
        </Typography>
      </Container>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4} lg={3} id="profileTourStep10">
          <ViewEditUserPhoto
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <ViewEditUserDisplayName
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
          <ViewEditUserEmail
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
          <ViewEditUserPhone
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
          <ViewEditUserPassword
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
          <ViewEditUserZipcode
            currentUser={currentUser}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
            events={events}
            setEvents={setEvents}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfilePage;
