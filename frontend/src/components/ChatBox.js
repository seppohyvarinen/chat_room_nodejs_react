import { useEffect, useState, useRef } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    console.log("called");
    socket.current = new WebSocket("ws://localhost:8080");
    socket.current.onmessage = (msg) => {
      msg.data
        .text()
        .then((txt) => setAllMessages((allMessages) => [...allMessages, txt]));
    };
  }, []);

  useEffect(() => {
    console.log(allMessages);
  }, [allMessages]);

  const handleSend = () => {
    socket.current.send(message);
    setMessage("");
  };

  const displayMessages = () => {
    return allMessages.map((msg) => {
      <p>message</p>;
    });
  };
  return (
    <div className="chatBox">
      <div className="messageBox">
        {allMessages.map((msg) => (
          <p>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="chat here"
        value={message}
        onInput={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={() => handleSend()}></button>
    </div>
  );
};

export default ChatBox;
