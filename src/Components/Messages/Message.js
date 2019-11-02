import React from "react";
import moment from "moment";
import { Comment, CommentAvatar } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};
const timeFromNow = timestamp => {
  moment(timestamp).fromNow();
};
const Message = props => {
  return (
    <Comment>
      <CommentAvatar src={props.message.user.avatar} />
      <Comment.Content className={isOwnMessage(props.message, props.user)}>
        <Comment.Author as="a">{props.message.user.name}</Comment.Author>
        <Comment.Metadata>
          {timeFromNow(props.message.timestamp)}
        </Comment.Metadata>
        <Comment.Text>{message.Content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
