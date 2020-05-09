import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/authComponents/LoginComponent";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Route key="login" exact path="/login" render={() => <Login />} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
