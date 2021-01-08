import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { db } from "../lib/firebase";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    precio: 0,
    popularidad: 3,
    url: "",
    refresco: false,
    descripcion: "",
    categoria: "",
  });

  const handleChange = (key, value) => {
    console.log(key, value);
    setProduct((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const handleAddProduct = async () => {
    await db.collection("products").doc().set(product);
  };

  return (
    <>
      <TextField
        value={product.name}
        label="Nombre del Producto"
        name="name"
        variant="outlined"
        fullWidth
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Button onClick={handleAddProduct}>Add</Button>
    </>
  );
};

export default AddProductForm;
