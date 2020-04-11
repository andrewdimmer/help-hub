import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { EventData } from "../../Scripts/firebaseEventTypes";
import { getEventsWithinRadius } from "../../Scripts/firebaseGetEvents";
import categories from "../Content/Categories";
import EventInfo from "../Layouts/EventInfo";

const EventsPage: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  setNotification,
  setLoadingMessage,
}) => {
  const [open, setOpen] = React.useState(false);
  const [radius, setRadius] = React.useState<number>(20);
  const [zip, setZip] = React.useState<string>(
    currentUserProfile?.zipcode ? currentUserProfile.zipcode : ""
  );
  const [events, setEvents] = React.useState<EventData[] | null>(null);
  const [gettingEvents, setGettingEvents] = React.useState<boolean>(false);

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseFloat(event.target.value));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getEvents = () => {
    if (!gettingEvents) {
      if (zip.length > 0) {
        setGettingEvents(true);
        setLoadingMessage("Getting Upcoming Events...");
        getEventsWithinRadius(zip, radius).then((eventsData) => {
          if (eventsData !== null) {
            setEvents(eventsData);
            setLoadingMessage("");
            setGettingEvents(false);
          } else {
            setNotification({
              type: "error",
              message:
                "Error getting events. Please check your filter settings or try again later.",
              open: true,
            });
            setEvents([]);
            setLoadingMessage("");
            setGettingEvents(false);
          }
        });
      } else {
        setNotification({
          type: "error",
          message: "Please specify a zipcode to find events around.",
          open: true,
        });
        handleOpen();
      }
    }
  };

  if (events === null) {
    setTimeout(() => {
      setGettingEvents(true);
      getUpcomingEvents(getUserEvents);
    }, 1);
  }

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Volunteer Here!</Typography>
      </Container>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        onClick={handleOpen}
      >
        Filter
      </Button>
      {!events && (
        <Container className={classes.pageTitle}>
          <Typography variant="h4">
            No events match the current filter.
          </Typography>
        </Container>
      )}
      {events &&
        events.map(
          (
            {
              eventName,
              eventDescription,
              eventContactInfo,
              categories,
              startDate,
              startTime,
              endDate,
              endTime,
              address,
              city,
              state,
              zip,
            },
            index
          ) => {
            return (
              <EventInfo
                eventName={eventName}
                eventDesciption={eventDescription}
                eventDateTime={
                  startDate + " " + startTime + " - " + endDate + " " + endTime
                }
                eventContact={eventContactInfo}
                eventCategories={categories.toString()}
                eventLocation={address + ", " + city + ", " + state + " " + zip}
                classes={classes}
                number={index}
                events={events}
                setEvents={setEvents}
                setNotification={setNotification}
              />
            );
          }
        )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter Events</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
                Filter by Location
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="zip"
                label="Zip Code"
                variant="outlined"
                fullWidth
                defaultValue={zip}
                error={zip.length === 0}
                helperText="Please enter a valid zip code to view events."
                onChange={handleZipChange}
                style={{ marginBottom: "10px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="radius"
                label="Radius in miles"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ max: 50, min: 0 }}
                defaultValue={radius}
                onChange={handleRadiusChange}
              />
            </Grid>
            <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
              Filter by Categories
            </Typography>
            {categories.map((val, index) => {
              return (
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={}
                        // onChange={}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              getEvents();
            }}
            color="primary"
            variant="contained"
          >
            Filter
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EventsPage;
