import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { EventData } from "../../Scripts/firebaseEventTypes";

interface EventInfoProps {
  classes: any;
  eventData: EventData;
  registrationFunction?: (eventId: string) => void;
  unregistrationFunction?: (eventId: string) => void;
}

const EventInfo: React.FunctionComponent<EventInfoProps> = ({
  classes,
  eventData,
  registrationFunction,
  unregistrationFunction,
}) => {
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
            <Typography variant="h5">{eventData.eventName}</Typography>
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
        </Grid>
      </Card>
    </Container>
  );
};

export default EventInfo;
