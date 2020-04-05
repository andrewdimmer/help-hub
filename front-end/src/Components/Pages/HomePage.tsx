import { Container, Typography } from "@material-ui/core";
import React from "react";

declare interface MainPageProps {}

const HomePage: React.FunctionComponent<MainPageProps> = () => {
  return (
    <Container>
      <Typography variant="h3">Hello!</Typography>
    </Container>
  );
};

export default HomePage;
