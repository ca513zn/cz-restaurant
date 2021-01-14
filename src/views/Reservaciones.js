import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  Divider,
  Dialog,
  makeStyles,
  IconButton,
  Button,
  Container,
  Tooltip,
  Avatar,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import moment from "moment";
import DatePicker from "../components/DatePicker";
import { DeleteOutline, Today } from "@material-ui/icons";
import Page from "../components/Page";
import useAuth from "../hooks/useAuth";
import LoginDialog from "../components/LoginDialog";
import { db } from "../lib/firebase";

const Reservaciones = () => {
  const { isAuthenticated, user } = useAuth();
  const [reservacion, setReservacion] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleSetReservacion = (val) => {
    setReservacion(val);
  };

  const handleDelete = async (id) => {
    await db.collection("reservations").doc(id).delete();
    setReservacion(null);
  };

  if (!isAuthenticated) {
    return (
      <Page>
        <Container>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h4" color="textPrimary">
                Reservaciones
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                Debes ingresar para poder reservar.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleOpen}
                style={{ border: "1px solid red", color: "red" }}
                color="inherit"
                variant="outlined"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
        <LoginDialog handleClose={handleClose} open={open} />
      </Page>
    );
  }
  return (
    <Page>
      <Container>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              Reservaciones
            </Typography>
          </Grid>
          {!reservacion ? (
            <Grid item>
              <DatePicker setReservacion={handleSetReservacion} />
            </Grid>
          ) : (
            <Grid item>
              <Box width={1} display="flex" justifyContent="center">
                <Card style={{ width: "100%", maxWidth: "420px" }}>
                  <CardHeader
                    avatar={<Today />}
                    title={`Reservacion: ${moment(
                      reservacion.reservacion
                    ).format("MMM DD, YYYY")} - ${moment(
                      reservacion.reservacion
                    ).format("HH:MM")}`}
                    subheader={`Reservada el: ${reservacion.fecha}`}
                    action={
                      <Tooltip title="Borrar Reservacion">
                        <IconButton onClick={handleConfirmOpen}>
                          <DeleteOutline color="primary" />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                  <Divider />
                  <CardHeader
                    avatar={<Avatar src={user.avatar} />}
                    title={user.name}
                    subheader={`Personas: ${reservacion.personas}`}
                  />
                  <Divider />
                  <CardHeader
                    action={
                      <Typography variant="overline">
                        Reservacion No: {reservacion.id}
                      </Typography>
                    }
                  />
                </Card>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>
          Estas seguro que quieres cancelar tu reservacion?
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1">Esta accion es irreversible.</Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleConfirmClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete(reservacion.id)
              handleConfirmClose()
            }}
            color="primary"
            variant="outlined"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default Reservaciones;
