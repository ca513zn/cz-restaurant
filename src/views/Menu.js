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
} from "@material-ui/core";
import { RestaurantMenu } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { entradas, bebidas } from "../menuItems";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import useAuth from "../hooks/useAuth";
import LoginDialog from "../components/LoginDialog";
import useFetchMenu from "../hooks/useFetchMenu";

const Menu = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { results, loading, error } = useFetchMenu(page);
  const [opcion, setOpcion] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(user);

  const handleChange = (e, value) => {
    setOpcion(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const MenuCard = ({ el, i }) => {
    return (
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card raised>
          <CardHeader title={el.nombre} />
          <CardMedia
            style={{
              height: 0,
              paddingTop: "56.25%", // 16:9
            }}
            image={el.url}
          />
          <CardContent>
            <Typography gutterBottom variant="body1">
              {el.descripcion}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating size="small" max={5} readOnly value={el.popularidad} />
              <Box flexGrow={1} />
              {el.refresco && (
                <Chip
                  color="primary"
                  label="Refresco"
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
              color="primary"
              variant="outlined"
              endIcon={<RestaurantMenu />}
              onClick={handleOpen}
            >
              Ordenar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Box p={1}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <Box p={1}>
        <Tabs value={opcion} indicatorColor="primary" onChange={handleChange}>
          <Tab label="Entradas" />
          <Tab label="Bebidas" />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        {opcion === 0 && (
          <>
            {entradas.map((el, i) => {
              return <MenuCard key={"comida-" + i} el={el} i={i} />;
            })}
          </>
        )}
        {opcion === 1 && (
          <>
            {bebidas.map((el, i) => {
              return <MenuCard key={"comida-" + i} el={el} i={i} />;
            })}
          </>
        )}
      </Grid>
      <LoginDialog open={open} handleClose={handleClose} />
    </>
  );
};
export default Menu;
