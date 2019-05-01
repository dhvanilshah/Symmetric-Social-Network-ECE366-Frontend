import { List, Row, Col, Button, Drawer } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../api/api";
import { NavLink } from "react-router-dom";
import { updateFeed } from "../../redux/song/actions";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      visible: false,
      recData: [],
      buttonLoading: false
    };
    this.getMyFeed = this.getMyFeed.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
  }

  showDrawer = async song => {
    this.setState({ recData: [], buttonLoading: true });
    const data = await API.get("/song/recommend/" + song)
      .then(function(response) {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function(error) {
        alert(error);
      });

    if (data != null) {
      console.log(data.slice(0, 5));
      this.setState({ recData: data.slice(0, 5), visible: true });
    }

    this.setState({ buttonLoading: false });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  async getMyFeed() {
    this.setState({ loading: true, data: [] });
    const data = await API.get("/getMyFeed")
      .then(function(response) {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function(error) {
        alert(error);
      });
    if (data != null) {
      data.sort(function(a, b) {
        a = new Date(a.map.dateCreated);
        b = new Date(b.map.dateCreated);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      this.setState({ data });
    }
    this.setState({ loading: false });
  }

  async getPublicFeed(username) {
    this.setState({ loading: true, data: [] });
    const data = await API.get("/getPublicFeed/" + username)
      .then(function(response) {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function(error) {
        alert(error);
      });

    if (data != null) {
      data.sort(function(a, b) {
        a = new Date(a.map.dateCreated);
        b = new Date(b.map.dateCreated);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      this.setState({ data });
    }
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.location === "profile" &&
      prevProps.user !== this.props.user
    ) {
      const username = this.props.user;
      this.getPublicFeed(username);
    }
  }

  refreshFeed() {
    const location = this.props.location;
    if (location === "profile") {
      const username = this.props.user;
      this.getPublicFeed(username);
    } else {
      this.getMyFeed();
    }
  }

  componentDidMount() {
    this.refreshFeed();
  }
  render() {
    const { data, loading } = this.state;
    const { feedRefresh } = this.props;

    if (feedRefresh) {
      this.refreshFeed();
      this.props.updateFeed(false);
    }

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
                  <p style={{ fontSize: 18 }}>
                    <NavLink
                      to={{
                        pathname: "/profile/" + item.map.writerUsername,
                        aboutProps: { friendCheck: true }
                      }}
                    >
                      {item.map.writerName}
                    </NavLink>
                    {item.map.writerId === item.map.receiverId ? null : " to "}
                    {item.map.writerId === item.map.receiverId ? null : (
                      <NavLink
                        to={{
                          pathname: "/profile/" + item.map.receiverUsername,
                          aboutProps: { friendCheck: true }
                        }}
                      >
                        {item.map.receiverName}
                      </NavLink>
                    )}
                    <br />
                    <span style={{ fontSize: 12, marginTop: 0 }}>
                      {new Date(item.map.dateCreated).toDateString()}{" "}
                      {new Date(item.map.dateCreated).toLocaleTimeString(
                        "en-US"
                      )}
                    </span>
                  </p>
                  <p>
                    {item.map.title} by {item.map.artist}
                  </p>
                  <p>{item.map.message}</p>
                  <Button
                    onClick={() => this.showDrawer(item.map.title)}
                    loading={this.state.buttonLoading}
                  >
                    Get Recomendations
                  </Button>
                  <Drawer
                    title="Recomendations"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                  >
                    {this.state.recData.map(song => {
                      const selectedSong = song.map;
                      return (
                        <Row
                          style={{
                            marginTop: "8px",
                            marginLeft: "8px",
                            marginRight: "16px"
                          }}
                        >
                          <Col span={14}>
                            <img
                              onClick={() =>
                                window.open(selectedSong.url, "_blank")
                              }
                              width="150px"
                              height="150px"
                              src={selectedSong.album}
                            />
                            <div height="100px">
                              <p>{selectedSong.title}</p>
                              <p>by {selectedSong.artist}</p>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
                  </Drawer>
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

const mapDispatchToProps = dispatch => {
  return {
    updateFeed: bool => dispatch(updateFeed(bool))
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null,
    feedRefresh: state.Song.updateFeed
  }),
  mapDispatchToProps
)(Feed);
