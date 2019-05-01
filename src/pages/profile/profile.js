import React, { Component } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Layout, Row, Col } from "antd";
import { connect } from "react-redux";
import FriendsList from "../../components/friendslist/friendslist";
import Feed from "../../components/feed/feed";
import Post from "../../components/postbox/postbox";
import Bio from "../../components/profile/bio";
import API from "../../api/api";
const { Content } = Layout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: true, friendCheck: false };
  }

  async getBio(username) {
    const data = await API.get("/getBio/" + username)
      .then(function(response) {
        if (response.data.status === "OK") return response.data.payload.value;
      })
      .catch(function(error) {
        alert(error);
      });

    if (data != null) {
      this.setState({
        friendCheck: data.friendCheck
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const user = this.props.match.params.username;
    if (prevProps.match.params.username != user) {
      this.setState({ username: user });
      this.getBio(user);
    }
  }

  componentDidMount() {
    const user = this.props.match.params.username;
    this.setState({ username: user });
    this.getBio(user);
  }

  render() {
    const username = this.props.match.params.username;
    const { friendCheck } = this.state;

    return (
      <Layout className="layout">
        <Header />
        <Content
          style={{
            padding: "16px",
            marginTop: 24,
            height: window.innerHeight * 0.8
          }}
        >
          <Row gutter={16}>
            <Col
              span={17}
              style={{
                overflowY: "scroll",
                height: window.innerHeight * 0.79
              }}
            >
              <div>
                <Row
                  style={{
                    marginBottom: "16px",
                    background: "white"
                  }}
                >
                  <Bio user={username} friendCheck={friendCheck} />
                </Row>
                {friendCheck ? (
                  <Row
                    style={{
                      marginBottom: "16px",
                      background: "white"
                    }}
                  >
                    <Post location={"profile"} username={username} />
                  </Row>
                ) : null}
                {friendCheck ? (
                  <Row
                    style={{
                      marginBottom: "16px",
                      background: "white"
                    }}
                  >
                    <Feed location={"profile"} user={username} />
                  </Row>
                ) : null}
              </div>
            </Col>
            <Col
              span={7}
              style={{
                overflowY: "scroll"
              }}
            >
              <div
                style={{
                  background: "white",
                  height: window.innerHeight * 0.79,
                  padding: "16px",
                  overflow: "auto"
                }}
              >
                <FriendsList />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Profile);
