import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateOrganizationPhoneDatabase } from "../../../Scripts/firebaseOrganizationUpdates";
import { ViewEditOrganizationInfoProps } from "../../Layouts/EditOrganization";

const ViewEditOrganizationPhone: React.FunctionComponent<ViewEditOrganizationInfoProps> = ({
  currentOrganizationData,
  setNotification,
  handleLoadOrganizationData,
  setLoadingMessage,
  classes,
}) => {
  const [organizationPhone, setOrganizationPhone] = React.useState<string>(
    currentOrganizationData?.phone ? currentOrganizationData.phone : ""
  );
  const [editing, setEditing] = React.useState(!organizationPhone);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingOrganizationPhone = () => {
    cancelEditing();
    setOrganizationPhone(
      currentOrganizationData?.phone ? currentOrganizationData.phone : ""
    );
  };

  const saveOrganizationPhone = () => {
    if (currentOrganizationData) {
      setLoadingMessage("Updating Organization Phone...");
      updateOrganizationPhoneDatabase(
        currentOrganizationData.organizationId,
        organizationPhone
      )
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Organization Phone Updated Successfully!",
              open: true,
            });
            handleLoadOrganizationData();
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your organization phone. It should fix itself, but if your new organization phone is not visiable after a few minutes, please try updating it again.",
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
              "Something may have gone wrong while updating your organization phone. It should fix itself, but if your new organization phone is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to organization phone. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleOrganizationPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationPhone(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Organization Phone</Typography>
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
                label="Enter Your Organization Phone:"
                value={organizationPhone}
                onChange={handleOrganizationPhoneChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveOrganizationPhone();
                }}
                aria-label="save-organizationPhone"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingOrganizationPhone();
                }}
                aria-label="cancel-edit-organizationPhone"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{organizationPhone}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-organizationPhone"
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

export default ViewEditOrganizationPhone;
