import {
  Checkbox,
  Fab,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment } from "react";
import { updateInterestsDatabase } from "../../../Scripts/firebaseProfileUpdates";
import { PageProps } from "../../Pages";
import categories from "../Categories";

const ViewEditUserInterests: React.FunctionComponent<PageProps> = ({
  currentUserProfile,
  setNotification,
  handleLoadUserData,
  setLoadingMessage,
  classes,
}) => {
  const [interests, setInterests] = React.useState<string[]>(
    currentUserProfile?.interests ? currentUserProfile.interests : []
  );
  const [editing, setEditing] = React.useState(!interests);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const cancelEditingInterests = () => {
    cancelEditing();
    setInterests(
      currentUserProfile?.interests ? currentUserProfile.interests : []
    );
  };

  const saveInterests = () => {
    if (currentUserProfile) {
      setLoadingMessage("Updating Interests...");
      updateInterestsDatabase(currentUserProfile.userId, interests)
        .then((value) => {
          if (value) {
            setNotification({
              type: "success",
              message: "Interests Updated Successfully!",
              open: true,
            });
            handleLoadUserData(currentUserProfile.userId);
            cancelEditing();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your interests. It should fix itself, but if your interestscode is not visiable after a few minutes, please try updating it again.",
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
              "Something may have gone wrong while updating your interests. It should fix itself, but if your interestscode is not visiable after a few minutes, please try updating it again.",
            open: true,
          });
          cancelEditing();
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message: "Unable to interests. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleUpdateInterests = (input: string) => {
    const newInterests = interests.concat([]);
    if (interests.includes(input)) {
      newInterests.splice(newInterests.indexOf(input), 1);
    } else {
      newInterests.push(input);
    }
    setInterests(newInterests.sort());
  };

  return (
    <Paper elevation={3} className={classes.marginedPadded}>
      <Typography variant="h4">Interests</Typography>
      <Typography variant="body1">
        This helps us list volunteer oportunities that are relevant to your
        interests. Feel free to select all that you might want to help with. You
        can also always adjust your interests from the filter on the volunteer
        page.
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
              <Grid container direction="column">
                {categories.map((val, index) => {
                  return (
                    <Grid item key={`Category ${index}`}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={interests.includes(val)}
                            onChange={() => {
                              handleUpdateInterests(val);
                            }}
                            name={val}
                            color="primary"
                          />
                        }
                        label={val}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveInterests();
                }}
                aria-label="save-interests"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingInterests();
                }}
                aria-label="cancel-edit-interests"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12} sm={10} md={11}>
              <Typography variant="h5">
                {interests.toString().replace(/,/g, ", ")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  startEditing();
                }}
                aria-label="edit-interests"
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

export default ViewEditUserInterests;
