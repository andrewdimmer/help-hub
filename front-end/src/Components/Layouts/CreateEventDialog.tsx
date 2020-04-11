import {
  AppBar,
  Container,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { Fragment } from "react";
import { NotificationMessage } from "../Misc/Notifications";
import CreateEvent from "./CreateEvent";

declare interface CreateEventDialogProps {
  organizationId: string;
  setNotification: (notification: NotificationMessage) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  getOrganizationEvents: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  classes: any;
}

const CreateEventDialog: React.FunctionComponent<CreateEventDialogProps> = ({
  organizationId,
  setNotification,
  setLoadingMessage,
  getOrganizationEvents,
  open,
  setOpen,
  classes,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog fullScreen open={open} onClose={handleClose}>
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
              Create New Event
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.marginedPadded}>.</Container>
        <CreateEvent
          organizationId={organizationId}
          setLoadingMessage={setLoadingMessage}
          setNotification={setNotification}
          getOrganizationEvents={getOrganizationEvents}
          handleClose={handleClose}
        />
      </Dialog>
    </Fragment>
  );
};

export default CreateEventDialog;
