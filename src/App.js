import React from "react";
import "./styles.css";
import AppBar from "./components/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./views/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./views/Admin";

export default function App() {
  return (
      <AuthProvider>
        <Router>
          <AppBar />
          <Switch>
            <Route path="/acerca"></Route>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
  );
}
