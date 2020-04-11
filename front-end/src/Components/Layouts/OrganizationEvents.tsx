import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { Fragment } from "react";
import { EventDataWithVolunteers } from "../../Scripts/firebaseEventTypes";
import { getEventsByOrganization } from "../../Scripts/firebaseGetEvents";
import { NotificationMessage } from "../Misc/Notifications";
import EventList from "./EventList";
import CreateEventDialog from "./CreateEventDialog";

declare interface EventInfoProps {
  setNotification: (notification: NotificationMessage) => void;
  currentOrganizationId: string;
  setCurrentOrganizationId: (organizationId: string) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  classes: any;
}

const OrganizationEvents: React.FunctionComponent<EventInfoProps> = ({
  setNotification,
  currentOrganizationId,
  setCurrentOrganizationId,
  setLoadingMessage,
  classes,
}) => {
  const [futureEvents, setFutureEvents] = React.useState<
    EventDataWithVolunteers[]
  >([]);
  const [pastEvents, setPastEvents] = React.useState<EventDataWithVolunteers[]>(
    []
  );
  const [gettingEvents, setGettingEvents] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [createNewEventOpen, setCreateNewEventOpen] = React.useState<boolean>(
    false
  );

  const handleClose = () => {
    setCurrentOrganizationId("");
  };

  const getOrganizationEvents = () => {
    console.log("Get Events");
    if (!gettingEvents) {
      console.log("Not Busy");
      if (currentOrganizationId) {
        console.log("Valid OrgId");
        setGettingEvents(true);
        setLoadingMessage("Getting Your Organization's Events...");
        getEventsByOrganization(currentOrganizationId)
          .then((organizationEventsData) => {
            if (organizationEventsData) {
              const todayDate = new Date();
              let breakPoint = 0;
              while (
                breakPoint < organizationEventsData.length &&
                new Date(
                  `${organizationEventsData[breakPoint].endDate} ${organizationEventsData[breakPoint].endTime}`
                ) < todayDate
              ) {
                breakPoint++;
              }
              setPastEvents(organizationEventsData.slice(0, breakPoint));
              setFutureEvents(organizationEventsData.slice(breakPoint));
              setLoadingMessage("");
              setGettingEvents(false);
            } else {
              setNotification({
                type: "warning",
                message:
                  "Error getting your organization's events. Please try again later.",
                open: true,
              });
              setLoadingMessage("");
              setGettingEvents(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setNotification({
              type: "warning",
              message:
                "Error getting your organization's events. Please try again later.",
              open: true,
            });
            setLoadingMessage("");
            setGettingEvents(false);
          });
      } else {
        setNotification({
          type: "warning",
          message:
            "Unable to get your organization's events. Try signing out and signing back in.",
          open: true,
        });
        setLoadingMessage("");
        setGettingEvents(false);
      }
    }
  };

  if (!loaded) {
    setTimeout(() => {
      setLoaded(true);
      getOrganizationEvents();
    }, 1);
  }

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={currentOrganizationId.length > 0}
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
        <Container className={classes.marginedPadded}>.</Container>
        <Container className={classes.pageTitle}>
          <Typography variant="h3">Create New Events</Typography>
        </Container>
        <Container>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            size="large"
            className={classes.margined}
            onClick={() => setCreateNewEventOpen(true)}
          >
            <Typography variant="h4">Create a New Event</Typography>
          </Button>
        </Container>
        {futureEvents.length > 0 && (
          <Container>
            <Container className={classes.pageTitle}>
              <Typography variant="h3">Upcoming Events</Typography>
            </Container>
            <EventList events={futureEvents} classes={classes} />
          </Container>
        )}
        {pastEvents.length > 0 && (
          <Container>
            <Container className={classes.pageTitle}>
              <Typography variant="h3">Previous Events</Typography>
            </Container>
            <EventList events={pastEvents} classes={classes} />
          </Container>
        )}
      </Dialog>

      <CreateEventDialog
        organizationId={currentOrganizationId}
        setLoadingMessage={setLoadingMessage}
        setNotification={setNotification}
        getOrganizationEvents={getOrganizationEvents}
        open={createNewEventOpen}
        setOpen={setCreateNewEventOpen}
        classes={classes}
      />
    </Fragment>
  );
};

export default OrganizationEvents;
