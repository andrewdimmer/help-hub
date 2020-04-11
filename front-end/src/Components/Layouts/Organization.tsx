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
  key: string;
  setEventOrgId: Function;
  setEditOrganizationData: Function;
  setNotification: (notification: NotificationMessage) => void;
  classes: any;
}

const useStyles = makeStyles({
  spaceLeft: {
    marginLeft: "10px",
  },
});

const Organization: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  key,
  setEditOrganizationData,
  setEventOrgId,
  organizationData,
  classes,
}) => {
  const style = useStyles();
  return (
    <div className="App">
      <Container>
        <Paper className={classes.marginedPadded}>
          <ListItem alignItems="flex-start" key={key}>
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
                    <em>Phone: {organizationData.organizationPhone}</em>
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="subtitle2"
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
