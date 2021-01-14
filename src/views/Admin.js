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
  Avatar,
  Container,
} from "@material-ui/core";
import clsx from "clsx";
import AddProductForm from "../components/AddProductForm";
import useFetchMenu from "../hooks/useFetchMenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Delete, Edit } from "@material-ui/icons";
import EditProductForm from "../components/EditProductForm";
import { db } from "../lib/firebase";
import Page from "../components/Page";
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
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
const Admin = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleOpenCollapse = (i) => {
    setOpenIndex(i);
  };
  const handleCloseCollapse = () => {
    setOpenIndex(null);
  };
  const { results, loading } = useFetchMenu(page);

  if (!user) {
    return <Redirect to="/inicio" />;
  }

  const handleDelete = async (id) => {
    await db.collection("products").doc(id).delete();
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Page>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              Admin
            </Typography>
          </Grid>
          <Grid item>
            <AddProductForm
              setPage={() => setPage((prevPage) => prevPage + 1)}
            />
          </Grid>
          <Grid item>
            <Card raised>
              <CardHeader title={"Editar Productos"} />
              <Divider />
              {loading && <CircularProgress />}
              {results.map((el, i) => {
                return (
                  <div key={"producto-" + i}>
                    <Grid item>
                      <Card>
                        <CardHeader
                          avatar={<Avatar src={el.url} />}
                          title={el.nombre}
                          subheader={
                            el.categoria.charAt(0).toUpperCase() +
                            el.categoria.slice(1)
                          }
                          action={
                            <Box display="flex" alignItems="center">
                              <IconButton
                                onClick={
                                  i === openIndex
                                    ? handleCloseCollapse
                                    : () => handleOpenCollapse(i)
                                }
                              >
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(el.id)}>
                                <Delete />
                              </IconButton>
                            </Box>
                          }
                        />
                        <Collapse in={openIndex === i}>
                          <EditProductForm product={el} />
                        </Collapse>
                      </Card>
                    </Grid>
                    <Divider />
                  </div>
                );
              })}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Admin;
