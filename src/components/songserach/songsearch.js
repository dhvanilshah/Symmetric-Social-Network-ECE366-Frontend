import { Icon, Input, AutoComplete, Col, Row } from "antd";
import React, { Component } from "react";
import Search from "antd/lib/transfer/search";
import API from "../../api/api";
import { updateSong } from "../../redux/song/actions";
import { connect } from "react-redux";

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const filler = [
  {
    id: "null",
    name: "Search For Song Here"
  }
];

// FULL USAGE DETAIL: https://ant.design/components/auto-complete/

class SongSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.updateData = this.updateData.bind(this);
    this.selectSong = this.selectSong.bind(this);
  }

  async selectSong(opt) {
    const data = await API.post("/song/add", {
      title: opt.map.title,
      songUrl: opt.map.url,
      artist: opt.map.artist,
      albumImageUrl: opt.map.album
    })
      .then(function(response) {
        if (response.data.status == "OK") {
          return response.data.payload.value;
        }
      })
      .catch(function(error) {
        alert(error);
      });

    if (data != null) {
      const song = { ...opt.map, id: data };
      this.props.updateSong(song);
    }
  }

  async updateData(value) {
    if (value == "") {
      return;
    }
    this.setState({ data: null });
    const data = await API.get("song/" + value.toString());
    if (data != null) {
      if (data.data.length > 5) {
        data.data = data.data.slice(0, 5);
      }
      this.setState({ data: data.data });
    }
  }

  render() {
    const { data } = this.state;
    const options =
      data != null
        ? data.map((opt, key) => {
            return (
              <Option
                key={key}
                value={opt.map.url}
                onClick={e => {
                  this.selectSong(opt);
                }}
              >
                <Row>
                  <Col span={6}>
                    <img
                      width="50px"
                      height="50px"
                      src={opt.map.album.toString()}
                    />
                  </Col>
                  <Col span={18}>
                    <div>{opt.map.title}</div>
                    <div>by {opt.map.artist}</div>
                  </Col>
                </Row>
              </Option>
            );
          })
        : filler.map(opt => (
            <Option key={opt.id} value={opt.id}>
              <div>{opt.name}</div>
            </Option>
          ));
    return (
      <div className="certain-category-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 250 }}
          size="large"
          style={{ width: "290px" }}
          dataSource={options}
          placeholder="Search for a Song"
          optionLabelProp="value"
          onChange={value => this.updateData(value)}
        >
          <Input
            suffix={<Icon type="search" className="certain-category-icon" />}
          />
        </AutoComplete>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSong: song => dispatch(updateSong(song))
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(SongSearch);
