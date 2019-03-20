import { Layout } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileCircle from "../uielements/profileCircle";
import "./header.css";

const { Header } = Layout;

class HeaderBar extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Header style={{ backgroundColor: "rgb(232, 182, 65)" }}>
        <div className="logo" />
        {isLoggedIn ? (
          <div style={{ lineHeight: "64px", float: "right" }}>
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
