import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import AddProductForm from "../components/AddProductForm";
import useFetchMenu from "../hooks/useFetchMenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { results, loading, error } = useFetchMenu(page);
  return (
    <div>
      <Box p={1}>
        <Typography variant="h4">Admin</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card raised>
              <CardHeader
                title={"Editar Productos"}
                action={
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                }
              />
              {loading && <CircularProgress />}
              {results.map((el, i) => {
                return (
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title={el.nombre} />
                    </Card>
                  </Grid>
                );
              })}
            </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AddProductForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
