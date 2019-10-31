import React from "react";
import firebase from "../../firebase";
import { setCurrentChannel } from "../../actions";
import { Menu, Icon, Modal, Input, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    activeChannel: "",
    firstLoad: true
  };

  componentDidMount() {
    this.addListeners();
  }
  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      // console.log(loadedChannels);
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };
  removeListeners = () => {
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];

    if (this.state.firstLoad && this.state.channels.length > 0) {
      console.log("abc");
      console.log(firstChannel);
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log("chal ra");
    // console.log(this.state.channelName + this.state.channelDetails);
    if (this.isFormValid(this.state)) {
      console.log("channel added");
      this.addChannel();
    }
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;
    // console.log(user);

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added finally");
      })
      .catch(err => {
        console.error(err);
      });
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
    this.setActiveChannel(channel);
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  openModal = () => {
    this.setState({ modal: true });
  };

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length})<Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* {channels} */}
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add channel modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the  Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
