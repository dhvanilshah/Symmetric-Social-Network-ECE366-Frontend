import { Layout, Popover, Button, Icon, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileCircle from "../uielements/profileCircle";
import "./header.css";
import Complete from "../searchbar/searchbar";
import FriendRequests from "../friendrequests/friendrequests";
import ReturnHome from "../uielements/returnHome";
import { Link } from "react-router-dom";

const { Header } = Layout;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

class HeaderBar extends Component {
  handleClick = () => {
    window.location = "/#";
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
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
        <div className="logo">
          <div className="link">
            <Link
              to="/"
              style={{
                color: "black",
                textDecoration: "black",
                fontSize: "20px"
              }}
              activeStyle={{ color: "white" }}
            >
              {" "}
              disc.cool{" "}
            </Link>
          </div>
        </div>
        {isLoggedIn ? <Complete /> : null}
        {isLoggedIn ? (
          <div>
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
