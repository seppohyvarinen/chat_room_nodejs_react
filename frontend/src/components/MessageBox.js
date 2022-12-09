const MessageBox = ({ messages }) => {
  return (
    <div className="messageBox">
      {messages.map((msg) => (
        <p>{msg}</p>
      ))}
    </div>
  );
};

export default MessageBox;
