import React, { useState } from "react";
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
  InputAdornment,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import {
  AccountCircle,
  Email,
  Home,
  Phone,
  Security,
} from "@material-ui/icons";

const LoginDialog = ({ open, handleClose }) => {
  const [step, setStep] = useState("login");
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
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
              label="Usuario"
            />
          </Grid>
          <Grid item>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <Security />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
              label="Contrasena"
            />
          </Grid>
          {step === "register" && (
            <>
              <Grid item>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  label="Telefono"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Correo Electronico"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Domicilio"
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Security />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  label="Contrasena"
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Security />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  label="Repite Contrasena"
                />
              </Grid>
            </>
          )}
          {step === "login" && (
            <Grid item>
              <Typography
                variant="overline"
                style={{ cursor: "pointer" }}
                onClick={() => setStep("register")}
              >
                No tienes Cuenta? Registrate Aqui.
              </Typography>
            </Grid>
          )}
          {step === "register" && (
            <Grid item>
              <Typography
                variant="overline"
                style={{ cursor: "pointer" }}
                onClick={() => setStep("login")}
              >
                Ya tienes Cuenta? Ingresa Aqui.
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          {step === "register" && "Registar"}
          {step === "login" && "Ingresar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
