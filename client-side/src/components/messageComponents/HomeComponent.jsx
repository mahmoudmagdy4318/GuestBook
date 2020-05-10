import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../API/axiosInstance";
import AddMessage from "../messageComponents/addComponent";
import Moment from "react-moment";
import Replies from "../replyComponents/repliesComponent";

function Home() {
  const [disabled, setDisabled] = useState("disabled");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [theOneBeingEdited, setTheOneBeingEdited] = useState("");

  const [tokenHeader, setTokenHeader] = useState(null);
  let tokenHeaders;

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    if (localStorage.getItem("jwtToken")) {
      tokenHeaders = { headers: { token: localStorage.getItem("jwtToken") } };
      setTokenHeader(tokenHeaders);
    } else {
      tokenHeaders = null;
    }
    axiosInstance
      .get("messages", tokenHeaders)
      .then((res) => {
        console.log(res);

        setMessages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeleteMsg = async (id) => {
    try {
      await axiosInstance.delete(`messages/${id}`, tokenHeader);
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const onEditMsg = async (id, index) => {
    setTheOneBeingEdited(index);
    setDisabled(false);
    setEditedMessage(messages[index].body);
  };

  const onKeyPressed = (e, id) => {
    if (e.keyCode == 13) {
      setDisabled("disabled");

      axiosInstance
        .patch(`messages/${id}`, { editedMessage }, tokenHeader)
        .then((msg) => {
          const updatedMessages = messages.map((m) => {
            return m._id === id ? msg : m;
          });
          setMessages(updatedMessages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <strong>Welcome Home</strong>
        </div>
        <div className="card-body">
          <h5 className="card-title">Mahmoud Magdy GuestBook Messages</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col-9"></th>
                <th scope="col-3"></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <>
                  <tr key={index}>
                    <td key="data" className="card-body bg-info">
                      <strong className="text-warning h3">
                        {msg.user.username}
                      </strong>
                      <Moment className="text-light" format="YYYY/MM/DD HH:mm">
                        {msg.created_at}
                      </Moment>
                      <div className="form-group">
                        {username !== msg.user.username ? (
                          <span
                            disabled="disabled"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            className="text-light"
                          >
                            {msg.body}
                          </span>
                        ) : (
                          <>
                            {!disabled && index == theOneBeingEdited ? (
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={editedMessage}
                                onChange={(e) => {
                                  setEditedMessage(e.target.value);
                                }}
                                onKeyDown={(e) => onKeyPressed(e, msg._id)}
                              ></textarea>
                            ) : (
                              <span
                                disabled="disabled"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                className="text-light"
                              >
                                {msg.body}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td key="controls">
                      {username === msg.user.username && (
                        <>
                          <button
                            onClick={() => {
                              onEditMsg(msg._id, index);
                            }}
                            className="btn btn-warning mt-2 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDeleteMsg(msg._id);
                            }}
                            className="btn btn-danger mt-2"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  <Replies
                    replies={msg.replies}
                    tokenHeader={tokenHeader}
                    message={msg._id}
                  />
                </>
              ))}
            </tbody>
          </table>
        </div>
        <AddMessage
          messages={messages}
          setMessages={setMessages}
          tokenHeader={tokenHeader}
        />
      </div>
    </div>
  );
}

export default Home;
