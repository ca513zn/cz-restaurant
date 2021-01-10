import React from "react";
import "./styles.css";
import AppBar from "./components/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./views/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import { ShopProvider } from "./contexts/ShopContext";
import Admin from "./views/Admin";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Inicio from "./views/Inicio";
import Carrito from "./views/Carrito";

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
      {/* Proveedor de Autenticacion */}
      <AuthProvider>
        {/* Proveedor de Carrito de Compras */}
        <ShopProvider>
          <Router>
            <AppBar />
            <Switch>
              <Route path="/acerca">
                <Inicio />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/carrito">
                <Carrito />
              </Route>
            </Switch>
          </Router>
        </ShopProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
