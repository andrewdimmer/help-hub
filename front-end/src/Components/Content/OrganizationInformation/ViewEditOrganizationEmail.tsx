import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateOrganizationEmailDatabase } from "../../../Scripts/firebaseOrganizationUpdates";
import { PageProps } from "../../Pages";

declare interface ViewEditOrganizationInfoProps {
  currentOrganizationData: any;
  setNotification: any;
  handleLoadOrganizationData: any;
  setLoadingMessage: any;
  classes: any;
}

const ViewEditOrganizationEmail: React.FunctionComponent<ViewEditOrganizationInfoProps> = ({
  currentOrganizationData,
  setNotification,
  handleLoadOrganizationData,
  setLoadingMessage,
  classes,
}) => {
  const [organizationEmail, setOrganizationEmail] = React.useState<string>(
    currentOrganizationData?.organizationEmail
      ? currentOrganizationData.organizationEmail
      : ""
  );
  const [editing, setEditing] = React.useState(!organizationEmail);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingOrganizationEmail = () => {
    cancelEditing();
    setOrganizationEmail(
      currentOrganizationData?.organizationEmail
        ? currentOrganizationData.organizationEmail
        : ""
    );
  };

  const saveOrganizationEmail = () => {
    if (currentOrganizationData) {
      setLoadingMessage("Updating Organization Email...");
      updateOrganizationEmailDatabase(
        currentOrganizationData.organizationId,
        organizationEmail
      )
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Organization Email Updated Successfully!",
              open: true,
            });
            handleLoadOrganizationData(currentOrganizationData.organizationId);
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your organization email. It should fix itself, but if your new organization email is not visiable after a few minutes, please try updating it again.",
              open: true,
            });
            cancelEditing();
            setLoadingMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            type: "warning",
            message:
              "Something may have gone wrong while updating your organization email. It should fix itself, but if your new organization email is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to organization email. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleOrganizationEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationEmail(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Organization Email</Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.profileViewEditGrid}
      >
        {editing ? (
          <Fragment>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                fullWidth
                label="Enter Your Organization Email:"
                value={organizationEmail}
                onChange={handleOrganizationEmailChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveOrganizationEmail();
                }}
                aria-label="save-organizationEmail"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingOrganizationEmail();
                }}
                aria-label="cancel-edit-organizationEmail"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{organizationEmail}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-organizationEmail"
              >
                <EditIcon />
              </Fab>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Paper>
  );
};

export default ViewEditOrganizationEmail;
