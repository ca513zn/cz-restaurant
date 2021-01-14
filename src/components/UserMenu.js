import React from "react";
import { Avatar, Badge, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useAuth from "../hooks/useAuth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import useShop from "../hooks/useShop";
import TodayIcon from "@material-ui/icons/Today";
import firebase from "firebase/app";
import "firebase/auth";
const StyledMenu = withStyles({
  paper: {},
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user: { avatar, name, admin },
  } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await firebase.auth().signOut();
    setAnchorEl(null);
  };

  const { carrito } = useShop();

  return (
    <div>
      <Badge
        color="primary"
        badgeContent={carrito.reduce((acc, val) => {
          return parseInt(acc) + parseInt(val.cantidad);
        }, 0)}
      >
        <Chip
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="default"
          onClick={handleClick}
          size="medium"
          icon={<Avatar src={avatar} style={{ height: 24, width: 24 }} />}
          label={name.split(" ")[0]}
          style={{
            color: "white",
            backgroundColor: "transparent",
          }}
        />
      </Badge>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/carrito">
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Carrito" />
        </MenuItem>
        <MenuItem component={RouterLink} to="/reservaciones">
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Reservaciones" />
        </MenuItem>
        {admin && (
          <MenuItem component={RouterLink} to="/admin">
            <ListItemIcon>
              <SupervisorAccountOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
