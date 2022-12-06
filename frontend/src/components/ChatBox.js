import { useEffect, useState } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://localhost:8080");
  }, []);

  const handleSend = () => {};
  return (
    <div className="chatBox">
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
