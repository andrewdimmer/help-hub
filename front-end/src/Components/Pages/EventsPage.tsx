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
import {
  registerForEvent,
  unregisterForEvent,
} from "../../Scripts/firebaseEventRegistration";
import {
  EventData,
  EventDataWithCount,
} from "../../Scripts/firebaseEventTypes";
import {
  getEventsByUser,
  getEventsWithinRadius,
} from "../../Scripts/firebaseGetEvents";
import categories from "../Content/Categories";
import EventList from "../Layouts/EventList";

const EventsPage: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  setNotification,
  setLoadingMessage,
}) => {
  const filterCategories = categories.concat(["Uncategorized"]);
  const [filterBoxOpen, setFilterBoxOpen] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<number>(20);
  const [priorRadius, setPriorRadius] = React.useState<number>(-1);
  const [zip, setZip] = React.useState<string>(
    currentUserProfile?.zipcode ? currentUserProfile.zipcode : ""
  );
  const [priorZip, setPriorZip] = React.useState<string>("zip");
  const [events, setEvents] = React.useState<EventDataWithCount[] | null>(null);
  const [visibleEvents, setVisibleEvents] = React.useState<
    EventDataWithCount[]
  >([]);
  const [myFutureEvents, setMyFutureEvents] = React.useState<EventData[]>([]);
  const [myPastEvents, setMyPastEvents] = React.useState<EventData[]>([]);
  const [gettingEvents, setGettingEvents] = React.useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    currentUserProfile?.interests
      ? currentUserProfile.interests.concat(["Uncategorized"])
      : filterCategories
  );

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseFloat(event.target.value));
  };

  const handleUpdateSelectedCategories = (input: string) => {
    const newSelectedCategories = selectedCategories.concat([]);
    if (selectedCategories.includes(input)) {
      newSelectedCategories.splice(newSelectedCategories.indexOf(input), 1);
    } else {
      newSelectedCategories.push(input);
    }
    setSelectedCategories(newSelectedCategories.sort());
  };

  const handleOpenFilterBox = () => {
    setFilterBoxOpen(true);
  };

  const handleCloseFilterBox = () => {
    setFilterBoxOpen(false);
  };

  const getUpcomingEvents = (callback?: () => void) => {
    if (!gettingEvents) {
      if (zip.length === 5 || zip.length === 6) {
        setPriorZip(zip);
        setPriorRadius(radius);
        setGettingEvents(true);
        setLoadingMessage("Getting Upcoming Events...");
        getEventsWithinRadius(zip, radius)
          .then((eventsData) => {
            if (eventsData !== null) {
              setEvents(eventsData);
              filterByCategory(eventsData);
              if (callback) {
                callback();
              } else {
                setLoadingMessage("");
                setGettingEvents(false);
              }
            } else {
              setNotification({
                type: "error",
                message:
                  "Error getting events. Please check your filter settings or try again later.",
                open: true,
              });
              setEvents([]);
              if (callback) {
                callback();
              } else {
                setLoadingMessage("");
                setGettingEvents(false);
              }
            }
          })
          .catch((err) => {
            console.log(err);
            setNotification({
              type: "error",
              message:
                "Error getting events. Please check your filter settings or try again later.",
              open: true,
            });
            setEvents([]);
            if (callback) {
              callback();
            } else {
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
        setEvents([]);
        handleOpenFilterBox();
        if (callback) {
          callback();
        }
      }
    }
  };

  const getUserEvents = () => {
    if (currentUserProfile) {
      setLoadingMessage("Getting Your Events...");
      getEventsByUser(currentUserProfile.userId)
        .then((userEventsData) => {
          if (userEventsData) {
            const todayDate = new Date();
            let breakPoint = 0;
            while (
              breakPoint < userEventsData.length &&
              new Date(
                `${userEventsData[breakPoint].endDate} ${userEventsData[breakPoint].endTime}`
              ) < todayDate
            ) {
              breakPoint++;
            }
            setMyPastEvents(userEventsData.slice(0, breakPoint));
            setMyFutureEvents(userEventsData.slice(breakPoint));
            setLoadingMessage("");
            setGettingEvents(false);
          } else {
            setNotification({
              type: "warning",
              message: "Error getting your events. Please try again later.",
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
            message: "Error getting your events. Please try again later.",
            open: true,
          });
          setLoadingMessage("");
          setGettingEvents(false);
        });
    } else {
      setNotification({
        type: "warning",
        message:
          "Unable to get your events. Try signing out and signing back in.",
        open: true,
      });
      setLoadingMessage("");
      setGettingEvents(false);
    }
  };

  const filterByCategory = (events: EventDataWithCount[]) => {
    const newVisibleEvents: EventDataWithCount[] = [];
    for (const event of events) {
      for (const category of selectedCategories) {
        if (category === "Uncategorized") {
          if (event.categories.length === 0) {
            newVisibleEvents.push(event);
            break;
          }
        } else if (event.categories.includes(category)) {
          newVisibleEvents.push(event);
          break;
        }
      }
    }
    setVisibleEvents(newVisibleEvents);
  };

  const handleFilterEvents = () => {
    if (zip !== priorZip || radius !== priorRadius) {
      getUpcomingEvents(getUserEvents);
    } else {
      if (events) {
        filterByCategory(events);
      }
    }
    handleCloseFilterBox();
  };

  const handleRegistration = (eventId: string) => {
    if (currentUserProfile) {
      setLoadingMessage("Registering...");
      registerForEvent(currentUserProfile.userId, eventId)
        .then((userEventsData) => {
          if (userEventsData) {
            setNotification({
              type: "success",
              message: "Event Registration Successful",
              open: true,
            });
            getUpcomingEvents(getUserEvents);
          } else {
            setNotification({
              type: "warning",
              message:
                "Unable to register you for the event. Please try again later.",
              open: true,
            });
            setLoadingMessage("");
          }
        })
        .catch((err) => {
          setNotification({
            type: "warning",
            message:
              "Unable to register you for the event. Please try again later.",
            open: true,
          });
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "warning",
        message:
          "Unable to register you for the event. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  const handleUnregistration = (eventId: string) => {
    if (currentUserProfile) {
      setLoadingMessage("Unregistering...");
      unregisterForEvent(currentUserProfile.userId, eventId)
        .then((userEventsData) => {
          if (userEventsData) {
            setNotification({
              type: "success",
              message: "Event Unregistration Successful",
              open: true,
            });
            getUpcomingEvents(getUserEvents);
          } else {
            setNotification({
              type: "warning",
              message:
                "Unable to unregister you from the event. Please try again later.",
              open: true,
            });
            setLoadingMessage("");
          }
        })
        .catch((err) => {
          setNotification({
            type: "warning",
            message:
              "Unable to unregister you from the event. Please try again later.",
            open: true,
          });
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "warning",
        message:
          "Unable to unregister you from the event. Try signing out and signing back in.",
        open: true,
      });
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
      {myFutureEvents.length > 0 && (
        <Fragment>
          <Container className={classes.pageTitle}>
            <Typography variant="h3">My Upcoming Events</Typography>
          </Container>
          <EventList
            events={myFutureEvents}
            classes={classes}
            unregistrationFunction={handleUnregistration}
          />
        </Fragment>
      )}
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Upcoming Events</Typography>
      </Container>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        onClick={handleOpenFilterBox}
      >
        Filter
      </Button>
      {visibleEvents.length === 0 && (
        <Container className={classes.pageTitle}>
          <Typography variant="h4">
            No events match the current filter.
          </Typography>
        </Container>
      )}
      <EventList
        events={visibleEvents}
        classes={classes}
        registrationFunction={handleRegistration}
      />
      {myPastEvents.length > 0 && (
        <Fragment>
          <Container className={classes.pageTitle}>
            <Typography variant="h3">My Previous Events</Typography>
          </Container>
          <EventList events={myPastEvents} classes={classes} />
        </Fragment>
      )}

      <Dialog
        open={filterBoxOpen}
        onClose={handleCloseFilterBox}
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
            {filterCategories.map((val) => {
              return (
                <Grid item key={val}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(val)}
                        onChange={() => {
                          handleUpdateSelectedCategories(val);
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleFilterEvents}
            color="primary"
            variant="contained"
          >
            Filter
          </Button>
          <Button
            onClick={handleCloseFilterBox}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EventsPage;
