import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { EventData } from "../../Scripts/firebaseEventTypes";
import EventInfo from "./EventInfo";

declare interface EventListProps {
  events: EventData[];
  classes: any;
  registrationFunction?: (eventId: string) => void;
  unregistrationFunction?: (eventId: string) => void;
}

const EventList: React.FunctionComponent<EventListProps> = ({
  events,
  classes,
  registrationFunction,
  unregistrationFunction,
}) => {
  const getPreviousEventDateString = (index: number) => {
    if (index === 0 || events === null) {
      return new Date("1970/01/01").toDateString();
    } else {
      return new Date(
        `${events[index - 1].startDate} ${events[index - 1].startTime}`
      ).toDateString();
    }
  };
  return (
    <Fragment>
      {events.length > 0 &&
        events.map((eventData, index) => {
          const eventStartDateString = new Date(
            `${eventData.startDate} ${eventData.startTime}`
          ).toDateString();
          return (
            <Fragment key={eventData.eventId}>
              {eventStartDateString !== getPreviousEventDateString(index) && (
                <Container>
                  <Typography variant="h4">{eventStartDateString}</Typography>
                </Container>
              )}
              <EventInfo
                eventData={eventData}
                classes={classes}
                registrationFunction={registrationFunction}
                unregistrationFunction={unregistrationFunction}
              />
            </Fragment>
          );
        })}
    </Fragment>
  );
};
export default EventList;
