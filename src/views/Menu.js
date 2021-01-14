import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Divider,
  Box,
  Typography,
  Tabs,
  Tab,
  makeStyles,
  Paper,
  Container,
} from "@material-ui/core";
import { RestaurantMenu } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { bebidas } from "../menuItems";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import useAuth from "../hooks/useAuth";
import LoginDialog from "../components/LoginDialog";
import useFetchMenu from "../hooks/useFetchMenu";
import OrderDialog from "../components/OrderDialog";
import Page from "../components/Page";

const useStyles = makeStyles(() => ({
  media: {
    transition: "all 0.8s",
    "&:hover": {
      transform: "scale(1.2)",
    },
    height: 0,
    paddingTop: "56.25%",
  },
  fadeIn: {
    animation: "$fadeIn 1.5s",
  },
  "@keyframes fadeIn": {
    "0%": { transform: "translateY(15px)", opacity: 0 },
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const page = 1;
  const [orderDialog, setOrderDialog] = useState(null);
  const { results } = useFetchMenu(page);
  const [opcion, setOpcion] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (e, value) => {
    setOpcion(value);
  };
  const handleClose = () => {
    setOpen(false);
    setOrderDialog(false);
  };
  const handleOpen = (i) => {
    isAuthenticated ? setOrderDialog(i) : setOpen(true);
  };

  const MenuCard = ({ el, i }) => {
    return (
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card raised>
          <CardHeader title={el.nombre} />
          <Box overflow="hidden">
            <CardMedia className={classes.media} image={el.url} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="body1">
              {el.descripcion}
            </Typography>
          </CardContent>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Rating size="small" max={5} readOnly value={el.popularidad} />
              <Box flexGrow={1} />
              {el.refresco && (
                <Chip
                  label="Incluye Refresco"
                  size="small"
                  icon={<FastfoodIcon />}
                />
              )}
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Chip
              color="primary"
              label={`$ ${el.precio}.00`}
              size="small"
              variant="outlined"
            />
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              endIcon={<RestaurantMenu />}
              onClick={() => handleOpen(i)}
            >
              Ordenar
            </Button>
          </CardActions>
        </Card>
        <OrderDialog
          open={orderDialog === i}
          handleClose={handleClose}
          item={el}
        />
      </Grid>
    );
  };

  return (
    <Page>
      <Container>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              Menu
            </Typography>
          </Grid>
          <Grid item>
            <Tabs
              value={opcion}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
            >
              <Tab label="Entradas" />
              <Tab label="Bebidas" />
            </Tabs>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              {opcion === 0 && (
                <>
                  {results
                    .filter((e) => e.categoria === "entrada")
                    .map((el, i) => {
                      return <MenuCard key={"comida-" + i} el={el} i={i} />;
                    })}
                </>
              )}
              {opcion === 1 && (
                <>
                  {results
                    .filter((e) => e.categoria === "bebida")
                    .map((el, i) => {
                      return <MenuCard key={"comida-" + i} el={el} i={i} />;
                    })}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <LoginDialog open={open} handleClose={handleClose} />
      </Container>
    </Page>
  );
};
export default Menu;
