import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateOrganizationNameDatabase } from "../../../Scripts/firebaseOrganizationUpdates";
import { PageProps } from "../../Pages";

declare interface ViewEditOrganizationInfoProps {
  currentOrganizationData: any;
  setNotification: any;
  handleLoadOrganizationData: any;
  setLoadingMessage: any;
  classes: any;
}

const ViewEditOrganizationName: React.FunctionComponent<ViewEditOrganizationInfoProps> = ({
  currentOrganizationData,
  setNotification,
  handleLoadOrganizationData,
  setLoadingMessage,
  classes,
}) => {
  const [organizationName, setOrganizationName] = React.useState<string>(
    currentOrganizationData?.organizationName
      ? currentOrganizationData.organizationName
      : ""
  );
  const [editing, setEditing] = React.useState(!organizationName);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingOrganizationName = () => {
    cancelEditing();
    setOrganizationName(
      currentOrganizationData?.organizationName
        ? currentOrganizationData.organizationName
        : ""
    );
  };

  const saveOrganizationName = () => {
    if (currentOrganizationData) {
      setLoadingMessage("Updating Organization Name...");
      updateOrganizationNameDatabase(
        currentOrganizationData.organizationId,
        organizationName
      )
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Organization Name Updated Successfully!",
              open: true,
            });
            handleLoadOrganizationData(currentOrganizationData.organizationId);
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your organization name. It should fix itself, but if your new organization name is not visiable after a few minutes, please try updating it again.",
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
              "Something may have gone wrong while updating your organization name. It should fix itself, but if your new organization name is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to organization name. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleOrganizationNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationName(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Organization Name</Typography>
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
                label="Enter Your Organization Name:"
                value={organizationName}
                onChange={handleOrganizationNameChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveOrganizationName();
                }}
                aria-label="save-organizationName"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingOrganizationName();
                }}
                aria-label="cancel-edit-organizationName"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{organizationName}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-organizationName"
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

export default ViewEditOrganizationName;
