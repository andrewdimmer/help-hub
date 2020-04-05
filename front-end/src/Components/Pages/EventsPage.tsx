import React, { Fragment } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import Event from "../Layouts/Event";

const EventsPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Box mx="5%" my="2.5%">
        <Card style={{ padding: "1.5%" }}>
          <Typography variant="h4" style={{ marginBottom: "1%", flexGrow: 1 }}>
            Events near you
          </Typography>
          <Button variant="contained" color="primary">
            Filter
          </Button>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
              <Box>
                <Event
                  eventName="Cyber Starters"
                  eventDesciption="Help senior citizens with new technology! Work with seniors one on one to answer their questions."
                  eventDateTime="May 5th, 2020, 6:00PM"
                  eventLocation="6495 Clarkston Rd, Village of Clarkston, MI 48346"
                ></Event>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Fragment>
  );
};

export default EventsPage;
