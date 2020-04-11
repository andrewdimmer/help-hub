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
  Paper,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { NotificationMessage } from "../Misc/Notifications";
import EditIcon from "@material-ui/icons/Edit";
import EventIcon from "@material-ui/icons/Event";
import DeleteIcon from "@material-ui/icons/Delete";
interface EventInfoProps {
  organizationData: any;
  setEventOrgId: Function;
  setEditOrganizationData: Function;
  setNotification: (notification: NotificationMessage) => void;
  classes: any;
}

const Organization: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  setEditOrganizationData,
  setEventOrgId,
  organizationData,
  classes,
}) => {
  return (
    <div className="App">
      <Container>
        <Paper className={classes.marginedPadded}>
          <ListItem
            alignItems="flex-start"
            key={organizationData.organizationId}
          >
            <ListItemAvatar>
              <Avatar
                alt={organizationData.organizationName}
                src={organizationData.photoUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Fragment>
                  <Typography variant="h5">
                    {organizationData.organizationName}
                  </Typography>
                </Fragment>
              }
              secondary={
                <Fragment>
                  <Typography component="span" variant="h6" color="textPrimary">
                    {organizationData.organizationDescription}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    <em>Phone: {organizationData.organizationPhone}</em>
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    <em>Email: {organizationData.organizationEmail}</em>
                  </Typography>
                </Fragment>
              }
            />
            <Fab
              color="primary"
              onClick={() => {
                // setNotification({
                //   type: "warning",
                //   message: "Under construction",
                //   open: true,
                // });
                setEditOrganizationData(organizationData);
              }}
              className={classes.margined}
            >
              <EditIcon></EditIcon>
            </Fab>
            <Fab
              color="primary"
              onClick={() => {
                // setNotification({
                //   type: "warning",
                //   message: "Under construction",
                //   open: true,
                // });
                setEventOrgId(organizationData.organizationId);
              }}
              className={classes.margined}
            >
              <EventIcon />
            </Fab>
            <Fab
              color="secondary"
              onClick={() => {
                setNotification({
                  type: "warning",
                  message: "Under construction",
                  open: true,
                });
              }}
              className={classes.margined}
            >
              <DeleteIcon></DeleteIcon>
            </Fab>
          </ListItem>
        </Paper>
      </Container>
    </div>
  );
};

export default Organization;
