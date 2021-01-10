import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useShop from '../hooks/useShop';

const OrderDialog = ({ open, item, handleClose }) => {
  const [cantidad, setCantidad] = useState(1)
  const { addItem, items } = useShop();


  console.log(items)
  const handleAddItem = () => {
    handleClose()
    addItem({
      item: item,
      cantidad: cantidad
    })
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{item.nombre}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            variant="outlined"
            defaultValue={cantidad}
            inputProps={{ min: 1 }}
            type="number"
            name="cantidad"
            value={cantidad}
            label="Cantidad"
            fullWidth
            onChange={(e) => setCantidad(e.target.value)}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button startIcon={<Add />} variant="outlined" color="primary" onClick={handleAddItem}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDialog;
