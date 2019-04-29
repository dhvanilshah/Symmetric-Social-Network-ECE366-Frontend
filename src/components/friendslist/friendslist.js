import { Layout, Popover, List, Avatar, Icon, Button, message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../api/api";

const data2 = [{ name: "Dhvanil", username: "dhvanilshah" }];

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getFriends = this.getFriends.bind(this);
  }

  async getFriends() {
    console.log("called");
    const data = await API.get("getFriends");
    this.setState({ data: data.data.payload.value });
    console.log(data.data.payload.value);
  }

  componentWillMount() {
    this.getFriends();
  }

  render() {
    const { isLoggedIn } = this.props;
    const { data } = this.state;
    return (
      <List
        itemLayout="horizontal"
        header={<h1>Friends List</h1>}
        dataSource={data.length > 0 ? data : []}
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
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.username}
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
