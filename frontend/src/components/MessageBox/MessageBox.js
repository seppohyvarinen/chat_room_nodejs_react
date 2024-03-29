import "./MessageBox.css";
import React, { useEffect, useRef } from "react";

const MessageBox = ({ messages }) => {
  const latestMsg = useRef(null);

  const scrollToBottom = () => {
    latestMsg.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="messageBox">
      {messages.map((msg) =>
        msg.origin === "client" ? (
          <div className="messageBgClient">
            <p className="clientMsg">{msg.message}</p>
          </div>
        ) : (
          <div className="messageBg">
            <p className="serverMsg">{msg.message}</p>
          </div>
        )
      )}
      <div ref={latestMsg} />
    </div>
  );
};

export default MessageBox;
