import React, { useState, useEffect } from "react";
import _ from "lodash";
import Moment from "react-moment";
import AddReply from "./addReplyComponent";

function Replies(props) {
  const [replies, setReplies] = useState(props.replies || []);
  const [messageId, setMessageId] = useState("");
  const [tokenHeader, setTokenHeader] = useState("");
  useEffect(() => {
    setTokenHeader(props.tokenHeader);
    setMessageId(props.message);
  }, [props]);
  return (
    <>
      {replies.map((r, index) => (
        <div>
          <small className="text-primary">{_.get(r, "user.username")}</small>
          <small className="bg-secondary text-light">{r.body} </small>
          <Moment className="h6" format="YYYY/MM/DD HH:mm">
            {r.created_at}
          </Moment>
        </div>
      ))}
      <AddReply
        replies={replies}
        setReplies={setReplies}
        tokenHeader={tokenHeader}
        message={messageId}
      />
    </>
  );
}

export default Replies;
