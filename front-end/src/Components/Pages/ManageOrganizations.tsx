import { Button, Container, Typography } from "@material-ui/core";
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { createNewOrganization } from "../../Scripts/firebaseCreateNewOrganization";
import { getOrganizationsByUser } from "../../Scripts/firebaseGetOrganizations";
import { OrganizationDataWithManagers } from "../../Scripts/firebaseOrganizationTypes";
import EditOrganization from "../Layouts/EditOrganization";
import Organization from "../Layouts/Organization";
import OrganizationEvents from "../Layouts/OrganizationEvents";

const ManageOrganizations: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  setNotification,
  setLoadingMessage,
}) => {
  const [editOrganizationId, setEditOrganizationId] = React.useState<string>(
    ""
  );
  const [eventOrganizationId, setEventOrganizationId] = React.useState<string>(
    ""
  );
  const [organizations, setOrganizations] = React.useState<
    OrganizationDataWithManagers[] | null
  >(null);
  const [gettingOrganizations, setGettingOrganizations] = React.useState<
    boolean
  >(false);

  const getUserOrganizations = () => {
    if (!gettingOrganizations) {
      if (currentUserProfile) {
        setGettingOrganizations(true);
        setLoadingMessage("Getting Your Organizations...");
        getOrganizationsByUser(currentUserProfile.userId)
          .then((userOrganizations) => {
            if (userOrganizations) {
              setOrganizations(userOrganizations);
              setLoadingMessage("");
              setGettingOrganizations(false);
            } else {
              setNotification({
                type: "warning",
                message:
                  "Error getting your organizations. Please try again later.",
                open: true,
              });
              setLoadingMessage("");
              setGettingOrganizations(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setNotification({
              type: "warning",
              message:
                "Error getting your organizations. Please try again later.",
              open: true,
            });
            setLoadingMessage("");
            setGettingOrganizations(false);
          });
      } else {
        setNotification({
          type: "warning",
          message:
            "Unable to get your organizations. Try signing out and signing back in.",
          open: true,
        });
        setLoadingMessage("");
        setGettingOrganizations(false);
      }
    }
  };

  const handleLoadOrganizationData = () => {
    getUserOrganizations();
  };

  const getOrganizationDataFromId = (
    organizationId: string,
    organizations: OrganizationDataWithManagers[] | null
  ): OrganizationDataWithManagers => {
    if (organizations) {
      for (const organization of organizations) {
        if (organization.organizationId === organizationId) {
          return organization;
        }
      }
    }
    return {
      organizationId: "",
      organizationName: "",
      organizationDescription: "",
      email: "",
      phone: "",
      photoUrl: "",
      managers: [],
    };
  };

  const createOrganization = () => {
    if (currentUserProfile) {
      setLoadingMessage("Creating New Organization...");
      const organizationId = nanoid();
      createNewOrganization(currentUserProfile.userId, {
        organizationId,
        organizationName: "",
        organizationDescription: "",
        email: "",
        phone: "",
        photoUrl: "",
      })
        .then((value) => {
          if (value) {
            setNotification({
              type: "info",
              message:
                "Almost there! Please complete the form below to finish creating your organization.",
              open: true,
            });
            setEditOrganizationId(organizationId);
            handleLoadOrganizationData();
            setLoadingMessage("");
          } else {
            setNotification({
              type: "error",
              message:
                "Unable to finish creating your organization. Please try again later.",
              open: true,
            });
            setLoadingMessage("");
          }
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message:
              "Unable to finish creating your organization. Please try again later.",
            open: true,
          });
          setLoadingMessage("");
        });
    } else {
      setNotification({
        type: "error",
        message:
          "Unable to finish creating your organization. Try signing out and signing back in.",
        open: true,
      });
    }
  };

  if (organizations === null) {
    setTimeout(() => {
      setGettingOrganizations(true);
      getUserOrganizations();
    }, 1);
  }

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Manage Organizations</Typography>
      </Container>
      {organizations !== null &&
        organizations.map((value, index) => {
          return (
            <Organization
              setNotification={setNotification}
              setEditOrganizationId={setEditOrganizationId}
              setEventOrganizationId={setEventOrganizationId}
              organizationData={value}
              key={value.organizationId}
              classes={classes}
            ></Organization>
          );
        })}
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Create New Organizations</Typography>
      </Container>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        size="large"
        className={classes.margined}
        onClick={createOrganization}
      >
        <Typography variant="h4">Create a New Organization</Typography>
      </Button>
      {editOrganizationId.length > 0 && (
        <EditOrganization
          currentOrganizationId={editOrganizationId}
          currentOrganizationData={getOrganizationDataFromId(
            editOrganizationId,
            organizations
          )}
          setNotification={setNotification}
          setLoadingMessage={setLoadingMessage}
          setCurrentOrganizationId={setEditOrganizationId}
          handleLoadOrganizationData={handleLoadOrganizationData}
          classes={classes}
        ></EditOrganization>
      )}
      {eventOrganizationId.length > 0 && (
        <OrganizationEvents
          currentOrganizationId={eventOrganizationId}
          setNotification={setNotification}
          setLoadingMessage={setLoadingMessage}
          setCurrentOrganizationId={setEventOrganizationId}
          classes={classes}
        />
      )}
    </Fragment>
  );
};

export default ManageOrganizations;
