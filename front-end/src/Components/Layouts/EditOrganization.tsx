import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Fab,
  makeStyles,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  List,
  Divider,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { NotificationMessage } from "../Misc/Notifications";
import EditIcon from "@material-ui/icons/Edit";
import classes from "*.module.css";
import CloseIcon from "@material-ui/icons/Close";
import ViewEditOrganizationDescription from "../Content/OrganizationInformation/ViewEditOrganizationDescription";
import ViewEditOrganizationEmail from "../Content/OrganizationInformation/ViewEditOrganizationEmail";
import ViewEditOrganizationPhone from "../Content/OrganizationInformation/ViewEditOrganizationPhone";
import ViewEditOrganizationPhoto from "../Content/OrganizationInformation/ViewEditOrganizationPhoto";
import ViewEditOrganizationName from "../Content/OrganizationInformation/ViewEditOrganizationName";
interface EventInfoProps {
  setNotification: (notification: NotificationMessage) => void;
  currentOrganizationData: any;
  setCurrentOrganizationData: any;
  setLoadingMessage: any;
  handleLoadOrganizationData: any;
  classes: any;
}

const EditOrganization: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  currentOrganizationData,
  setCurrentOrganizationData,
  setLoadingMessage,
  handleLoadOrganizationData,
  classes,
}) => {
  const handleClose = () => {
    setCurrentOrganizationData(null);
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={currentOrganizationData !== null}
        onClose={handleClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit organization
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.pageTitle}>
          <Typography variant="h3">Organization Information</Typography>
        </Container>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              {/* <ViewEditOrganizationPhoto
            currentOrganizationData={currentOrganizationData}
            currentUserProfile={currentUserProfile}
            forceReloadUserData={forceReloadUserData}
            handleLoadUserData={handleLoadUserData}
            setPageKey={setPageKey}
            setLoadingMessage={setLoadingMessage}
            setNotification={setNotification}
            classes={classes}
          /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <ViewEditOrganizationName
                currentOrganizationData={currentOrganizationData}
                setNotification={setNotification}
                handleLoadOrganizationData={handleLoadOrganizationData}
                setLoadingMessage={setLoadingMessage}
                classes={classes}
              />
              <ViewEditOrganizationDescription
                currentOrganizationData={currentOrganizationData}
                setNotification={setNotification}
                handleLoadOrganizationData={handleLoadOrganizationData}
                setLoadingMessage={setLoadingMessage}
                classes={classes}
              />
              <ViewEditOrganizationEmail
                currentOrganizationData={currentOrganizationData}
                setNotification={setNotification}
                handleLoadOrganizationData={handleLoadOrganizationData}
                setLoadingMessage={setLoadingMessage}
                classes={classes}
              />
              <ViewEditOrganizationPhone
                currentOrganizationData={currentOrganizationData}
                setNotification={setNotification}
                handleLoadOrganizationData={handleLoadOrganizationData}
                setLoadingMessage={setLoadingMessage}
                classes={classes}
              />
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </Fragment>
  );
};

export default EditOrganization;
