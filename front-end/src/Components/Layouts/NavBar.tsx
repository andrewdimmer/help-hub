import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React from "react";
import { UserProfile } from "../../Scripts/firebaseUserTypes";
import SquareAvatar from "../Misc/SquareAvatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

declare interface NavBarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  currentUserProfile: UserProfile | null;
  setPageKey: (pageKey: string) => void;
  pageTitle: string;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({
  theme,
  toggleTheme,
  currentUserProfile,
  setPageKey,
  pageTitle,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {pageTitle ? `${pageTitle} - ` : ""}Volunteer Here
          </Typography>

          <div>
            <IconButton
              aria-label="Toggle light/dark theme"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleTheme}
              color="inherit"
            >
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {currentUserProfile ? (
                <div style={{ width: "24px", height: "24px" }}>
                  <SquareAvatar
                    alt={
                      currentUserProfile?.displayName
                        ? currentUserProfile.displayName
                        : ""
                    }
                    src={
                      currentUserProfile?.photoURL
                        ? currentUserProfile.photoURL
                        : ""
                    }
                    centerInContainer={true}
                    maxHeightPercentageOfScreen={50}
                    maxWidthPercentageOfParent={100}
                    maxWidthPercentageOfScreen={50}
                  />
                </div>
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {!currentUserProfile && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setPageKey("login");
                  }}
                >
                  Join or Login
                </MenuItem>
              )}
              {currentUserProfile && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setPageKey("events");
                  }}
                >
                  Volunteer
                </MenuItem>
              )}
              {currentUserProfile && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setPageKey("organizations");
                  }}
                >
                  Manage Organizations
                </MenuItem>
              )}
              {currentUserProfile && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setPageKey("profile");
                  }}
                >
                  Profile
                </MenuItem>
              )}
              {currentUserProfile && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setPageKey("logout");
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
