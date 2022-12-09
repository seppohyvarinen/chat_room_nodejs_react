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

  const handleSend = (event) => {
    event.preventDefault();
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
      <form onSubmit={handleSend}>
        <label>
          Your message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
      ;
    </div>
  );
};

export default ChatBox;
