import React, { Component } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Layout, Row, Col } from "antd";
import { connect } from "react-redux";
import FriendsList from "../../components/friendslist/friendslist";
import Feed from "../../components/feed/feed";
import Post from "../../components/postbox/postbox";
import Bio from "../../components/profile/bio";
const { Content } = Layout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: true };
  }

  render() {
    const username = this.props.match.params.username;

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
                  <Bio user={username} />
                </Row>
                <Row
                  style={{
                    marginBottom: "16px",
                    background: "white"
                  }}
                >
                  <Post />
                </Row>
                <Row
                  style={{
                    marginBottom: "16px",
                    background: "white"
                  }}
                >
                  <Feed />
                </Row>
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
