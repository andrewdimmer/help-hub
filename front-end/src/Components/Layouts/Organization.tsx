import {
  Avatar,
  Container,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EventIcon from "@material-ui/icons/Event";
import React, { Fragment } from "react";
import { NotificationMessage } from "../Misc/Notifications";
import { OrganizationDataWithManagers } from "../../Scripts/firebaseOrganizationTypes";

declare interface EventInfoProps {
  organizationData: OrganizationDataWithManagers;
  setEditOrganizationId: (organizationId: string) => void;
  setEventOrganizationId: (organizationId: string) => void;
  setNotification: (notification: NotificationMessage) => void;
  classes: any;
}

const Organization: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  setEditOrganizationId,
  setEventOrganizationId,
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
              primary={organizationData.organizationName}
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    {organizationData.organizationDescription}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    <em>Phone: {organizationData.phone}</em>
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    <em>Email: {organizationData.email}</em>
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
                setEditOrganizationId(organizationData.organizationId);
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
                setEventOrganizationId(organizationData.organizationId);
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
