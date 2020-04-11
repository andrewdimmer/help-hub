import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import Organization from "../Layouts/Organization";
import EditOrganization from "../Layouts/EditOrganization";

const ManageOrganizations: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  setNotification,
  setLoadingMessage,
}) => {
  const [editOrganizationData, setEditOrganizationData] = React.useState(null);
  const [eventOrganizationId, setEventOrganizationId] = React.useState(null);

  const handleLoadOrganizationData = () => {};

  const [organizations, setOrganizations] = React.useState([
    {
      photoUrl:
        "https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png",
      organizationEmail: "email@email.com",
      organizationPhone: "(123) 456-7890",
      organizationId: "1",
      organizationName: "CIDL",
      organizationDescription: "We do book things",
    },
    {
      photoUrl:
        "https://i.pinimg.com/280x280_RS/df/a1/d1/dfa1d1e16805eb82a18f83641e08fc09.jpg",
      organizationEmail: "email@email.com",
      organizationPhone: "(123) 456-7890",
      organizationId: "2",
      organizationName: "Creations Unleashed",
      organizationDescription: "Bringing new life to old kits",
    },
    {
      photoUrl:
        "https://pbs.twimg.com/profile_images/1092454427049578499/SMRmdbPX_400x400.jpg",
      organizationEmail: "email@email.com",
      organizationPhone: "(123) 456-7890",
      organizationId: "3",
      organizationName: "Sesame Street",
      organizationDescription: "A hit PBS Kids show",
    },
  ]);
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Manage Organizations</Typography>
      </Container>
      {organizations.map((value, index) => {
        return (
          <Organization
            setNotification={setNotification}
            key={value.organizationId}
            setEventOrgId={setEventOrganizationId}
            setEditOrganizationData={setEditOrganizationData}
            organizationData={organizations[index]}
            classes={classes}
          ></Organization>
        );
      })}
      <EditOrganization
        currentOrganizationData={editOrganizationData}
        setNotification={setNotification}
        setLoadingMessage={setLoadingMessage}
        setCurrentOrganizationData={setEditOrganizationData}
        handleLoadOrganizationData={handleLoadOrganizationData}
        classes={classes}
      ></EditOrganization>
    </Fragment>
  );
};

export default ManageOrganizations;
