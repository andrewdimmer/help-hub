import { Container, Typography, Button } from "@material-ui/core";
import React from "react";
import { styles } from "../../Styles";

declare interface MainPageProps {}

const HomePage: React.FunctionComponent<MainPageProps> = () => {
  const classes = styles();

  return (
    <Container>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Volunteer Here!</Typography>
      </Container>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
      >
        <Typography variant="h4">I'm a volunteer</Typography>
      </Button>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
      >
        <Typography variant="h4">I'm a organization</Typography>
      </Button>
    </Container>
  );
};

export default HomePage;
