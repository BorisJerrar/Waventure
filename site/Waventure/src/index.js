import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PwdReset from "./pages/PwdReset";
import Reset from "./pages/Reset";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./fontawesome";
const token = localStorage.getItem("token");
ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Route path="/">
          {token ? (
            <Redirect to={{ pathname: "/main" }} />
          ) : (
            <Redirect to={{ pathname: "/home" }} />
          )}
        </Route>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/signUp">
          <SignUp />
        </Route>

        <Route path="/signIn">
          <SignIn />
        </Route>

        <Route path="/pwdReset">
          <PwdReset />
        </Route>

        <Route path="/Reset">
          <Reset />
        </Route>

        <Route path="/main">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
