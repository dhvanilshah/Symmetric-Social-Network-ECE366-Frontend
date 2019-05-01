import { List, Row, Col } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../api/api";
import _ from "lodash";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.getMyFeed = this.getMyFeed.bind(this);
  }

  async getMyFeed() {
    this.setState({ loading: true });
    const data = await API.get("/getMyFeed")
      .then(function(response) {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function(error) {
        alert(error);
      });
    console.log("gmf", data);
    const sortedData = _.sortBy(data, "dateCreated");
    console.log(sortedData);
    this.setState({ data, loading: false });
  }

  async getPublicFeed() {
    const data = await API.get("/getPublicFeed")
      .then(function(response) {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function(error) {
        alert(error);
      });
    this.setState({ data });
  }

  componentDidMount() {
    const location = this.props.location;
    var username = "";
    if (location === "profile") {
      username = this.props.user;
      this.getPublicFeed();
    } else {
      this.getMyFeed();
    }
  }
  render() {
    const { data, loading } = this.state;
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col span={18} push={6}>
                  <p>
                    <a>{item.map.writerId}</a> to <a>{item.map.receiverId}</a>
                  </p>
                  <p>
                    <bold>{item.map.title}</bold> by {item.map.artist}
                  </p>
                  <p>{item.map.message}</p>
                </Col>
                <Col span={6} pull={18}>
                  <img
                    onClick={() => window.open(item.map.songUrl, "_blank")}
                    width="200px"
                    height="200px"
                    src={item.map.albumImageUrl}
                  />
                </Col>
              </Row>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Feed);
