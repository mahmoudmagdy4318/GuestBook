import React, { useState } from "react";
import axiosInstance from "../../API/axiosInstance";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("http://localhost:8080/user/login", {
        username,
        password,
      });
      localStorage.setItem("jwtToken", res.token);
      localStorage.setItem("username", username);
      history.push("/");
    } catch (error) {
      setMessage(_.get(error, "response.data.error"));
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="card text-center">
        <div className="card-header bg-info text-light">
          Welcome To Guest Book
        </div>
        <div className="card-body container col-6">
          <h5 className="card-title">Login to continue</h5>
          {message && (
            <div className="alert alert-danger" role="alert">
              <strong>{message}</strong>
            </div>
          )}
          <form onSubmit={submitLogin}>
            <div className="form-group">
              <label htmlFor="InputUsername">Username</label>
              <input
                type="text"
                required
                className="form-control"
                id="InputUsername"
                aria-describedby="usernameHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword1">Password</label>
              <input
                type="password"
                required
                className="form-control"
                id="InputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="card-footer text-muted text-light">
          <Link
            className="btn btn-lg btn-secondary btn-block  font-weight-bold mb-2"
            to="/register"
          >
            Don't have an account? Create one now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
