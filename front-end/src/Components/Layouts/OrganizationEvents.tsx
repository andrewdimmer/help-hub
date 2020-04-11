import {
    Button,
    Card,
    Container,
    Grid,
    Typography,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Fab,
    makeStyles,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    List,
    Divider,
  } from "@material-ui/core";
  import React, { Fragment } from "react";
  import { NotificationMessage } from "../Misc/Notifications";
  import EditIcon from "@material-ui/icons/Edit";
  import classes from "*.module.css";
  import CloseIcon from "@material-ui/icons/Close";
  interface EventInfoProps {
    setNotification: (notification: NotificationMessage) => void;
    currentOrganizationData: any;
    setCurrentOrganizationData: any;
    setLoadingMessage: any;
    handleLoadOrganizationData: any;
    classes: any;
  }
  
  const Organization: React.FunctionComponent<EventInfoProps> = ({
    setNotification,
    currentOrganizationData,
    setCurrentOrganizationData,
    setLoadingMessage,
    handleLoadOrganizationData,
    classes,
  }) => {
    const handleClose = () => {
      setCurrentOrganizationData(null);
    };
  
    return (
      <Fragment>
        <Dialog
          fullScreen
          open={currentOrganizationData !== null}
          onClose={handleClose}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Events
              </Typography>
            </Toolbar>
          </AppBar>
          <Container className={classes.pageTitle}>
          </Container>
          <Container>
            
          </Container>
        </Dialog>
      </Fragment>
    );
  };
  
  export default Organization;
  