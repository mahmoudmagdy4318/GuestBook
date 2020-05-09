import React, { useState } from "react";
import axiosInstance from "../../API/axiosInstance";
import { Link } from "react-router-dom";
import _ from "lodash";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "http://localhost:8080/user/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(res);
    } catch (error) {
      debugger;
      console.log("err", error);

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
          <h5 className="card-title">create new account</h5>
          {message && (
            <div className="alert alert-danger" role="alert">
              <strong>{message}</strong>
            </div>
          )}
          <form onSubmit={submitSignup}>
            <div className="form-group">
              <label htmlFor="InputEmail">Email</label>
              <input
                type="email"
                required
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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

            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
        </div>
        <div className="card-footer text-muted text-light">
          <Link
            className="btn btn-lg btn-primary btn-block font-weight-bold mb-2"
            type="submit"
            to="/login"
          >
            Already have an account? Sign in now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
