import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Drawer from "./Drawer";
import UserMenu from "./UserMenu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledNavItem = withStyles((theme) => ({
  root: {
    marginRight: 16,
    height: "64px",
  },
}))(Button);

export default function ButtonAppBar() {
  const { isAuthenticated } = useAuth();
  const classes = useStyles();
  console.log(isAuthenticated);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box display={{ xs: "block", md: "none" }}>
            <Drawer />
          </Box>
          <Typography variant="h6" className={classes.title}>
            Restaurante Monse
          </Typography>
          <Box display={{ xs: "none", sm: "none", md: "block" }}>
            <StyledNavItem component={RouterLink} to="/acerca" color="inherit">
              Acerca De
            </StyledNavItem>
            <StyledNavItem component={RouterLink} to="/menu" color="inherit">
              Menu
            </StyledNavItem>
            <StyledNavItem color="inherit">
              Medidas de seguridad Covid-19
            </StyledNavItem>
            <StyledNavItem color="inherit">Reservaciones</StyledNavItem>
          </Box>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
              color="inherit"
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
