import { Fab, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateZipcodeDatabase } from "../../../Scripts/firebaseProfileUpdates";
import { PageProps } from "../../Pages";

const ViewEditUserZipcode: React.FunctionComponent<PageProps> = ({
  currentUserProfile,
  setNotification,
  handleLoadUserData,
  classes,
}) => {
  const [zipcode, setZipcode] = React.useState<string>(
    currentUserProfile?.zipcode ? currentUserProfile.zipcode : ""
  );
  const [editing, setEditing] = React.useState(!zipcode);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingZipcode = () => {
    cancelEditing();
    setZipcode(currentUserProfile?.zipcode ? currentUserProfile.zipcode : "");
  };

  const saveZipcode = () => {
    if (currentUserProfile) {
      updateZipcodeDatabase(currentUserProfile.userId, zipcode)
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Zip Code Updated Successfully!",
              open: true,
            });
            handleLoadUserData(currentUserProfile.userId);
            cancelEditing();
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your zip code. It should fix itself, but if your new zip code is not visiable after a few minutes, please try updating it again.",
              open: true,
            });
            cancelEditing();
          }
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            type: "warning",
            message:
              "Something may have gone wrong while updating your zip code. It should fix itself, but if your new zip code is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
        });
    } else {
      setNotification({
        type: "error",
        message: "Unable to zip code. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Zip Code</Typography>
      <Typography variant="body1">
        This helps us list volunteer oportunities that are relevant to your
        area.
      </Typography>
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
                label="Enter Your Zip Code:"
                value={zipcode}
                onChange={handleZipcodeChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveZipcode();
                }}
                aria-label="save-zipcode"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingZipcode();
                }}
                aria-label="cancel-edit-zipcode"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">{zipcode}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-zipcode"
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

export default ViewEditUserZipcode;
