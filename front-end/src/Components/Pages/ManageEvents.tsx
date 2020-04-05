import React, { Fragment } from "react";
import { constants } from "buffer";
import { Box, Typography, Card, Grid, Button } from "@material-ui/core";
import EventOrg from "../Layouts/EventOrg";

const ManageEvents = () => {
  return (
    <Fragment>
      <Box mx="5%" my="2.5%">
        <Card style={{ padding: "1.5%" }}>
          <Typography variant="h4" style={{ marginBottom: "1%" }}>
            Create an event
          </Typography>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <EventOrg
                eventName="Cyber Starters"
                eventDesciption="Help senior citizens with new technology! Work with seniors one on one to answer their questions."
                eventDateTime="May 5th, 2020, 6:00PM"
                eventLocation="6495 Clarkston Rd, Village of Clarkston, MI 48346"
              ></EventOrg>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Fragment>
  );
};

export default ManageEvents;
