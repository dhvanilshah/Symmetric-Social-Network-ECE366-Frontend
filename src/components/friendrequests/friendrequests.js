import { Layout, Popover, List, Avatar, Icon, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileCircle from "../uielements/profileCircle";
import Complete from "../searchbar/searchbar";

const { Header } = Layout;

const data = [
  {
    name: "Ant Design Title 1",
    username: "Username1"
  },
  {
    name: "Ant Design Title 2",
    username: "Username2"
  },
  {
    name: "Ant Design Title 3",
    username: "Username3"
  },
  {
    name: "Ant Design Title 4",
    username: "Username4"
  }
];

const content = (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item actions={[<Button>Accept</Button>, <a>Decline</a>]}>
        <List.Item.Meta title={item.name} description={item.username} />
      </List.Item>
    )}
  />
);

class FriendRequests extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Popover
        placement="bottomRight"
        content={content}
        title="Friend Requests"
        trigger="click"
      >
        <Icon
          style={{ fontSize: "20px", marginTop: 0, marginBottom: 0 }}
          type="usergroup-add"
        />
      </Popover>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(FriendRequests);
