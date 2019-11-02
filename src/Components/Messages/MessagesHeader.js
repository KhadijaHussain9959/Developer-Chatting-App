import React from "react";
import { Segment, Header, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    //   {channel title}
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Channel
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2User</Header.Subheader>
        </Header>

        {/* { search channel title} */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="SearchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}
export default MessagesHeader;
