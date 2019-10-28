import React from "react";
import { Grid, Message, GridColumn } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel.js";
import SidePanel from "./SidePanel/SidePanel.js";
import Messages from "./Messages/Messages.js";
import MetaPanel from "./MetaPanel/MetaPanel.js";
import { connect } from "react-redux";

const App = props => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={props.currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>
    <GridColumn width={4}>
      <MetaPanel />
    </GridColumn>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(App);
