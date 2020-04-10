import { Button, Card, Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

interface DateTimeProps {
  index: number;
  dateTime: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    volunteersNeeded: number;
  };
  removeDateTime: (index: number) => void;
  handleDateTimeChange: (
    input: string,
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
  ) => void;

  validInput: {
    startDate: boolean;
    startTime: boolean;
    endDate: boolean;
    endTime: boolean;
    address: boolean;
    city: boolean;
    state: boolean;
    zip: boolean;
  };
}

const DateTime: React.FunctionComponent<DateTimeProps> = ({
  index,
  dateTime,
  removeDateTime,
  handleDateTimeChange,
  validInput,
}) => {
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleDateTimeChange(event.target.value, index, "startDate");
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleDateTimeChange(event.target.value, index, "startTime");
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "endDate");
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "endTime");
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "address");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "city");
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "state");
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDateTimeChange(event.target.value, index, "zip");
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
                    value={dateTime.startDate}
                    label="Start date (mm/dd/yyyy)"
                    variant="outlined"
                    fullWidth
                    onChange={handleStartDateChange}
                    error={!validInput.startDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="startTime"
                    value={dateTime.startTime}
                    label="Start time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                    onChange={handleStartTimeChange}
                    error={!validInput.startTime}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} style={{ paddingRight: "3%" }}>
                  <TextField
                    id="endDate"
                    value={dateTime.endDate}
                    label="End date (mm/dd/yyyy)"
                    variant="outlined"
                    fullWidth
                    onChange={handleEndDateChange}
                    error={!validInput.endDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="endTime"
                    value={dateTime.endTime}
                    label="End time (hh:mm AM/PM)"
                    variant="outlined"
                    fullWidth
                    onChange={handleEndTimeChange}
                    error={!validInput.endTime}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="address"
                    value={dateTime.address}
                    label="Street address"
                    variant="outlined"
                    fullWidth
                    onChange={handleAddressChange}
                    error={!validInput.address}
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="city"
                    value={dateTime.city}
                    label="City"
                    variant="outlined"
                    fullWidth
                    onChange={handleCityChange}
                    error={!validInput.city}
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingRight: "1%" }}>
                  <TextField
                    id="state"
                    value={dateTime.state}
                    label="State"
                    variant="outlined"
                    fullWidth
                    onChange={handleStateChange}
                    error={!validInput.state}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="postalCode"
                    value={dateTime.zip}
                    label="Zip Code"
                    variant="outlined"
                    fullWidth
                    onChange={handleZipChange}
                    error={!validInput.zip}
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
