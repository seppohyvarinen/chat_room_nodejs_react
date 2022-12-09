import { useEffect, useState, useRef } from "react";
import MessageBox from "./MessageBox/MessageBox";

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
        !ignore && setChat(txt, "server");
      });
    };

    return () => (ignore = true);
  }, []);

  const setChat = (msg, keyword) => {
    if (keyword === "client") {
      setAllMessages((allMessages) => [
        ...allMessages,
        { message: msg, origin: "client" },
      ]);
    } else {
      setAllMessages((allMessages) => [
        ...allMessages,
        { message: msg, origin: "server" },
      ]);
    }
  };

  const handleSend = (event) => {
    event.preventDefault();
    socket.current.send(message);
    setChat(message, "client");
    setMessage("");
  };

  return (
    <div className="chatBox">
      <MessageBox messages={allMessages} />
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
