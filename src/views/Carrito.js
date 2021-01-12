import React, { useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  DialogContent,
  Avatar,
  TextField,
  CircularProgress,
  Container,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  Delete,
  RestaurantMenu,
  SettingsEthernetSharp,
  SettingsRemoteSharp,
} from "@material-ui/icons";
import Page from "../components/Page";

const Carrito = () => {
  const { carrito } = useShop();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagado, setPagado] = useState(false);

  const totalPago = carrito.reduce((acc, val) => {
    return (
      parseInt(acc) +
      parseInt(val.cantidad) * parseInt(val.item.precio)
    ).toFixed(2);
  }, 0);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPagado(true);
    }, 3000);
  };

  const handleOxxoPay = () => {
    setStep(3);
  };

  const [value, setValue] = React.useState("tarjeta");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <Page>
      <Container>
        <Grid container spacing={2} justify="center">
          {!carrito.length ? (
            <Grid item>
              <Box mt={1}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Aun no tienes compras en tu carrito.
                </Typography>
                <Button
                  fullWidth
                  color="primary"
                  startIcon={<RestaurantMenu />}
                  variant="outlined"
                  to="/menu"
                  component={RouterLink}
                >
                  Ir a menu
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid item>
              <Box mt={1}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Mi Carrito ({carrito.length})
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {carrito.map((el, i) => (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card raised>
                      <CardHeader
                        title={`${el.cantidad} - ${el.item.nombre}`}
                        avatar={
                          <IconButton>
                            <Delete />
                          </IconButton>
                        }
                        subheader={`@ $${el.item.precio}.00`}
                        action={
                          <Box p={1}>
                            <Typography variant="h6">
                              ${el.item.precio * el.cantidad}
                            </Typography>
                          </Box>
                        }
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box m={3} display="flex" alignItems="center">
                <Typography color="textPrimary" variant="h5">
                  Total:
                </Typography>
                <Box flexGrow={1} />
                <Typography color="textPrimary" variant="h5">
                  ${totalPago}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
          {step === 1 && (
            <>
              <DialogTitle>Seleccione su forma de pago:</DialogTitle>
              <Divider />
              <DialogContent>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="oxxo"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="tarjeta"
                      control={<Radio color="primary" />}
                      label={<Typography variant="body1">Tarjeta</Typography>}
                    />
                    <FormControlLabel
                      value="oxxo"
                      control={<Radio color="primary" />}
                      label={
                        <Avatar
                          style={{ width: 72, height: 32 }}
                          src="https://upload.wikimedia.org/wikipedia/commons/6/66/Oxxo_Logo.svg"
                          variant="rounded"
                        />
                      }
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio color="primary" />}
                      label={
                        <Avatar
                          style={{ width: 72, height: 32 }}
                          src="https://i1.wp.com/www.financialgazette.co.zw/wp-content/uploads/2018/10/paypal-logo-255x143.png?fit=255%2C143&ssl=1"
                          variant="rounded"
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNextStep}
                >
                  Aceptar
                </Button>
              </DialogActions>
            </>
          )}
          {step === 2 && (
            <>
              <DialogTitle>
                {value === "oxxo" && "Muestra este Codigo:"}
                {value === "tarjeta" && "Ingrese sus datos:"}
                {value === "paypal" && "Ingrese su cuenta PayPal:"}
              </DialogTitle>
              <Divider />
              <DialogContent>
                {loading ? (
                  <Box
                    m={2}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography variant="h5" textAlign="center" gutterBottom>
                      Procesando Pago...
                    </Typography>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {pagado ? (
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                      >
                        <Typography
                          variant="h5"
                          textAlign="center"
                          gutterBottom
                        >
                          Gracias por su compra!
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <Box
                          m={2}
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                          width="100%"
                        >
                          {value == "oxxo" && (
                            <Typography
                              variant="h5"
                              textAlign="center"
                              gutterBottom
                            >
                              444HG-G442D-DAS33
                            </Typography>
                          )}
                        </Box>
                        {value == "paypal" && (
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Correo Electronico"
                          />
                        )}
                        <Box mt={2} ml={1}>
                          <Typography
                            variant="h5"
                            textAlign="center"
                            gutterBottom
                          >
                            Total: $
                            {carrito.reduce((acc, val) => {
                              return (
                                parseInt(acc) +
                                parseInt(val.cantidad) *
                                  parseInt(val.item.precio)
                              ).toFixed(2);
                            }, 0)}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </>
                )}
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => setStep(1)}>Atras</Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={value === "oxxo" ? handleOxxoPay : handleLoading}
                >
                  Pagar
                </Button>
              </DialogActions>
            </>
          )}
          {step === 3 && (
            <>
              <DialogTitle>Ingresa tu Codigo de OXXO:</DialogTitle>
              <Divider />
              <DialogContent>
                {loading ? (
                  <Box
                    m={2}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography variant="h5" textAlign="center" gutterBottom>
                      Procesando Pago...
                    </Typography>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {pagado ? (
                      <Box
                        m={2}
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                      >
                        <Typography
                          variant="h5"
                          textAlign="center"
                          gutterBottom
                        >
                          Gracias por su compra!
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Codigo OXXO"
                        />
                      </>
                    )}
                  </>
                )}
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => setStep(1)}>Atras</Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={
                    value === "oxxo" && step !== 3
                      ? handleOxxoPay
                      : handleLoading
                  }
                >
                  Pagar
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Page>
  );
};

export default Carrito;
