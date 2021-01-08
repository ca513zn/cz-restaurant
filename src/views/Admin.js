import {
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@material-ui/core";
import React from "react";
import AddProductForm from "../components/AddProductForm";
const Admin = () => {
  return (
    <div>
      <Box p={1}>
        <Typography variant="h4">Admin</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card raised>
            <CardHeader title="Agregar Producto" />
            <Divider />
            <CardContent>
              <AddProductForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
