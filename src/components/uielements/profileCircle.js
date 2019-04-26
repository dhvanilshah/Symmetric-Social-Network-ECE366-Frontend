import { Menu, Dropdown, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/actions";

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
    isLoggedIn: state.Auth.idToken !== null
  }),
  { logout }
)(ProfileCircle);
