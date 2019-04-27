import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import { loginRequest } from "../../redux/auth/actions";

const { TextArea } = Input;

class postBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      song: "",
      receiverId: "",
      userId: this.props.idToken,
      privacy: ""
    };
    this.submitPost = this.submitPost.bind(this);
  }

  submitPost(message, song, receiverId, userId) {
    let verify = false;

    const post = {
      writerId: userId,
      receiverId: receiverId,
      message: message,
      songId: song
    };
    const redirect = fetch("http://localhost:9999/addPost", {
      method: "post",
      headers: new Headers({
        "content-type": "application/json",
        access_token: "Bearer " + window.localStorage.getItem("token")
      }),
      body: JSON.stringify(userId)
    })
      .then(function(response) {
        console.log("success", response);
        return true;
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }

  render() {
    return (
      <div style={{ margin: "24px 0" }}>
        <Input
          placeholder="Enter who the message is to"
          onChange={(event, newValue) =>
            this.setState({ receiverId: event.target.value })
          }
        />
        <TextArea
          placeholder="Enter your comment"
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={(event, newValue) =>
            this.setState({ message: event.target.value })
          }
        />
        <Input
          placeholder="Song name"
          autosize={{ minRows: 1, maxRows: 1 }}
          onChange={(event, newValue) =>
            this.setState({ song: event.target.value })
          }
        />
        <Button
          type="primary"
          className="post-button"
          onClick={() =>
            this.submitPost(
              this.state.message,
              this.state.song,
              this.state.receiverId,
              this.state.userId
            )
          }
        >
          {"Submit"}
        </Button>
      </div>
    );
  }
}

// dispatch actions
const mapDispatchToProps = dispatch => {
  return {
    // submitPost: (message, song, receiverId, userId) => dispatch(submitPost(message, song, receiverId, userId))
  };
};

const style = {
  margin: 15
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(postBox);
