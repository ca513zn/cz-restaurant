import {
  Button,
  CardMedia,
  Grid,
  TextField,
  Switch,
  Typography,
  MenuItem,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CircularProgress,
} from "@material-ui/core";

import React, { useState } from "react";
import { db } from "../lib/firebase";
import { Fastfood } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
const AddProductForm = ({ setPage }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  if (error) {
    return <Card>Error loading product</Card>;
  }
  return (
    <Card raised>
      <CardHeader title="Agregar Producto" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            nombre: "",
            precio: 0,
            popularidad: 3,
            url: "",
            refresco: false,
            descripcion: "",
            categoria: "entrada",
          }}
          validationSchema={Yup.object().shape({
            nombre: Yup.string().max(50).required("El nombre es necesario."),
            url: Yup.string().required("La imagen es necesaria."),
            descripcion: Yup.string()
              .max(255)
              .required("La descripcion es necesaria."),
          })}
          onSubmit={async (values) => {
            const request = async () => {
              setError(false);
              setLoading(true);
              try {
                await db.collection("products").doc().set(values);
                setLoading(false);
                setPage();
              } catch (error) {
                setError(true);
                setLoading(false);
              }
            };
            request();
          }}
        >
          {({ errors, handleChange, handleSubmit, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={values.nombre}
                    label="Nombre del Producto"
                    name="nombre"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={Boolean(touched.nombre && errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={values.precio}
                    label="Precio"
                    name="precio"
                    variant="outlined"
                    fullWidth
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={values.popularidad}
                    label="Popularidad"
                    name="popularidad"
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputProps={{ max: 5, min: 0 }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={values.categoria}
                    label="Categoria"
                    name="categoria"
                    variant="outlined"
                    select
                    fullWidth
                    type="categoria"
                    onChange={handleChange}
                  >
                    <MenuItem value="entrada">Entrada</MenuItem>
                    <MenuItem value="bebida">Bebida</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption">Refresco</Typography>
                  <Grid container justify="center" spacing={2}>
                    <Grid item>
                      <Fastfood color="disabled" />
                    </Grid>
                    <Grid item>
                      <Switch
                        value={values.refresco}
                        checked={values.refresco}
                        name="refresco"
                        onChange={handleChange}
                        color="primary"
                      />
                    </Grid>
                    <Grid item>
                      <Fastfood color="primary" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={values.url}
                    label="Imagen"
                    name="url"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={Boolean(touched.url && errors.url)}
                    helperText={touched.url && errors.url}
                    onChange={handleChange}
                  />
                </Grid>
                {values.url && (
                  <Grid item xs={12}>
                    <CardMedia
                      style={{
                        height: 0,
                        paddingTop: "56.25%", // 16:9
                      }}
                      image={values.url}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    value={values.descripcion}
                    label="Descripcion"
                    multiline
                    name="descripcion"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={Boolean(touched.descripcion && errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box flexGrow={1} />
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button type="submit" variant="outlined" color="primary">
                        Crear Producto
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
