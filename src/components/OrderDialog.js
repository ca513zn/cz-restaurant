import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import React from "react";

const OrderDialog = ({ open, title, handleClose }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            variant="outlined"
            defaultValue={1}
            inputProps={{ min: 1 }}
            type="number"
            label="Cantidad"
            fullWidth
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDialog;
