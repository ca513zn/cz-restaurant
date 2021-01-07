import React from "react";
import "./styles.css";
import AppBar from "./components/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./views/Menu";
import { AuthProvider } from "./contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./config";

export default function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <AuthProvider>
        <Router>
          <AppBar />
          <Switch>
            <Route path="/acerca"></Route>
            <Route path="/menu">
              <Menu />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </FirebaseAuthProvider>
  );
}
