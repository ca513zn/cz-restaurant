import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Drawer from "./Drawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          <Typography variant="h6" className={classes.title}>
            Restaurante Monse
          </Typography>
          <Box display={{ xs: "none", sm: "none", md: "block" }}>
            <Button
              component={RouterLink}
              to="/acerca"
              color="inherit"
              variant="outlined"
            >
              Acerca De
            </Button>
            <Button color="inherit" variant="outlined">
              Menu
            </Button>
            <Button color="inherit" variant="outlined">
              Medidas de seguridad Covid-19
            </Button>
            <Button color="inherit" variant="outlined">
              Reservaciones
            </Button>
          </Box>
          <Button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
            color="inherit"
          >
            Login
          </Button>
          {/* <Button startIcon={<AccountCircleIcon />} color="inherit">
            Mario A.
          </Button> */}
        </Toolbar>
      </AppBar>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <pre style={{ height: 300, overflow: "auto" }}>
              {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
            </pre>
          );
        }}
      </FirebaseAuthConsumer>
      <div>
        <IfFirebaseAuthed>
          {() => {
            return <div>You are authenticated</div>;
          }}
        </IfFirebaseAuthed>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => providerId !== "anonymous"}
        >
          {({ providerId }) => {
            return <div>You are authenticated with {providerId}</div>;
          }}
        </IfFirebaseAuthedAnd>
      </div>
    </div>
  );
}
