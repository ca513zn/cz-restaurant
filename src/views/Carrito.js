import React from "react";
import useShop from "../hooks/useShop";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Paper,
  Box,
} from "@material-ui/core";

const Carrito = () => {
  const { carrito } = useShop();

  return (
    <Paper style={{ height: "95vh", padding: 8 }}>
      <Grid container spacing={2}>
        {carrito.length ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                  Mi Carrito
                </Typography>
              </Grid>
              {carrito.map((el, i) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Card raised>
                      <CardHeader
                        title={el.item.nombre}
                        avatar={<Typography>{el.cantidad}</Typography>}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="overline">
                          Precio: ${el.item.precio}
                        </Typography>
                        <br />
                        <Typography variant="overline">
                          Sub-Total: ${el.item.precio * el.cantidad}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box p={2}>
                  <Typography variant="h5" textAlign="center" gutterBottom>
                    Total productos:{" "}
                    {carrito.reduce((acc, val) => {
                      return parseInt(acc) + parseInt(val.cantidad);
                    }, 0)}
                  </Typography>
                  <br />
                  <Typography variant="h5" textAlign="center" gutterBottom>
                    Total: $
                    {carrito.reduce((acc, val) => {
                      return (
                        parseInt(acc) +
                        parseInt(val.cantidad) * parseInt(val.item.precio)
                      ).toFixed(2);
                    }, 0)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Aun no tienes compras en tu carrito.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Carrito;
