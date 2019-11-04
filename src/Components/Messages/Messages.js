import React from "react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import Message from "./Message";
import { Segment, Comment } from "semantic-ui-react";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser
  };

  componentDidMount() {
    const { channel, user } = this.state;
    if (channel && user) {
      this.addListener(channel.id);
    }
  }

  addListener = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      // console.log(loadedMessages);
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  render() {
    const { messagesRef, channel, user, messages } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {/* {Messages} */}
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}
export default Messages;
