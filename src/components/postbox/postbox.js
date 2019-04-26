import { Input, Row, Col, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import SongSearch from "../songserach/songsearch";

const { TextArea } = Input;

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

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posted: false
    };
  }

  render() {
    const { posted } = this.state;
    return (
      <Row gutter={16}>
        <Col
          span={16}
          push={8}
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "8px"
          }}
        >
          <TextArea placeholder="Add a Message" rows={13} />
          <Button
            style={{ float: "right", marginTop: "8px", marginBottom: "8px" }}
            onClick={() => {
              this.setState({ posted: !posted });
            }}
          >
            Post
          </Button>
        </Col>
        <Col span={8} pull={16}>
          {posted ? (
            <div>
              <img
                width="300px"
                height="290px"
                src={
                  "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930"
                }
              />
              <div height="100px">
                <p>Song Name</p>
                <p>Artist</p>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                marginTop: "8px",
                marginLeft: "8px",
                marginRight: "16px"
              }}
            >
              <SongSearch />
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Post);
