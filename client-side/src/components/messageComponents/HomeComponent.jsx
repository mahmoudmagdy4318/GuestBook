import React, { Fragment, useEffect, useState } from "react";
import axiosInstance from "../../API/axiosInstance";
import { Link } from "react-router-dom";

function Home() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/messages", {
        headers: { token: localStorage.getItem("jwtToken") },
      })
      .then((res) => {
        debugger;
        setMessages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeleteMsg = async (id, index) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/messages/${id}`);
      let newMessages = messages;
      newMessages.splice(index, 1);
      setMessages(setMessages);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <strong>Welcome Home</strong>
        </div>
        <div className="card-body">
          <h5 className="card-title">GuestBook Messages</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col-9">#</th>
                <th scope="col-3">#</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={index}>
                  <td>
                    <strong>your friend: {msg.user.username}</strong>

                    <div className="form-group">
                      <textarea
                        disabled
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={msg.body}
                      ></textarea>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        onDeleteMsg(msg._id, index);
                      }}
                      className="btn btn-warning mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
