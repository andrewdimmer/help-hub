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

interface DateTimeProps {
  index: number;
  removeDateTime: (index: number) => void;
  handleDateTimeChange: (index: number) => void;
}

const DateTime: React.FunctionComponent<DateTimeProps> = ({
  index,
  removeDateTime,
  handleDateTimeChange,
}) => {
  const [startDate, setStartDate] = React.useState<string>();
  const [startTime, setStartTime] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  const [endTime, setEndTime] = React.useState<string>();
  const [address, setAddress] = React.useState<string>();
  const [city, setCity] = React.useState<string>();
  const [state, setState] = React.useState<string>();
  const [zip, setZip] = React.useState<string>();

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

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
                    onChange={handleStartDateChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="startTime"
                    label="Start time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                    onChange={handleStartTimeChange}
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
                    onChange={handleEndDateChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="endTime"
                    label="End time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                    onChange={handleEndTimeChange}
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
                    onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    onChange={handleCityChange}
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                    onChange={handleStateChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="postalCode"
                    label="Postal code"
                    variant="outlined"
                    fullWidth
                    onChange={handleZipChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              console.log(index);
              console.log(removeDateTime);
              removeDateTime(index);
            }}
          >
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DateTime;
