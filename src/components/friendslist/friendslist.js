import { Layout, Popover, List, Avatar, Icon, Button, message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";

const data = [
  {
    title: "User1 Name"
  },
  {
    title: "User2 Name"
  },
  {
    title: "User3 Name"
  },
  {
    title: "User4 Name"
  },
  {
    title: "User1 Name"
  },
  {
    title: "User2 Name"
  },
  {
    title: "User3 Name"
  },
  {
    title: "User4 Name"
  },
  {
    title: "User1 Name"
  },
  {
    title: "User2 Name"
  },
  {
    title: "User3 Name"
  },
  {
    title: "User4 Name"
  }
];

class FriendList extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <List
        itemLayout="horizontal"
        header={<h1>Friends List</h1>}
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={() => console.log("Do Something Here")}
            actions={[
              <Button>
                <Icon type="message" theme="outlined" />
              </Button>
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="username"
            />
          </List.Item>
        )}
      />
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(FriendList);
