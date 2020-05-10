import React, { useState } from "react";
import axiosInstance from "../../API/axiosInstance";

function AddMessage(props) {
  const { messages, setMessages, tokenHeader } = props;

  const [newMessage, setNewMessage] = useState("");

  const onSubmitAdding = (e) => {
    e.preventDefault();
    console.log(props);
    axiosInstance
      .post("messages", { message: newMessage }, tokenHeader)
      .then((res) => {
        setMessages([...messages, res]);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card-footer">
      <form onSubmit={onSubmitAdding}>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Leave Your Message
        </button>
      </form>
    </div>
  );
}

export default AddMessage;
