import { Menu, Dropdown, Avatar } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";

const { logout } = authActions;

class ProfileCircle extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            Settings
          </a>
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
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Dropdown>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { logout }
)(ProfileCircle);
