import { useEffect, useState, useRef } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    console.log("called");
    let ignore = false;
    socket.current = new WebSocket("ws://localhost:8080");
    socket.current.onmessage = (msg) => {
      msg.data.text().then((txt) => {
        !ignore && setChat(txt);
      });
    };

    return () => (ignore = true);
  }, []);

  const setChat = (msg) => {
    setAllMessages((allMessages) => [...allMessages, msg]);
  };

  const handleSend = () => {
    socket.current.send(message);
    setChat(message);
    setMessage("");
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
