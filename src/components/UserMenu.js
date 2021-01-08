import React from "react";
import { Avatar, Box, Chip, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useAuth from "../hooks/useAuth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
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
    logout,
    user: { avatar, name },
  } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
    setAnchorEl(null);
  };

  return (
    <div>
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
          border: "1px solid white",
          backgroundColor: "transparent",
        }}
      />
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
        <MenuItem component={RouterLink} to="/admin">
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </MenuItem>
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
