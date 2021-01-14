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
import useAuth from "../hooks/useAuth";

const LoginDialog = ({ open, handleClose }) => {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuario, setUsuario] = useState("");
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithEmailAndPassword = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch((err) => alert("Datos incorrectos!"));
      handleClose();
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const createUserWithEmailAndPassword = async () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch((err) => alert("El correo ya existe!"));
      handleClose();
      setPassword("");
      setTelefono("");
      setUsuario("");
      setStep("login");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Bienvenido!</DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} display="flex" justifyContent="center">
          <Button
            onClick={() => {
              firebase
                .auth()
                .signInWithPopup(googleAuthProvider)
                .then(() => {
                  handleClose();
                });
            }}
            variant="outlined"
            startIcon={<img alt="Google" src="/static/images/google.svg" />}
          >
            {step === "register" && "Registrar con Google"}
            {step === "login" && "Ingresar con Google"}
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
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {step === "login" && (
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
                type="password"
                label="Contrasena"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          )}
          {step === "register" && (
            <>
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
                  value={usuario}
                  name="usuario"
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </Grid>
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
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
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
                  type="password"
                  label="Repite Contrasena"
                />
              </Grid>
            </>
          )}
          <Grid item>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ cursor: "pointer" }}
              onClick={
                step === "login"
                  ? () => setStep("register")
                  : () => setStep("login")
              }
            >
              {step === "login" && "No tienes cuenta? Registrate aquí."}
              {step === "register" && "Ya tienes cuenta? Ingresa aquí."}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={
            step === "register"
              ? createUserWithEmailAndPassword
              : signInWithEmailAndPassword
          }
        >
          {step === "register" && "Registar"}
          {step === "login" && "Ingresar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
