import { Layout, Popover, List, Icon, Button, Badge } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { flagFriends } from "../../redux/updates/actions";
import API from "../../api/api";
const { Header } = Layout;

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false, updateFriends: false };
    this.getRequests = this.getRequests.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  async getRequests() {
    this.setState({ loading: true, count: 0 });
    const data = await API.get("getRequests");
    if (
      data.data.status === "OK" &&
      data.data.payload.value !== [] &&
      data.data.payload.value !== null
    ) {
      this.setState({
        data: data.data.payload.value,
        count: data.data.payload.value.length
      });
    }
    this.setState({ loading: false });
  }

  async handleRequest(id, action) {
    const data = await API.get(
      "handleRequest/" + id.toString() + "/" + action.toString()
    );
    if (data.data.payload.value === "okay") {
      this.getRequests();
      this.props.flagFriends();
    }
  }

  componentDidMount() {
    this.getRequests();
  }

  render() {
    const { data, loading, count } = this.state;

    const content = (
      <List
        loading={loading}
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
        onClick={() => this.getRequests()}
      >
        <Badge count={count} offset={[3, -1]}>
          <Icon
            style={{ fontSize: "20px", marginTop: 0, marginBottom: 0 }}
            type="usergroup-add"
          />
        </Badge>
      </Popover>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    flagFriends: () => dispatch(flagFriends())
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(FriendRequests);
