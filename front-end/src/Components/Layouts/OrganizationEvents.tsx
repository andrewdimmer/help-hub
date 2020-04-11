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
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  List,
  Divider,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { NotificationMessage } from "../Misc/Notifications";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import EventList from "../Layouts/EventList";
interface EventInfoProps {
  setNotification: (notification: NotificationMessage) => void;
  currentOrganizationData: any;
  setCurrentOrganizationData: any;
  setLoadingMessage: any;
  handleLoadOrganizationData: any;
  classes: any;
}

const Organization: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  currentOrganizationData,
  setCurrentOrganizationData,
  setLoadingMessage,
  handleLoadOrganizationData,
  classes,
}) => {
  const handleClose = () => {
    setCurrentOrganizationData(null);
  };

  const [events, setEvents] = React.useState([
    {
      eventName: "Childcare for first responders",
      eventDescription:
        "Help care of the children of those on the front lines of the pandemic",
      eventContactInfo: "(123) 456-7890",
      eventId: "1",
      startDate: "04/12/2020",
      startTime: "12:00",
      endDate: "04/13/2020",
      endTime: "15:00",
      address: "1234 Sample Street",
      city: "Clarkston",
      state: "Michigan",
      zip: "48346",
      volunteersNeeded: 5,
      categories: ["Disaster Relief", "Health and Medicine"],
      volunteers: {
        userId: "1",
        displayName: "Nathan Dimmer",
        email: "email@email.com",
        phoneNumber: "(123) 456-7890",
        photoUrl:
          "https://media-exp1.licdn.com/dms/image/C4E03AQE5NbqPdOvuOg/profile-displayphoto-shrink_200_200/0?e=1588809600&v=beta&t=0XlU0FtJBj8wfhWvRtGR-O6iSH0S011EMIdln9VehDY",
      },
    },
  ]);

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={currentOrganizationData !== null}
        onClose={handleClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Events
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.pageTitle}>Events</Container>
        <Container>
          {events.map((value, index) => {
            return <EventList EventDataWithVolunteers={value}></EventList>;
          })}
        </Container>
      </Dialog>
    </Fragment>
  );
};

export default Organization;
