import { Layout, Popover, List, Row, Col, Button, message } from "antd";
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

class Feed extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item onClick={() => console.log("Do Something Here")}>
            <div style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col span={18} push={6}>
                  <p>Leart to Andy</p>
                  <p>22 by Ariana Grande</p>
                  <p>
                    Wow this song is so good. i Honestly love ariana big. How is
                    Graphics going?
                  </p>
                </Col>
                <Col span={6} pull={18}>
                  <img
                    width="200px"
                    height="200px"
                    src={
                      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930"
                    }
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
