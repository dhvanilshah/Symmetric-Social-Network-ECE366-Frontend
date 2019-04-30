import { Menu, Dropdown, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/actions";
import { NavLink } from "react-router-dom";

class ProfileCircle extends Component {
  render() {
    const { username } = this.props;
    const profileString = "/profile/" + username;
    const menu = (
      <Menu>
        <Menu.Item>
          <NavLink to={profileString}> Profile </NavLink>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={() => {
              console.log("loggingout");
              this.props.logout();
            }}
          >
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Icon
          type="user"
          style={{
            fontSize: "20px",
            marginLeft: "16px",
            marginTop: 0,
            marginBottom: 0
          }}
        />
      </Dropdown>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null,
    username: state.Auth.username
  }),
  { logout }
)(ProfileCircle);
