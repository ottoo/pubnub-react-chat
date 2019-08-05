import React from "react";
import PubNub from "pubnub";

const channelName = "demo-chat";

export const ChatContext = React.createContext();

export class ChatContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    this.PubNub = new PubNub({
      publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
    });
    this.addListener();
    this.PubNub.subscribe({ channels: [channelName] });

    window.addEventListener("beforeunload", this.PubNub.unsubscribeAll);
  }

  componentWillUnmount() {
    this.PubNub.unsubscribeAll();
  }

  addListener = () => {
    this.PubNub.addListener({
      status: event => {
        if (event.category === "PNConnectedCategory") {
          console.log("Connected!", event);

          this.sendMessage({ text: "Hello world!" });
        }
      },
      message: ({ channel, message, publisher }) => {
        console.log(`Message received in channel: ${channel}`, message);

        this.setState(prevState => ({
          messages: [...prevState.messages, { ...message, publisher }]
        }));
      }
    });
  };

  sendMessage = message => {
    this.PubNub.publish(
      {
        channel: channelName,
        message: { ...message, timestamp: new Date().toLocaleString() }
      },
      status => {
        console.log("Message published!", status);
      }
    );
  };

  render() {
    return (
      <ChatContext.Provider
        value={{ messages: this.state.messages, sendMessage: this.sendMessage }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}
