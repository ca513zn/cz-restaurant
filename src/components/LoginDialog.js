import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  DialogContent,
  TextField,
  Box,
  Typography
} from "@material-ui/core";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Formik } from 'formik';

const LoginDialog = ({ open, handleClose }) => {
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Bienvenido!</DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} display="flex" justifyContent="center">
          <Button
            onClick={handleGoogleClick}
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
        <Box mb={1}>
          <TextField variant="outlined" fullWidth label="Usuario" />
        </Box>
        <TextField variant="outlined" fullWidth label="Contrasena" />
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
