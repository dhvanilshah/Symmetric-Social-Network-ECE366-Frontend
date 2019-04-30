import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button } from "antd";
import API from "../../api/api";
const { TextArea } = Input;

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "my name",
      birthday: "1/1/1",
      bio: "hello",
      faveSong: "lemonade",
      isToggleOn: true
    };
    this.saveBio = this.saveBio.bind(this);
    this.editBio = this.editBio.bind(this);
  }

  componentWillMount() {
    API.get("/user", {
      params: {
        ID: this.state.username
      }
    })
      .then(function(response) {
        this.state.fullName = "fill";
        this.state.bio = "fill";
        this.birthday = "fill";
        this.faveSong = "fill";
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  editBio() {
    this.setState({ isToggleOn: false });
  }

  saveBio() {
    this.setState({ isToggleOn: true });
    API.post("/user", {
      params: {
        ID: this.state.username
      },
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
    const isToggleOn = this.state.isToggleOn;
    let button;
    let card;
    console.log(this.state.faveSong);
    if (isToggleOn == true) {
      button = (
        <Button
          className="edit-button"
          style={{ float: "right", marginTop: "8px", marginBottom: "8px" }}
          onClick={this.editBio}
        >
          {"edit"}
        </Button>
      );
      card = (
        <Card title={this.state.fullName}>
          {this.state.bio}
          <br />
          {this.state.birthday}
          <br />
          {this.state.faveSong}
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

export default connect(state => ({}))(Bio);
