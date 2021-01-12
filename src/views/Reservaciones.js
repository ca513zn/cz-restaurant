import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  CircularProgress,
  IconButton,
  Collapse,
  Button,
  Avatar,
  Container,
} from "@material-ui/core";
import clsx from "clsx";
import AddProductForm from "../components/AddProductForm";
import DatePicker from "../components/DatePicker";
import useFetchMenu from "../hooks/useFetchMenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Delete, Edit } from "@material-ui/icons";
import EditProductForm from "../components/EditProductForm";
import { db } from "../lib/firebase";
import Page from "../components/Page";
import useAuth from "../hooks/useAuth";
import LoginDialog from "../components/LoginDialog";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const Reservaciones = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenCollapse = (i) => {
    setOpenIndex(i);
  };
  const handleCloseCollapse = () => {
    setOpenIndex(null);
  };

  const handleDelete = async (id) => {
    await db.collection("products").doc(id).delete();
    setPage((prevPage) => prevPage + 1);
  };

  const { results, loading } = useFetchMenu(page);
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
      </Container>
    </Page>
  );
};

export default Reservaciones;
