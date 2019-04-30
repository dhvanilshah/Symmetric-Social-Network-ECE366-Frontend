import { Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ReturnHome extends Component {
  state = {
    redirect: false
  };

  handleClick = () => {
    window.location = "/#";
  };

  render() {
    return (
      <div>
        <Icon
          type="home"
          style={{
            fontSize: "20px",
            marginLeft: "16px",
            marginTop: 0,
            marginBottom: 0
          }}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null,
  username: state.Auth.username
}))(ReturnHome);
