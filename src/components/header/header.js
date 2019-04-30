import { Layout, Popover, Button, Icon, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileCircle from "../uielements/profileCircle";
import "./header.css";
import Complete from "../searchbar/searchbar";
import FriendRequests from "../friendrequests/friendrequests";
import ReturnHome from "../uielements/returnHome";

const { Header } = Layout;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

class HeaderBar extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Header
        style={{
          backgroundColor: "rgb(232, 182, 65)",
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="logo" />
        {isLoggedIn ? <Complete /> : null}
        {isLoggedIn ? (
          <div>
            <ReturnHome />
            <FriendRequests />
            <ProfileCircle />
          </div>
        ) : null}
      </Header>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(HeaderBar);
