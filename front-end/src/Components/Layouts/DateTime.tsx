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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const DateTime: React.FunctionComponent = () => {
  return (
    <Card style={{ padding: "1%" }}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} style={{ paddingRight: "3%" }}>
                  <TextField
                    id="startDate"
                    label="Start date (mm/dd/yyyy)"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="startTime"
                    label="Start time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} style={{ paddingRight: "3%" }}>
                  <TextField
                    id="endDate"
                    label="End date (mm/dd/yyyy)"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="endTime"
                    label="End time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="address"
                    label="Street address"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="postalCode"
                    label="Postal code"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button>
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DateTime;
