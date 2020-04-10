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
  const filterCategories = categories.concat(["Uncategorized"]);
  const [filterBoxOpen, setFilterBoxOpen] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<number>(20);
  const [priorRadius, setPriorRadius] = React.useState<number>(-1);
  const [zip, setZip] = React.useState<string>(
    currentUserProfile?.zipcode ? currentUserProfile.zipcode : ""
  );
  const [priorZip, setPriorZip] = React.useState<string>("zip");
  const [events, setEvents] = React.useState<EventData[] | null>(null);
  const [visibleEvents, setVisibleEvents] = React.useState<EventData[]>([]);
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

  const getPreviousEventDateString = (index: number) => {
    if (index === 0 || events === null) {
      return new Date("1970/01/01").toDateString();
    } else {
      return new Date(
        `${events[index - 1].startDate} ${events[index - 1].startTime}`
      ).toDateString();
    }
  };

  const getEvents = () => {
    if (!gettingEvents) {
      if (zip.length === 5 || zip.length === 6) {
        setPriorZip(zip);
        setPriorRadius(radius);
        setGettingEvents(true);
        setLoadingMessage("Getting Upcoming Events...");
        getEventsWithinRadius(zip, radius).then((eventsData) => {
          if (eventsData !== null) {
            setEvents(eventsData);
            filterByCategory(eventsData);
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
        setEvents([]);
        handleOpenFilterBox();
      }
    }
  };

  const filterByCategory = (events: EventData[]) => {
    const newVisibleEvents: EventData[] = [];
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
      getEvents();
    } else {
      if (events) {
        filterByCategory(events);
      }
    }
    handleCloseFilterBox();
  };

  if (events === null) {
    setTimeout(getEvents, 1);
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
      {visibleEvents.length > 0 &&
        visibleEvents.map(
          (
            {
              eventId,
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
            const eventStartDateString = new Date(
              `${startDate} ${startTime}`
            ).toDateString();
            return (
              <Fragment key={eventId}>
                {eventStartDateString !== getPreviousEventDateString(index) && (
                  <Container>
                    <Typography variant="h4">{eventStartDateString}</Typography>
                  </Container>
                )}
                <EventInfo
                  eventName={eventName}
                  eventDesciption={eventDescription}
                  eventDateTime={`${startDate} ${startTime} - ${endDate} ${endTime}`}
                  eventContact={eventContactInfo}
                  eventCategories={
                    categories.length > 0
                      ? categories.toString().replace(/,/g, ", ")
                      : "Uncategorized"
                  }
                  eventLocation={`${address}, ${city}, ${state} ${zip}`}
                  classes={classes}
                  number={index}
                  events={visibleEvents}
                  setEvents={setVisibleEvents}
                  setNotification={setNotification}
                />
              </Fragment>
            );
          }
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
