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
      {messages.map((msg) => (
        <p>{msg}</p>
      ))}
      <div ref={latestMsg} />
    </div>
  );
};

export default MessageBox;
