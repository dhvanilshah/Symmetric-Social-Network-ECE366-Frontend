import { Layout, Row, Col } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";

import Postbox from "../../components/post/postInput";

import FriendsList from "../../components/friendslist/friendslist";
import Feed from "../../components/feed/feed";
import Post from "../../components/postbox/postbox";
import Songsearch from "../../components/songserach/songsearch";
const { Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: true };
  }

  render() {
    return (
      <Layout className="layout">
        <Header />

        {/* <Postbox /> */}

        <Content
          style={{
            padding: "16px",
            marginTop: 24,
            height: window.innerHeight * 0.8
          }}
        >
          {/* <FriendsList /> */}
          <Row gutter={16}>
            <Col span={17}>
              <div
                style={{
                  height: window.innerHeight * 0.79,
                  overflowY: "scroll"
                }}
              >
                <Row
                  style={{
                    background: "white",
                    marginBottom: "16px"
                  }}
                >
                  <Songsearch />
                  <Postbox />
                </Row>
                <Row
                  style={{
                    background: "white",
                    padding: "16px"
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
}))(Home);
