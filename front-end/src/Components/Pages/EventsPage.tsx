import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import categories from "../Content/Categories";
import EventInfo from "../Layouts/EventInfo";

const EventsPage: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  events,
  setEvents,
  setNotification,
}) => {
  const [open, setOpen] = React.useState(false);
  const [radius, setRadius] = React.useState<string>();
  const [zip, setZip] = React.useState<string>();

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      {events.map(
        (
          {
            eventName,
            eventDescription,
            contactInfo,
            categories,
            startDate,
            startTime,
            endDate,
            endTime,
            address,
            city,
            state,
            zip,
            user,
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
              eventContact={contactInfo}
              eventCategories={categories}
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
        <DialogTitle id="form-dialog-title">Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1">
              <em>Select all that apply to this event</em>
            </Typography>
          </DialogContentText>
          <Grid container direction="column">
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
            <Grid item>
              <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
                Location filter by zip code
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="zip"
                label="Zip Code"
                variant="outlined"
                fullWidth
                defaultValue={zip}
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
                defaultValue={radius}
                onChange={handleRadiusChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
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
