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

const Managerganizations: React.FunctionComponent<PageProps> = ({
  classes,
  currentUserProfile,
  setNotification,
  setLoadingMessage,
}) => {
  const [editOrgId, setEditOrgId] = React.useState<string>("");
  const [eventOrgId, setEventOrgId] = React.useState<string>("");

  const [organizations, setOrganizations] = React.useState([
    {
      photoUrl:
        "https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png",
      email: "email@email.com",
      phone: "(123) 456-7890",
      organizationId: "1",
      organizationName: "CIDL",
      organizationDesciption: "We do book things",
      key: "1",
    },
    {
      photoUrl:
        "https://i.pinimg.com/280x280_RS/df/a1/d1/dfa1d1e16805eb82a18f83641e08fc09.jpg",
      email: "email@email.com",
      phone: "(123) 456-7890",
      organizationId: "2",
      organizationName: "Creations Unleashed",
      organizationDesciption: "Bringing new life to old kits",
      key: "2",
    },
    {
      photoUrl:
        "https://pbs.twimg.com/profile_images/1092454427049578499/SMRmdbPX_400x400.jpg",
      email: "email@email.com",
      phone: "(123) 456-7890",
      organizationId: "3",
      organizationName: "Sesame Street",
      organizationDesciption: "A hit PBS Kids show",
      key: "3",
    },
  ]);
  return (
    <Fragment>
      <Typography variant="h3">Manage Organizations</Typography>
      {organizations.map((value, index) => {
        return (
          <Organization
            photoUrl={value.photoUrl}
            email={value.email}
            phone={value.phone}
            organizationId={value.organizationId}
            organizationName={value.organizationName}
            organizationDesciption={value.organizationDesciption}
            setNotification={setNotification}
            key={value.key}
            setEventOrgId={setEventOrgId}
            setEditOrgId={setEditOrgId}
          ></Organization>
        );
      })}
      
    </Fragment>
  );
};

export default Managerganizations;
