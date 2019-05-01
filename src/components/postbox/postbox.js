import { Input, Row, Col, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import SongSearch from "../songserach/songsearch";
import { clearSong } from "../../redux/song/actions";
import API from "../../api/api";

const { TextArea } = Input;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posted: false,
      receiverId: "self",
      message: ""
    };
  }

  async addPost() {
    const data = await API.post("/addPost", {
      receiverIdString: this.state.receiverId,
      songIdString: this.props.selectedSong.id,
      privacy: 0,
      likes: 0,
      message: this.state.message
    })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        alert(error);
      });
    console.log("post", data);
    this.setState({ data });
  }

  render() {
    const { posted } = this.state;
    const { songIsSelected, selectedSong } = this.props;
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
          <TextArea
            placeholder="Add a Message"
            rows={5}
            onChange={e => {
              this.setState({ message: e.target.value });
            }}
          />
          <Button
            style={{ float: "right", marginTop: "8px", marginBottom: "8px" }}
            onClick={() => {
              this.addPost();
            }}
          >
            Post
          </Button>
        </Col>
        <Col span={8} pull={16}>
          {songIsSelected ? (
            // <div>
            //   <img
            //     width="300px"
            //     height="290px"
            //     src={
            //       "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg?auto=format&q=60&fit=max&w=930"
            //     }
            //   />
            //   <div height="100px">
            //     <p>Song Name</p>
            //     <p>Artist</p>
            //   </div>
            // </div>
            <Row
              style={{
                marginTop: "8px",
                marginLeft: "8px",
                marginRight: "16px"
              }}
            >
              <Col span={14}>
                <img
                  onClick={() => window.open(selectedSong.url, "_blank")}
                  width="150px"
                  height="150px"
                  src={selectedSong.album}
                />
              </Col>
              <Col span={10} style={{ paddingLeft: "16px" }}>
                <div height="100px">
                  <p>{selectedSong.title}</p>
                  <p>by {selectedSong.artist}</p>
                  <a
                    style={{ position: "bottom" }}
                    onClick={() => this.props.clearSong()}
                  >
                    cancel.
                  </a>
                </div>
              </Col>
            </Row>
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

const mapDispatchToProps = dispatch => {
  return {
    clearSong: song => dispatch(clearSong())
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null,
    songIsSelected: state.Song.songSelected,
    selectedSong: state.Song.song
  }),
  mapDispatchToProps
)(Post);
