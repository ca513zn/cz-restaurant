import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  IconButton,
  Button,
  Container,
  Tooltip,
} from "@material-ui/core";
import moment from "moment";
import DatePicker from "../components/DatePicker";
import { DeleteOutline, Today } from "@material-ui/icons";
import Page from "../components/Page";
import useAuth from "../hooks/useAuth";
import LoginDialog from "../components/LoginDialog";
import useShop from "../hooks/useShop";

const Reservaciones = () => {
  const { isAuthenticated } = useAuth();

  const { reservaciones } = useShop();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              </Button>{" "}
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
          <Grid item>
            <DatePicker />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Box width={1} display="flex" justifyContent="center">
              <Card style={{ width: "100%", maxWidth: "420px" }}>
                <CardHeader
                  avatar={<Today />}
                  title={moment(reservaciones).format("MMM DD YYYY")}
                  subheader={moment(reservaciones).format("HH:MM")}
                  action={
                    <Tooltip title="Borrar Reservacion">
                      <IconButton>
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardHeader
                  title={"Nombre del Cliente"}
                  subheader={"Personas: 5"}
                />
                <Divider />
                <CardHeader
                  action={
                    <Typography variant="overline">
                      Reservacion No: 12354
                    </Typography>
                  }
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Reservaciones;
