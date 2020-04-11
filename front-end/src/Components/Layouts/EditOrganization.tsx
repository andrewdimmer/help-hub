import {
  AppBar,
  Container,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { Fragment } from "react";
import { OrganizationDataWithManagers } from "../../Scripts/firebaseOrganizationTypes";
import ViewEditOrganizationDescription from "../Content/OrganizationInformation/ViewEditOrganizationDescription";
import ViewEditOrganizationEmail from "../Content/OrganizationInformation/ViewEditOrganizationEmail";
import ViewEditOrganizationName from "../Content/OrganizationInformation/ViewEditOrganizationName";
import ViewEditOrganizationPhone from "../Content/OrganizationInformation/ViewEditOrganizationPhone";
import ViewEditOrganizationPhoto from "../Content/OrganizationInformation/ViewEditOrganizationPhoto";
import { NotificationMessage } from "../Misc/Notifications";

declare interface EditOrganizationProps {
  setNotification: (notification: NotificationMessage) => void;
  currentOrganizationData: OrganizationDataWithManagers;
  currentOrganizationId: string;
  setCurrentOrganizationId: (organizationId: string) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  handleLoadOrganizationData: () => void;
  classes: any;
}

export declare interface ViewEditOrganizationInfoProps {
  currentOrganizationData: OrganizationDataWithManagers;
  setNotification: (notification: NotificationMessage) => void;

  handleLoadOrganizationData: () => void;
  setLoadingMessage: (loadingMessage: string) => void;
  classes: any;
}

const EditOrganization: React.FunctionComponent<EditOrganizationProps> = ({
  setNotification,
  currentOrganizationData,
  currentOrganizationId,
  setCurrentOrganizationId,
  setLoadingMessage,
  handleLoadOrganizationData,
  classes,
}) => {
  const handleClose = () => {
    setCurrentOrganizationId("");
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={currentOrganizationId.length > 0}
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
        <Container className={classes.marginedPadded}>.</Container>
        <Container className={classes.pageTitle}>
          <Typography variant="h3">Organization Information</Typography>
        </Container>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <ViewEditOrganizationPhoto
                currentOrganizationData={currentOrganizationData}
                setNotification={setNotification}
                handleLoadOrganizationData={handleLoadOrganizationData}
                setLoadingMessage={setLoadingMessage}
                classes={classes}
              />
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
