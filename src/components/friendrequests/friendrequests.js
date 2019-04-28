import { Layout, Popover, List, Avatar, Icon, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileCircle from "../uielements/profileCircle";
import Complete from "../searchbar/searchbar";
import API from "../../api/api";
const { Header } = Layout;

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.getRequests = this.getRequests.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  async getRequests() {
    const data = await API.get("getRequests");
    this.setState({ data: data.data.payload.value });
    console.log(data.data.payload.value);
  }

  async handleRequest(id, action) {
    const data = await API.get(
      "handleRequest/" + id.toString() + "/" + action.toString()
    );
    if (data.data.payload.value == "okay") {
      console.log("hey");
    }
  }

  componentWillMount() {
    this.getRequests();
  }

  render() {
    const { isLoggedIn } = this.props;
    const { data } = this.state;

    const content = (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => this.handleRequest(item.id, "accept")}>
                Accept
              </Button>,
              <a onClick={() => this.handleRequest(item.id, "decline")}>
                Decline
              </a>
            ]}
          >
            <List.Item.Meta title={item.name} description={item.username} />
          </List.Item>
        )}
      />
    );

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
