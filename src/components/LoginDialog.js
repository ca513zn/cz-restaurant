import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  DialogContent,
  TextField,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

const LoginDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Bienvenido!</DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} display="flex" justifyContent="center">
          <Button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase
                .auth()
                .signInWithPopup(googleAuthProvider)
                .then(() => handleClose());
            }}
            variant="outlined"
            startIcon={<img alt="Google" src="/static/images/google.svg" />}
          >
            Entrar con Google
          </Button>
        </Box>
        <Box mb={1}>
          <Typography color="textSecondary" variant="body1" align="center">
            O
          </Typography>
        </Box>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField variant="outlined" fullWidth label="Usuario" />
          </Grid>
          <Grid item>
            <TextField variant="outlined" fullWidth label="Telefono" />
          </Grid>
          <Grid item>
            <TextField variant="outlined" fullWidth label="Contrasena" />
          </Grid>
          <Grid item>
            <TextField variant="outlined" fullWidth label="Domicilio" />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
