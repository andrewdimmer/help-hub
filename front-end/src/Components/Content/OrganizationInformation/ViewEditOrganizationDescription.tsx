import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateOrganizationDescriptionDatabase } from "../../../Scripts/firebaseOrganizationUpdates";
import { PageProps } from "../../Pages";

declare interface ViewEditOrganizationInfoProps {
  currentOrganizationData: any;
  setNotification: any;
  handleLoadOrganizationData: any;
  setLoadingMessage: any;
  classes: any;
}

const ViewEditOrganizationDescription: React.FunctionComponent<ViewEditOrganizationInfoProps> = ({
  currentOrganizationData,
  setNotification,
  handleLoadOrganizationData,
  setLoadingMessage,
  classes,
}) => {
  const [organizationDescription, setOrganizationDescription] = React.useState<
    string
  >(
    currentOrganizationData?.organizationDescription
      ? currentOrganizationData.organizationDescription
      : ""
  );
  const [editing, setEditing] = React.useState(!organizationDescription);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingOrganizationDescription = () => {
    cancelEditing();
    setOrganizationDescription(
      currentOrganizationData?.organizationDescription
        ? currentOrganizationData.organizationDescription
        : ""
    );
  };

  const saveOrganizationDescription = () => {
    if (currentOrganizationData) {
      setLoadingMessage("Updating Organization Description...");
      updateOrganizationDescriptionDatabase(
        currentOrganizationData.organizationId,
        organizationDescription
      )
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Organization Description Updated Successfully!",
              open: true,
            });
            handleLoadOrganizationData(currentOrganizationData.organizationId);
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your organization description. It should fix itself, but if your new organization description is not visiable after a few minutes, please try updating it again.",
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
              "Something may have gone wrong while updating your organization description. It should fix itself, but if your new organization description is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to organization description. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleOrganizationDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationDescription(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Organization Description</Typography>
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
                label="Enter Your Organization Description:"
                value={organizationDescription}
                onChange={handleOrganizationDescriptionChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveOrganizationDescription();
                }}
                aria-label="save-organizationDescription"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingOrganizationDescription();
                }}
                aria-label="cancel-edit-organizationDescription"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{organizationDescription}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-organizationDescription"
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

export default ViewEditOrganizationDescription;
