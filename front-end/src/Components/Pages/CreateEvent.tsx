import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import categories from "../Content/Categories";
import DateTime from "../Layouts/DateTime";

const CreateEvent: React.FunctionComponent = () => {
  const [eventName, setEventName] = React.useState<string>();
  const [eventDescription, setEventDescription] = React.useState<string>();
  const [contactInfo, setContactInfo] = React.useState<string>();
  const [dateTimes, setDateTimes] = React.useState<
    {
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    }[]
  >([
    {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  ]);
  const [categorySelections, setCategorySelections] = React.useState();

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
  };

  const handleEventDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventDescription(event.target.value);
  };

  const handleContactInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactInfo(event.target.value);
  };

  const handleDateTimeChange = (
    value: string,
    index: number,
    property:
      | "startDate"
      | "startTime"
      | "endDate"
      | "endTime"
      | "address"
      | "city"
      | "state"
      | "zip"
  ) => {
    const newDateTimes = dateTimes.concat([]);
    newDateTimes[index][property] = value;
    setDateTimes(newDateTimes);
  };

  const removeDateTime = (index: number) => {
    const newDateTimes = dateTimes.concat([]);
    newDateTimes.splice(index, 1);
    setDateTimes(newDateTimes);
  };

  const addDateTime = () => {
    const newDateTimes = dateTimes.concat([
      {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      },
    ]);
    setDateTimes(newDateTimes);
  };

  return (
    <Fragment>
      <Box mx="5%" my="2.5%">
        <Card style={{ padding: "1.5%" }}>
          <Typography variant="h4" style={{ marginBottom: "1%" }}>
            Create an event
          </Typography>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
              <TextField
                id="eventName"
                value={eventName}
                label="Event Name"
                variant="outlined"
                fullWidth
                onChange={handleEventNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="eventDescription"
                value={eventDescription}
                label="Event Description"
                variant="outlined"
                multiline
                fullWidth
                onChange={handleEventDescriptionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="organizerConctact"
                value={contactInfo}
                label="Organizer Contact Information"
                variant="outlined"
                fullWidth
                onChange={handleContactInfoChange}
              />
            </Grid>
            <Grid item>
              {dateTimes.map((value, index) => {
                return (
                  <DateTime
                    index={index}
                    dateTime={value}
                    removeDateTime={removeDateTime}
                    handleDateTimeChange={handleDateTimeChange}
                  ></DateTime>
                );
              })}

              {/* TODO: Add other datetimes here */}
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addDateTime();
                }}
              >
                New date
              </Button>
            </Grid>
            <Grid item style={{ paddingBottom: "0%" }}>
              <Typography variant="h5">Categories</Typography>
              <Typography variant="subtitle1">
                <em>Select all that apply to this event</em>
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {categories.map((val, index) => {
                  return (
                    <Grid item key={index}>
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
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-evenly">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Save event
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Fragment>
  );
};

export default CreateEvent;
