import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  };

  DropdownOptions = () => [
    {
      key: "user",
      text: (
        // <span>
        //   Signed In as <strong>{this.props.currentUser.displayName}</strong>
        // </span>
        <span>
          Signed In as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}> Sign out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out !!"));
  };
  render() {
    const { user } = this.state;
    console.log(this.props.currentUser);
    // console.log(this.props.currentUser.displayName);
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Dev Chat</Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding: "0.25rem" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={user.photoURL} spaced="right" avatar />
                  {user.displayName}
                </span>
              }
              options={this.DropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser
// });

// export default connect(mapStateToProps)(UserPanel);

export default UserPanel;
