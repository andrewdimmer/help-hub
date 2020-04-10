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
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { createNewEventGroup } from "../../Scripts/firebaseCreateNewEvent";
import categories from "../Content/Categories";
import DateTime from "../Layouts/DateTime";

const CreateEvent: React.FunctionComponent<PageProps> = ({
  currentUserProfile,
  setNotification,
  handleLoadUserData,
  setLoadingMessage,
}) => {
  const [eventName, setEventName] = React.useState<string>("");
  const [eventDescription, setEventDescription] = React.useState<string>("");
  const [eventContactInfo, setEventContactInfo] = React.useState<string>("");
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
      volunteersNeeded: number;
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
      volunteersNeeded: 1,
    },
  ]);
  const [categorySelections, setCategorySelections] = React.useState<string[]>(
    []
  );
  const [validInputs, setValidInputs] = React.useState({
    name: true,
    description: true,
    contact: true,
    dateTimes: [
      {
        startDate: true,
        startTime: true,
        endDate: true,
        endTime: true,
        address: true,
        city: true,
        state: true,
        zip: true,
      },
    ],
  });

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
    if (!validInputs.name) {
      setValidInputs({
        ...validInputs,
        name: stringNotEmpty(event.target.value),
      });
    }
  };

  const handleEventDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventDescription(event.target.value);
    if (!validInputs.description) {
      setValidInputs({
        ...validInputs,
        description: stringNotEmpty(event.target.value),
      });
    }
  };

  const handleContactInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventContactInfo(event.target.value);
    if (!validInputs.contact) {
      setValidInputs({
        ...validInputs,
        contact: stringNotEmpty(event.target.value),
      });
    }
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
    if (!validInputs.dateTimes[index][property]) {
      const newValidInputs = { ...validInputs };
      if (property === "startDate") {
        validInputs.dateTimes[index][property] = validStartDate(value);
      } else if (property === "startTime") {
        validInputs.dateTimes[index][property] = validStartTime(value);
      } else if (property === "endDate") {
        validInputs.dateTimes[index][property] = validEndDate(
          dateTimes[index].startDate,
          value
        );
      } else if (property === "endTime") {
        validInputs.dateTimes[index][property] = validEndTime(
          dateTimes[index].startDate,
          dateTimes[index].startTime,
          dateTimes[index].endDate,
          value
        );
      } else if (property === "zip") {
        validInputs.dateTimes[index][property] = validZip(value);
      } else {
        validInputs.dateTimes[index][property] = stringNotEmpty(value);
      }
      setValidInputs(newValidInputs);
    }
  };

  const removeDateTime = (index: number) => {
    const newDateTimes = dateTimes.concat([]);
    newDateTimes.splice(index, 1);
    setDateTimes(newDateTimes);
    const newDateTimeValidation = { ...validInputs };
    newDateTimeValidation.dateTimes.splice(index, 1);
    setValidInputs(newDateTimeValidation);
  };

  const addDateTime = () => {
    const newDateTimeValidation = {
      ...validInputs,
      dateTimes: validInputs.dateTimes.concat([
        {
          startDate: true,
          startTime: true,
          endDate: true,
          endTime: true,
          address: true,
          city: true,
          state: true,
          zip: true,
        },
      ]),
    };
    setValidInputs(newDateTimeValidation);
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
        volunteersNeeded: 1,
      },
    ]);
    setDateTimes(newDateTimes);
  };

  const handleUpdateCategories = (input: string) => {
    const newCategorySelections = categorySelections.concat([]);
    if (categorySelections.includes(input)) {
      newCategorySelections.splice(newCategorySelections.indexOf(input), 1);
    } else {
      newCategorySelections.push(input);
    }
    setCategorySelections(newCategorySelections);
  };

  const saveEvent = () => {
    if (validateDataBeforeSave()) {
      setLoadingMessage(`Creating Event${dateTimes.length > 1 ? "s" : ""}...`);
      createNewEventGroup({
        organizationId: currentUserProfile?.userId
          ? currentUserProfile.userId
          : nanoid(),
        eventGroupId: nanoid(),
        eventName,
        eventDescription,
        eventContactInfo,
        events: dateTimes.map((dateTime) => {
          return { ...dateTime, eventId: nanoid() };
        }),
        categories: categorySelections,
      })
        .then(() => {
          handleClearData();
          setNotification({
            type: "success",
            message: `Event${
              dateTimes.length > 1 ? "s" : ""
            } Created Successfully!`,
            open: true,
          });
          setLoadingMessage("");
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message: `An error occured while creating event${
              dateTimes.length > 1 ? "s" : ""
            }. Please try again later.`,
            open: true,
          });
          setLoadingMessage("");
        });
    }
  };

  const stringNotEmpty = (string: string) => {
    return string.length > 0;
  };

  const validStartDate = (startDate: string) => {
    if (startDate.length !== 10) {
      return false;
    }
    return new Date(startDate).toString() !== "Invalid Date";
  };

  const validStartTime = (startTime: string) => {
    if (startTime.length < 7) {
      return false;
    }
    return new Date(`1970/01/01 ${startTime}`).toString() !== "Invalid Date";
  };

  const validEndDate = (startDate: string, endDate: string) => {
    if (endDate.length !== 10) {
      return false;
    }
    const endDateObject = new Date(endDate);
    return endDateObject.toString() !== "Invalid Date" &&
      validStartDate(startDate)
      ? new Date(startDate) <= endDateObject
      : true;
  };

  const validEndTime = (
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) => {
    if (endTime.length < 7) {
      return false;
    }
    const endTimeObject = new Date(`1970/01/01 ${endTime}`);
    return endTimeObject.toString() !== "Invalid Date" &&
      validStartDate(startDate) &&
      validStartTime(startTime) &&
      validEndDate(startDate, endDate)
      ? new Date(startDate).toString() === new Date(endDate).toString()
        ? new Date(`1970/01/01 ${startTime}`) < endTimeObject
        : true
      : true;
  };

  const validZip = (zip: string) => {
    return !isNaN(parseInt(zip)) && (zip.length === 5 || zip.length === 6);
  };

  const validateDataBeforeSave = (): boolean => {
    const validDateTimes = () => {
      return dateTimes.map((dateTime) => {
        return {
          startDate: validStartDate(dateTime.startDate),
          startTime: validStartTime(dateTime.startTime),
          endDate: validEndDate(dateTime.startDate, dateTime.endDate),
          endTime: validEndTime(
            dateTime.startDate,
            dateTime.startTime,
            dateTime.endDate,
            dateTime.endTime
          ),
          address: stringNotEmpty(dateTime.address),
          city: stringNotEmpty(dateTime.city),
          state: stringNotEmpty(dateTime.state),
          zip: validZip(dateTime.zip),
        };
      });
    };

    const newValidInputs = {
      name: stringNotEmpty(eventName),
      description: stringNotEmpty(eventDescription),
      contact: stringNotEmpty(eventContactInfo),
      dateTimes: validDateTimes(),
    };
    setValidInputs(newValidInputs);
    if (dateTimes.length === 0) {
      setNotification({
        type: "error",
        message: "Please make sure you have at least one time and location",
        open: true,
      });
      return false;
    }
    const valid = !JSON.stringify(newValidInputs).includes("false");
    if (!valid) {
      setNotification({
        type: "error",
        message: "Please double check that all of the inputs are valid.",
        open: true,
      });
    }
    return valid;
  };

  const handleClearData = () => {
    setCategorySelections([]);
    setEventContactInfo("");
    setDateTimes([
      {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        volunteersNeeded: 1,
      },
    ]);
    setEventName("");
    setEventDescription("");
    setValidInputs({
      name: true,
      description: true,
      contact: true,
      dateTimes: [
        {
          startDate: true,
          startTime: true,
          endDate: true,
          endTime: true,
          address: true,
          city: true,
          state: true,
          zip: true,
        },
      ],
    });
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
                error={!validInputs.name}
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
                error={!validInputs.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="organizerConctact"
                value={eventContactInfo}
                label="Organizer Contact Information"
                variant="outlined"
                fullWidth
                onChange={handleContactInfoChange}
                error={!validInputs.contact}
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
                    validInput={validInputs.dateTimes[index]}
                  ></DateTime>
                );
              })}

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
                            checked={categorySelections.includes(val)}
                            onChange={() => {
                              handleUpdateCategories(val);
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
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-evenly">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={saveEvent}
                  >
                    Save event
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClearData}
                  >
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
