import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "./Drawer";
import UserMenu from "./UserMenu";
import useAuth from "../hooks/useAuth";
import { Link } from "@material-ui/core";
import LoginDialog from "./LoginDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledNavItem = withStyles((theme) => ({
  root: {
    marginRight: 16,
    height: "64px",
    color: theme.palette.primary.main,
  },
}))(Button);

export default function ButtonAppBar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box display={{ xs: "block", md: "none" }}>
            <Drawer />
          </Box>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/menu"
              component={RouterLink}
              style={{ color: "white", textDecoration: "none" }}
            >
              Restaurante Monse
            </Link>
          </Typography>
          <Box display={{ xs: "none", sm: "none", md: "block" }}>
            <StyledNavItem component={RouterLink} to="/acerca" color="inherit">
              Acerca De
            </StyledNavItem>
            <StyledNavItem component={RouterLink} to="/menu" color="inherit">
              Menu
            </StyledNavItem>
            <StyledNavItem color="inherit">
              Medidas de seguridad Covid-19
            </StyledNavItem>
            <StyledNavItem color="inherit">Reservaciones</StyledNavItem>
          </Box>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button
              onClick={handleOpen}
              style={{ border: "1px solid red", color: "red" }}
              color="inherit"
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog handleClose={handleClose} open={open} />
    </div>
  );
}
