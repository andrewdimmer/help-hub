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
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import DateTime from "../Layouts/DateTime";
import categories from "../Content/Categories";

const CreateEvent: React.FunctionComponent = () => {
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
                label="Event Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="eventDescription"
                label="Event Description"
                variant="outlined"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="organizerConctact"
                label="Organizer Contact Information"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <DateTime></DateTime>
              {/* TODO: Add other datetimes here */}
              <br />
              <Button variant="contained" color="primary">
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
