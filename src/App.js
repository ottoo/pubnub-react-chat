import React from "react";
import { ChatContext } from "./ChatContext";

import "./App.css";

function App() {
  const { messages, sendMessage } = React.useContext(ChatContext);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="App">
      <ul className="messagelist">
        {messages.map((m, i) => (
          <li key={i}>
            <div>{m.timestamp}</div>
            <div>{m.publisher}</div>
            <div>{m.text}</div>
          </li>
        ))}
      </ul>
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
    </div>
  );
}

export default App;
