import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { NotificationMessage } from "../Misc/Notifications";

interface EventInfoProps {
  eventName: string;
  eventDesciption: string;
  eventDateTime: string;
  eventLocation: string;
  eventContact: string;
  eventCategories: string;
  classes: any;
  number: number;
  events: any[];
  setEvents: (events: any[]) => void;
  setNotification: (notification: NotificationMessage) => void;
}

const EventInfo: React.FunctionComponent<EventInfoProps> = ({
  eventName,
  eventDesciption,
  eventDateTime,
  eventLocation,
  eventContact,
  eventCategories,
  classes,
  number,
  events,
  setEvents,
  setNotification,
}) => {
  return (
    <div className="App">
      <Container className={classes.margined}>
        <Card
          style={{
            padding: "1.5%",
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item sm={10} xs={12}>
              <Typography variant="h5">{eventName}</Typography>
              <Typography variant="h6" noWrap={true}>
                Description: {eventDesciption}
              </Typography>
              <Typography variant="subtitle1" noWrap={true}>
                Organizer Contact Information: {eventContact}
              </Typography>
              <Typography variant="subtitle1" noWrap={true}>
                Categories: {eventCategories}
              </Typography>
              <Typography variant="body2">
                <em>{eventDateTime}</em>
              </Typography>
              <Typography variant="body2">
                <em>{eventLocation}</em>
              </Typography>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const newEvents = events.concat([]);
                  newEvents.splice(number, 1);
                  setEvents(newEvents);
                  setNotification({
                    type: "success",
                    message: "Registration Successful!",
                    open: true,
                  });
                }}
              >
                Sign Up to Volunteer
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default EventInfo;
