import { Container, Typography, Button } from "@material-ui/core";
import React from "react";
import { styles } from "../../Styles";
import { PageProps } from ".";

const HomePage: React.FunctionComponent<PageProps> = ({
  currentUser,
  setPageKey,
}) => {
  const classes = styles();

  return (
    <Container>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Volunteer Here!</Typography>
      </Container>
      <Button
        color={currentUser ? "inherit" : "primary"}
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        disabled={currentUser ? true : false}
        onClick={() => {
          setPageKey("login");
        }}
      >
        <Typography variant="h4">
          {currentUser ? "Already Logged In." : "Login"}
        </Typography>
      </Button>
      <Button
        color={currentUser ? "primary" : "inherit"}
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        disabled={currentUser ? false : true}
        onClick={() => {
          setPageKey("events");
        }}
      >
        <Typography variant="h4">
          {currentUser
            ? "I want to volunteer"
            : "Please Login to Sign Up to Volunteer"}
        </Typography>
      </Button>
      <Button
        color={currentUser ? "primary" : "inherit"}
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        disabled={currentUser ? false : true}
        onClick={() => {
          setPageKey("organizations");
        }}
      >
        <Typography variant="h4">
          {currentUser
            ? "I need volunteers"
            : "Please Login to Manage Organizations"}
        </Typography>
      </Button>
    </Container>
  );
};

export default HomePage;
