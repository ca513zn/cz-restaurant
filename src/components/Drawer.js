import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { LocalHospital, RestaurantMenu } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const navItems = [
  {
    name: "Acerca De",
    icon: <HelpOutlineIcon />,
    url: "/acerca",
  },
  {
    name: "Menu",
    icon: <RestaurantMenu />,
    url: "/menu",
  },
  {
    name: "Medidas de Seguridad Covid-19",
    url: "/covid-19",
    icon: <LocalHospital />,
  },
  {
    name: "Reservaciones",
    url: "/reservaciones",
    icon: <HelpOutlineIcon />,
  },
  {
    name: "Administracion",
    url: "/admin",
    icon: <SupervisorAccountOutlinedIcon />,
  },
];

export default function TemporaryDrawer() {
  const classes = useStyles();
  const anchor = "left";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navItems.map((elem, index) => (
          <ListItem button component={RouterLink} to={elem.url} key={elem.name}>
            <ListItemIcon>{elem.icon}</ListItemIcon>
            <ListItemText primary={elem.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
