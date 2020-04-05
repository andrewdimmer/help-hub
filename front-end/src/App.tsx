import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import React, { Fragment } from "react";
import NavBar from "./Components/Layouts/NavBar";
import LoadingScreen from "./Components/Misc/LoadingScreen";
import NotificationBar, {
  NotificationMessage
} from "./Components/Misc/Notifications";
import HomePage from "./Components/Pages/HomePage";
import { darkTheme, lightTheme } from "./Styles/theme";
import { useDarkMode } from "./Styles/useDarkMode";
import { styles } from "./Styles";

const App: React.FunctionComponent = () => {
  const { theme, toggleTheme, componentMounted } = useDarkMode();
  const [notification, setNotification] = React.useState<NotificationMessage>({
    type: "info",
    message: "Notifications are working!",
    open: true
  });
  const [loadingMessage, setLoadingMessage] = React.useState<string>("");

  const localStyles = makeStyles((theme: Theme) =>
    createStyles({
      marginedTop: {
        marginTop: theme.spacing(2)
      }
    })
  );

  const localClasses = localStyles();

  if (!componentMounted) {
    return <Fragment />;
  }

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <NavBar theme={theme} toggleTheme={toggleTheme} user={null} />
      <Container className={localClasses.marginedTop}>
        <HomePage />
      </Container>
      <LoadingScreen loadingMessage={loadingMessage} />
      <NotificationBar
        notification={notification}
        setNotification={setNotification}
      />
    </ThemeProvider>
  );
};

export default App;
