import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import moment from "moment";
import { db } from "../lib/firebase";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function DateAndTimePickers({ setReservacion }) {
  const classes = useStyles();
  const { user } = useAuth();
  const [values, setValues] = useState({
    fecha: moment(Date.now()).add(1, "hour").format("YYYY-MM-DDTHH:MM"),
    personas: 1,
  });

  const handleValueChange = (key, value) => {
    console.log(value);
    setValues((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const handleAddReservation = async () => {
    await db
      .collection("reservations")
      .doc()
      .set({
        reservacion: values.fecha,
        personas: values.personas,
        fecha: moment(Date.now()).format("MMM, DD, YYYY"),
        nombre: user.name,
      });
    getReservations();
  };

  //Este useEffect se ejecuta una vez cada vez que carga la pagina
  //el proposito es hacer una llamada a la base de datos para ver si
  //el usuario ya tiene una reservacion
  const getReservations = async () => {
    const citiesRef = db.collection("reservations");
    const snapshot = await citiesRef.where("nombre", "==", user.name).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      setReservacion({ id: doc.id, ...doc.data() });
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getReservations();
  }, []);

  return (
    <form className={classes.container} noValidate>
      <Box width={1} display="flex" justifyContent="center" m={2}>
        <TextField
          color="primary"
          variant="outlined"
          value={values.fecha}
          id="datetime-local"
          label="Selecciona una fecha"
          type="datetime-local"
          onChange={(e) => handleValueChange("fecha", e.target.value)}
          InputProps={{
            inputProps: {
              min: moment(Date.now()).add(1, "hour").format("YYYY-MM-DDTHH:MM"),
              max: moment(Date.now()).add(1, "year").format("YYYY-MM-DDTHH:MM"),
            },
          }}
          defaultValue={moment(Date.now()).format("YYYY-MM-DDTHH:MM")}
          InputLabelProps={{
            shrink: true,
            color: "primary",
          }}
        />
      </Box>
      <Box width={1} display="flex" justifyContent="center" m={2}>
        <TextField
          color="primary"
          value={values.personas}
          onChange={(e) => handleValueChange("personas", e.target.value)}
          variant="outlined"
          id="personas"
          label="Personas"
          type="number"
          style={{
            width: "100%",
            maxWidth: "270px",
          }}
          InputProps={{
            inputProps: {
              min: 1,
              max: 20,
            },
          }}
          defaultValue={1}
        />
      </Box>
      <Box width={1} display="flex" justifyContent="center" m={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddReservation}
        >
          Crear Reservacion
        </Button>
      </Box>
    </form>
  );
}
