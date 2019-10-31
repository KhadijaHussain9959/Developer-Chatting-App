import React from "react";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels.js";
import UserPanel from "./UserPanel.js";

class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={this.props.currentUser} />
        <Channels currentUser={this.props.currentUser} />
      </Menu>
    );
  }
}
export default SidePanel;
