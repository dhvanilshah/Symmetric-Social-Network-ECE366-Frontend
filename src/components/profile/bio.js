import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button } from "antd";
import API from "../../api/api";
const { TextArea } = Input;

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "my name",
      birthday: "1/1/1",
      bio: "hello",
      faveSong: "lemonade",
      isToggleOn: true,
      username: "self"
    };
    this.saveBio = this.saveBio.bind(this);
    this.getBio = this.getBio.bind(this);
    this.editBio = this.editBio.bind(this);
  }

  async getBio(username) {
    const data = await API.get("/getBio/" + username)
      .then(function(response) {
        if (response.data.status === "OK") return response.data.payload.value;
      })
      .catch(function(error) {
        alert(error);
      });

    if (data != null) {
      this.setState({
        birthday: data.birthday ? data.birthday : "No Birthday Data",
        bio: data.bio ? data.bio : "No Bio",
        faveSong: data.faveSong ? data.faveSong : "No Favorite Song Added",
        fullName: data.name
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const user = this.props.user;
    if (prevProps.user != user) {
      this.setState({ username: user });
      this.getBio(user);
    }
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ username: user });
    this.getBio(user);
  }

  editBio() {
    this.setState({ isToggleOn: false });
  }

  saveBio() {
    this.setState({ isToggleOn: true });
    API.post("/updateBio", {
      bio: this.state.bio,
      birthday: this.state.birthday,
      faveSong: this.state.faveSong
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { currentUser } = this.props;
    const { username } = this.state;
    const isToggleOn = this.state.isToggleOn;
    let button;
    let card;
    let activeUser = false;

    if (currentUser == username) {
      activeUser = true;
    }
    if (isToggleOn == true) {
      button = activeUser ? (
        <Button
          className="edit-button"
          style={{ float: "right", marginTop: "8px", marginBottom: "8px" }}
          onClick={this.editBio}
        >
          {"edit"}
        </Button>
      ) : null;
      card = (
        <Card title={this.state.fullName}>
          Bio: {this.state.bio}
          <br />
          Birthday: {this.state.birthday}
          <br />
          Favorite Song: {this.state.faveSong}
        </Card>
      );
    } else {
      button = (
        <Button
          className="save-bio-button"
          style={{ float: "right", marginTop: "8px", marginBottom: "8px" }}
          onClick={this.saveBio}
        >
          {"save"}
        </Button>
      );
      card = (
        <div>
          <TextArea
            placeholder="Bio"
            autosize={{ minRows: 2, maxRows: 6 }}
            onChange={(event, newValue) =>
              this.setState({ bio: event.target.value })
            }
          />
          <Input
            placeholder="birthday"
            onChange={(event, newValue) =>
              this.setState({ birthday: event.target.value })
            }
          />
          <Input
            placeholder="favorite song"
            onChange={(event, newValue) =>
              this.setState({ faveSong: event.target.value })
            }
          />
        </div>
      );
    }
    return (
      <div>
        {card}
        {button}
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.Auth.username
  }),
  {}
)(Bio);
