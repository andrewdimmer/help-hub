import React from "react";
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

interface FromProps {
  eventName: string;
  eventDesciption: string;
  eventDateTime: string;
  eventLocation: string;
}

const Event: React.FunctionComponent<FromProps> = ({
  eventName,
  eventDesciption,
  eventDateTime,
  eventLocation,
}) => {
  return (
    <div className="App">
      <Box p="50px">
        <Card
          style={{
            backgroundColor: "#F7F7F7",
            padding: "1.5%",
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item sm={10} xs={12}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <Typography variant="h5">{eventName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" noWrap={true}>
                    {eventDesciption}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                  <Grid container direction="row">
                    <Box mr="5%">
                      <Grid item>
                        <Typography variant="body2">
                          <em>{eventDateTime}}</em>
                        </Typography>
                      </Grid>
                    </Box>
                    <Grid item>
                      <Typography variant="body2">
                        <em>{eventLocation}</em>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Button variant="contained" color="primary">
                More info
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default Event;
