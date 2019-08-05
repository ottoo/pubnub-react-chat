import React from "react";
import { ChatContext } from "./ChatContext";

import "./App.css";

const MessageList = ({ messages }) => (
  <ul className="messagelist">
    {messages.map((m, i) => (
      <li key={i}>
        <div>{m.timestamp}</div>
        <div>{m.publisher}</div>
        <div>{m.text}</div>
      </li>
    ))}
  </ul>
);

const ChatInputForm = ({ sendMessage }) => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        sendMessage({ text: inputValue });
        setInputValue("");
      }}
    >
      <input
        placeholder="Send a message"
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button type="submit">Send</button>
    </form>
  );
};

function App() {
  const { messages, sendMessage } = React.useContext(ChatContext);

  return (
    <div className="App">
      <MessageList messages={messages} />
      <ChatInputForm sendMessage={sendMessage} />
    </div>
  );
}

export default App;
