import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/authComponents/LoginComponent";
import Signup from "./components/authComponents/SignupComponent";
import Home from "./components/messageComponents/HomeComponent";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <Signup />} />
        <Route key="home" exact path="/" render={() => <Home />} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
