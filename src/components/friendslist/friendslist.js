import { List, Icon, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { unflagFriends } from "../../redux/updates/actions";
import API from "../../api/api";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: false };
    this.getFriends = this.getFriends.bind(this);
  }

  async getFriends() {
    this.setState({ loading: true });
    const data = await API.get("getFriends");
    if (
      data.data.status === "OK" &&
      data.data.payload.value !== [] &&
      data.data.payload.value !== null
    ) {
      this.setState({ data: data.data.payload.value });
    }
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.getFriends();
  }

  render() {
    const { data, loading } = this.state;
    const { updateFriends } = this.props;
    if (updateFriends) {
      this.props.unflagFriends();
      this.getFriends();
    }
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        header={<h1>Friends List</h1>}
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={() => console.log("Do Something Here")}
            actions={
              <Button>
                <Icon type="message" theme="outlined" />
              </Button>
            }
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

const mapDispatchToProps = dispatch => {
  return {
    unflagFriends: () => dispatch(unflagFriends())
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null,
    updateFriends: state.Updates.updateFriends
  }),
  mapDispatchToProps
)(FriendList);
