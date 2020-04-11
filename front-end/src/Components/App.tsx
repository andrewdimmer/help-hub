import { Button, Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { firebaseApp } from "../Scripts/firebaseConfig";
import { getUserProfileDatabase } from "../Scripts/firebaseGetUserProfile";
import { UserProfile } from "../Scripts/firebaseUserTypes";
import { getGoogleCalendarAuthToken } from "../Scripts/googleCalendarAuth";
import { styles } from "../Styles";
import NavBar from "./Layouts/NavBar";
import LoadingScreen from "./Misc/LoadingScreen";
import NotificationBar, { NotificationMessage } from "./Misc/Notifications";
import { getPageComponent, getPageTitle } from "./Pages";

declare interface AppProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const App: React.FunctionComponent<AppProps> = ({ theme, toggleTheme }) => {
  const [notification, setNotification] = React.useState<NotificationMessage>({
    type: "info",
    message: "",
    open: false,
  });
  const [loadingMessage, setLoadingMessage] = React.useState<string>("");
  const [pageKey, setPageKey] = React.useState<string>("home");
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [
    currentUserProfile,
    setCurrentUserProfile,
  ] = React.useState<UserProfile | null>(null);
  const [reloadUserData, setReloadUserData] = React.useState<boolean>(true);
  const [authorizing, setAuthorizing] = React.useState<boolean>(false);
  const PageContent = getPageComponent(pageKey);
  const classes = styles();

  const forceReloadUserData = () => {
    setReloadUserData(true);
  };

  const handleLoadUserData = (userId: string) => {
    if (userId) {
      getUserProfileDatabase(userId)
        .then((data) => {
          setCurrentUserProfile(data);
        })
        .catch(() => {
          setCurrentUserProfile(null);
        });
    }
  };

  /**
   * handleProcessAuthToken
   * Processes the return data from the OAuth login, and saves the token if the token exists.
   * Note that this method refreshes the page, and it needs to be restored from the cookie.
   */
  const handleProcessAuthToken = () => {
    const url = window.location.href;
    const userId = window.localStorage.getItem("userId");
    const codeStartIndex = url.indexOf("?code=") + 6;
    const codeStopIndex = url.indexOf("&scope=");
    setLoadingMessage("Getting Access Token...");
    const oauthFromURL = url.substring(codeStartIndex, codeStopIndex);
    window.localStorage.removeItem("userId");
    if (oauthFromURL.indexOf("4/") === 0) {
      getGoogleCalendarAuthToken(
        oauthFromURL,
        userId ? userId : "",
        window.location.href.indexOf("localhost") >= 0
      )
        .then(() => {
          setNotification({
            message:
              "Successfully Connected your Google Calendar Account to Volunteer Here",
            type: "success",
            open: true,
          });
          window.location.href = "../";
        })
        .catch(() => {
          setNotification({
            message:
              "Unable to get token at this time. Please try again later!",
            type: "error",
            open: true,
          });
          window.location.href = "../";
        });
    } else {
      setLoadingMessage("");
      setNotification({
        message: "Unable to get token. This account may already be authorized.",
        type: "warning",
        open: true,
      });
      window.location.href = "../";
    }
  };

  const loadUserData = () => {
    if (reloadUserData) {
      const oneTimeLoadListener = firebaseApp
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            setCurrentUser(user);
            handleLoadUserData(user?.uid);
          } else {
            setCurrentUser(null);
            setCurrentUserProfile(null);
          }
          oneTimeLoadListener(); // Removes the listener after it runs
        });
      setReloadUserData(false);
    }
  };

  const handleChangePageKey = (pageKey: string) => {
    // window.localStorage.setItem("pageKey", pageKey); // TODO: Add in the future, but do not need now.
    setPageKey(pageKey);
  };

  // On Load
  setTimeout(() => {
    // Load Data
    loadUserData();

    // Handle Routing
    const url = window.location.href;
    if (url.includes("auth") && !authorizing) {
      setAuthorizing(true);
      handleProcessAuthToken();
    } else if (url.includes("terms")) {
      handleChangePageKey("terms");
      window.location.href = "../";
    } else if (url.includes("privacy")) {
      handleChangePageKey("privacy");
      window.location.href = "../";
    }
  }, 1);

  return (
    <Fragment>
      <NavBar
        pageTitle={getPageTitle(pageKey)}
        handleChangePageKey={handleChangePageKey}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUserProfile={currentUserProfile}
      />
      <Container className={classes.marginedTopBottom}>
        <PageContent
          handleChangePageKey={handleChangePageKey}
          setLoadingMessage={setLoadingMessage}
          setNotification={setNotification}
          forceReloadUserData={forceReloadUserData}
          handleLoadUserData={handleLoadUserData}
          currentUser={currentUser}
          currentUserProfile={currentUserProfile}
          classes={classes}
        />
        {pageKey !== "home" && (
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            size="large"
            className={classes.margined}
            onClick={() => {
              handleChangePageKey("home");
            }}
          >
            <Typography variant="h4">Return to Home</Typography>
          </Button>
        )}
        <Container className={classes.pageTitle}>
          <Button
            variant="outlined"
            className={classes.margined}
            onClick={() => {
              handleChangePageKey("privacy");
            }}
          >
            Privacy Policy
          </Button>
        </Container>
      </Container>
      <LoadingScreen loadingMessage={loadingMessage} />
      <NotificationBar
        notification={notification}
        setNotification={setNotification}
      />
    </Fragment>
  );
};

export default App;
