import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Fab,
} from "@material-ui/core";
import React, { Fragment } from "react";
import {
  EventData,
  EventDataWithCount,
  EventDataWithVolunteers,
} from "../../Scripts/firebaseEventTypes";
import SquareAvatar from "../Misc/SquareAvatar";
import EditIcon from '@material-ui/icons/Edit';

interface EventInfoProps {
  classes: any;
  eventData: EventData | EventDataWithCount | EventDataWithVolunteers;
  registrationFunction?: (eventId: string) => void;
  unregistrationFunction?: (eventId: string) => void;
  editFunction?: Function;
}

const EventInfo: React.FunctionComponent<EventInfoProps> = ({
  classes,
  eventData,
  registrationFunction,
  unregistrationFunction,
  editFunction,
}) => {
  const volunteerCount =
    "volunteerCount" in eventData ? eventData.volunteerCount : undefined;
  const volunteersStillNeeded =
    volunteerCount !== undefined
      ? eventData.volunteersNeeded - volunteerCount
      : 0;
  const volunteerCountString =
    volunteerCount !== undefined
      ? `(${volunteersStillNeeded} volunteer${
          volunteersStillNeeded !== 1 ? "s" : ""
        } still needed)`
      : "";
  const volunteers =
    "volunteers" in eventData ? eventData.volunteers : undefined;

  return (
    <Container className={classes.margined}>
      <Card
        style={{
          padding: "1.5%",
        }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid
            item
            sm={registrationFunction || unregistrationFunction ? 10 : 12}
            xs={12}
          >
            <Typography variant="h5">{`${eventData.eventName} ${volunteerCountString}`}</Typography>
            <Typography variant="h6" noWrap={true}>
              Description: {eventData.eventDescription}
            </Typography>
            <Typography variant="subtitle1" noWrap={true}>
              Organizer Contact Information: {eventData.eventContactInfo}
            </Typography>
            <Typography variant="subtitle1" noWrap={true}>
              Categories:{" "}
              {eventData.categories.length > 0
                ? eventData.categories.toString().replace(/,/g, ", ")
                : "Uncategorized"}
            </Typography>
            <Typography variant="body1">
              <em>{`${eventData.startDate} ${eventData.startTime} - ${eventData.endDate} ${eventData.endTime}`}</em>
            </Typography>
            <Typography variant="body1">
              <em>{`${eventData.address}, ${eventData.city}, ${eventData.state} ${eventData.zip}`}</em>
            </Typography>
            {volunteers != undefined &&
              volunteers.map((value: any, index: number) => {
                return (
                  <ListItem alignItems="flex-start" key={value.userId}>
                    <ListItemAvatar>
                      <Box height="50px" width="50px">
                        <SquareAvatar
                          alt={value.displayName}
                          src={value.photoUrl}
                          maxHeightPercentageOfScreen={100}
                          maxWidthPercentageOfParent={100}
                          maxWidthPercentageOfScreen={100}
                          centerInContainer={true}
                        />
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Fragment>
                          <Typography variant="h5">
                            {value.displayName}
                          </Typography>
                        </Fragment>
                      }
                      secondary={
                        <Fragment>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="textPrimary"
                          >
                            <em>Phone: {value.phoneNumber}</em>
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="textPrimary"
                          >
                            <em>Email: {value.email}</em>
                          </Typography>
                        </Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
          </Grid>
          {(registrationFunction || unregistrationFunction) && (
            <Grid item sm={2} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  registrationFunction
                    ? () => {
                        registrationFunction(eventData.eventId);
                      }
                    : unregistrationFunction
                    ? () => {
                        unregistrationFunction(eventData.eventId);
                      }
                    : () => {}
                }
              >
                {registrationFunction
                  ? "Register to Volunteer"
                  : "Unregister from Volunteering"}
              </Button>
            </Grid>
          )}
          {(editFunction) && (
            <Grid item sm={2} xs={12}>
              <Fab
                color="primary"
                onClick={()=>{console.log("Edit");}}
              >
              <EditIcon></EditIcon></Fab>
            </Grid>
          )}
        </Grid>
      </Card>
    </Container>
  );
};

export default EventInfo;
