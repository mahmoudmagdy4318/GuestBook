import React, { useState } from "react";
import axiosInstance from "../../API/axiosInstance";

function AddReply(props) {
  const { replies, setReplies, tokenHeader, message } = props;

  const [newReply, setNewReply] = useState("");

  const onSubmitAdding = (e) => {
    e.preventDefault();
    axiosInstance
      .post("replies", { reply: newReply, messageId: message }, tokenHeader)
      .then((res) => {
        setReplies([...replies, res]);
        setNewReply("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card-footer">
      <form onSubmit={onSubmitAdding}>
        <div className="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="leave your reply..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          reply
        </button>
      </form>
    </div>
  );
}

export default AddReply;
