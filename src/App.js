import React from "react";
import "./styles.css";
import AppBar from "./components/AppBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import Menu from "./views/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import { ShopProvider } from "./contexts/ShopContext";
import Admin from "./views/Admin";
import Reservaciones from "./views/Reservaciones";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Inicio from "./views/Inicio";
import Carrito from "./views/Carrito";
import GlobalStyles from "./components/GlobalStyles";

//Creamos un tema de Material UI
const theme = createMuiTheme({
  palette: {
    action: {
      active: "rgba(255, 255, 255, 0.54)",
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabled: "rgba(255, 255, 255, 0.26)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      focus: "rgba(255, 255, 255, 0.12)",
    },
    background: {
      default: "#282C34",
      dark: "#1c2025",
      paper: "#282C34",
    },
    primary: {
      main: "#ff073a",
    },
    secondary: {
      main: "#000000",
    },
    text: {
      primary: "#e6e5e8",
      secondary: "#adb0bb",
    },
  },
});

export default function App() {
  return (
    //Envolvemos la aplicacion con el Tema
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <GlobalStyles />
        {/* Proveedor de Autenticacion */}
        <AuthProvider>
          {/* Proveedor de Carrito de Compras */}
          <ShopProvider>
            <Router>
              <AppBar />
              <Switch>
                <Route path="/inicio">
                  <Inicio />
                </Route>
                <Route path="/menu">
                  <Menu />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/reservaciones">
                  <Reservaciones />
                </Route>
                <Route path="/carrito">
                  <Carrito />
                </Route>
                <Route exact path="/">
                  <Redirect to="/inicio" />
                </Route>
              </Switch>
            </Router>
          </ShopProvider>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
