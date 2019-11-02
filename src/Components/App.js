import React from "react";
import { Grid, Message, GridColumn } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel.js";
import SidePanel from "./SidePanel/SidePanel.js";
import Messages from "./Messages/Messages.js";
import MetaPanel from "./MetaPanel/MetaPanel.js";
import { connect } from "react-redux";

const App = ({ currentUser, currentChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>
    <GridColumn width={4}>
      <MetaPanel />
    </GridColumn>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
