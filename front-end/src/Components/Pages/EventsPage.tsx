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
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Event from "../Layouts/Event";
import categories from "../Content/Categories";

const EventsPage: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [zip, setZip] = React.useState<string>();

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Box mx="5%" my="2.5%">
        <Card style={{ padding: "1.5%" }}>
          <Grid container direction="row">
            <Grid item xs={11}>
              <Typography variant="h4" style={{ marginBottom: "1%" }}>
                Events near you
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Filter
              </Button>
            </Grid>
          </Grid>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1">
              <em>Select all that apply to this event</em>
            </Typography>
          </DialogContentText>
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
            <Grid item>
              <TextField
                id="zip"
                label="Zip Code"
                variant="outlined"
                fullWidth
                defaultValue={zip}
                onChange={handleZipChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Filter
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EventsPage;
