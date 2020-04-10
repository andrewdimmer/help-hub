import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updatePhoneDatabase } from "../../../Scripts/firebaseProfileUpdates";
import { PageProps } from "../../Pages";

const ViewEditUserPhone: React.FunctionComponent<PageProps> = ({
  currentUserProfile,
  setNotification,
  handleLoadUserData,
  setLoadingMessage,
  classes,
}) => {
  const [phone, setPhone] = React.useState<string>(
    currentUserProfile?.phoneNumber ? currentUserProfile.phoneNumber : ""
  );
  const [editing, setEditing] = React.useState(!phone);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingPhone = () => {
    cancelEditing();
    setPhone(
      currentUserProfile?.phoneNumber ? currentUserProfile.phoneNumber : ""
    );
  };

  const savePhone = () => {
    if (currentUserProfile) {
      setLoadingMessage("Updating Phone Number...");
      updatePhoneDatabase(currentUserProfile.userId, phone)
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Phone Number Updated Successfully!",
              open: true,
            });
            handleLoadUserData(currentUserProfile.userId);
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your phone number. It should fix itself, but if your new phone number is not visiable after a few minutes, please try updating it again.",
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
              "Something may have gone wrong while updating your phone number. It should fix itself, but if your new phone number is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to update phone number. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Phone Number</Typography>
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
                label="Enter Your Phone Number:"
                value={phone}
                onChange={handlePhoneChange}
                helperText="Please enter a valid phone number including the country code."
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  savePhone();
                }}
                aria-label="save-phone"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingPhone();
                }}
                aria-label="cancel-edit-phone"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-phone"
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

export default ViewEditUserPhone;
