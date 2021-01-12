import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import moment from "moment";

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

export default function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <Box width={1} display="flex" justifyContent="center" m={2}>
        <TextField
          color="primary"
          variant="outlined"
          id="datetime-local"
          label="Selecciona una fecha"
          type="datetime-local"
          InputProps={{
            inputProps: {
              min: moment(Date.now()).format("YYYY-MM-DDTHH:MM"),
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
        <Button variant="outlined" color="primary">
          Crear Reservacion
        </Button>
      </Box>
    </form>
  );
}
